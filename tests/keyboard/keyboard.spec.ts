// Parcourt la page de documentation au clavier seul, en sombre et en clair :
// chaque composant est atteignable, s'utilise sans souris et montre l'anneau
// de focus (accent, 2 px).
import { expect, test, type Locator, type Page } from '@playwright/test'

interface Focused {
  name: string
  outlineStyle: string
  outlineWidth: string
  outlineColor: string
  accent: string
}

// Décrit l'élément qui a le focus, avec l'accent résolu là où il se trouve.
function readFocus(page: Page) {
  return page.evaluate((): Focused | null => {
    const el = document.activeElement
    if (!(el instanceof HTMLElement) || el === document.body) return null
    const style = getComputedStyle(el)
    const probe = document.createElement('span')
    probe.style.color = style.getPropertyValue('--thilia-accent')
    document.body.append(probe)
    const accent = getComputedStyle(probe).color
    probe.remove()
    const label = el.getAttribute('aria-label') ?? el.textContent?.trim().slice(0, 40) ?? ''
    return {
      name: `${el.tagName.toLowerCase()}.${el.className} « ${label} »`,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      outlineColor: style.outlineColor,
      accent,
    }
  })
}

// Le défaut de l'anneau, ou null s'il est conforme.
function ringDefect(focused: Focused) {
  if (focused.outlineStyle !== 'solid' || focused.outlineWidth !== '2px') {
    return `${focused.name} : contour ${focused.outlineStyle} ${focused.outlineWidth}, anneau de 2 px attendu`
  }
  if (focused.outlineColor !== focused.accent) {
    return `${focused.name} : anneau ${focused.outlineColor}, accent ${focused.accent} attendu`
  }
  return null
}

async function expectRing(page: Page, locator: Locator) {
  await expect(locator).toBeFocused()
  const focused = await readFocus(page)
  expect(focused && ringDefect(focused)).toBeNull()
}

// Garde la touche enfoncée un instant, comme un vrai appui : Reka coche le
// bouton radio atteint avec les flèches tant que la touche est enfoncée.
async function hold(page: Page, key: string) {
  await page.keyboard.down(key)
  await page.waitForTimeout(50)
  await page.keyboard.up(key)
}

// Avance avec Tab jusqu'à l'élément : il doit être atteignable au clavier.
async function tabTo(page: Page, locator: Locator) {
  for (let i = 0; i < 300; i++) {
    await page.keyboard.press('Tab')
    if (await locator.evaluate((el) => el === document.activeElement)) return
  }
  throw new Error(`Élément jamais atteint avec Tab : ${locator}`)
}

for (const theme of ['dark', 'light'] as const) {
  test.describe(`mode ${theme === 'dark' ? 'sombre' : 'clair'}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/?theme=${theme}`)
      await expect(page.locator('html')).toHaveAttribute('data-thilia-theme', theme)
    })

    test('chaque élément atteint avec Tab montre l’anneau de focus', async ({ page }) => {
      const defects: string[] = []
      const seen = new Set<string>()
      let first: string | undefined
      // Un tour complet : on s'arrête en retombant sur le premier élément.
      for (let i = 0; i < 500; i++) {
        await page.keyboard.press('Tab')
        const focused = await readFocus(page)
        if (!focused) continue
        if (focused.name === first) break
        first ??= focused.name
        seen.add(focused.name)
        const defect = ringDefect(focused)
        if (defect) defects.push(defect)
      }
      expect(seen.size).toBeGreaterThan(30)
      expect(defects).toEqual([])
      // Ni les éléments désactivés ni les éléments décoratifs ne prennent le focus.
      for (const name of seen) expect(name).not.toMatch(/désactivé|Verrouillé|th-separator|th-gauge/i)
    })

    test('Bouton : Entrée et Espace l’activent', async ({ page }) => {
      const gauge = page.getByRole('progressbar', { name: 'Jauge' })
      const plus = page.getByRole('button', { name: '+10' })
      const minus = page.getByRole('button', { name: '−10' })
      await tabTo(page, minus)
      await expectRing(page, minus)
      await page.keyboard.press('Enter')
      await expect(gauge).toHaveAttribute('aria-valuenow', '50')
      await page.keyboard.press('Tab')
      await expectRing(page, plus)
      await page.keyboard.press('Space')
      await expect(gauge).toHaveAttribute('aria-valuenow', '60')
    })

    test('Bouton en lien : atteignable, avec l’anneau', async ({ page }) => {
      const link = page.getByRole('link', { name: 'Retour en haut' })
      await tabTo(page, link)
      await expectRing(page, link)
    })

    test('Champ : la saisie fonctionne au clavier', async ({ page }) => {
      const field = page.getByLabel('Focus · Tab pour l’afficher')
      await tabTo(page, field)
      await expectRing(page, field)
      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('passerelle')
      await expect(field).toHaveValue('passerelle')
    })

    test('Select : ouverture, choix et fermeture au clavier', async ({ page }) => {
      const trigger = page.getByRole('combobox', { name: 'Région' })
      // La page montre aussi des listes toujours visibles : on vise celle du Select.
      const list = page.locator('.th-select__content')
      await tabTo(page, trigger)
      await expectRing(page, trigger)
      await expect(trigger).toContainText('Europe Ouest')

      for (const key of ['Enter', 'Space', 'ArrowDown']) {
        await page.keyboard.press(key)
        await expect(list).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(list).toBeHidden()
        await expectRing(page, trigger)
      }

      await page.keyboard.press('Enter')
      const highlighted = page.locator('.th-select__item[data-highlighted]')
      await expect(highlighted).toHaveText('Europe Ouest')
      // Reka déplace l'option active au tour suivant : on attend chaque pas.
      await page.keyboard.press('ArrowDown')
      await expect(highlighted).toHaveText('Europe Centrale')
      await page.keyboard.press('ArrowDown')
      await expect(highlighted).toHaveText('Amérique du Nord')
      // L'option désactivée est sautée.
      await page.keyboard.press('ArrowDown')
      await expect(highlighted).toHaveText('Amérique du Nord')
      await page.keyboard.press('Enter')
      await expect(list).toBeHidden()
      await expect(trigger).toContainText('Amérique du Nord')
      await expectRing(page, trigger)
    })

    test('Case à cocher : Espace la coche et la décoche', async ({ page }) => {
      const box = page.getByRole('checkbox', { name: 'Recevoir les alertes' })
      await tabTo(page, box)
      await expectRing(page, box)
      const before = await box.getAttribute('aria-checked')
      await page.keyboard.press('Space')
      await expect(box).not.toHaveAttribute('aria-checked', before ?? '')
      await page.keyboard.press('Space')
      await expect(box).toHaveAttribute('aria-checked', before ?? '')
    })

    test('Boutons radio : Tab va à l’option cochée, les flèches changent le choix', async ({ page }) => {
      const radio = (name: string) => page.getByRole('radio', { name })
      await tabTo(page, radio('Quotidienne'))
      await expectRing(page, radio('Quotidienne'))
      await hold(page, 'ArrowDown')
      await expectRing(page, radio('Hebdomadaire'))
      await expect(radio('Hebdomadaire')).toBeChecked()
      // L'option désactivée est sautée.
      await hold(page, 'ArrowDown')
      await expectRing(page, radio('Immédiate'))
      await expect(radio('Immédiate')).toBeChecked()
      // Tab sort du groupe d'un coup.
      await page.keyboard.press('Tab')
      await expect(page.getByRole('radio', { name: /Option/ }).first()).not.toBeFocused()
      await expect(page.locator('.th-radio__box:focus')).toHaveCount(0)
    })

    test('Interrupteur : Espace et Entrée le basculent', async ({ page }) => {
      const toggle = page.getByRole('switch', { name: 'Mode maintenance' })
      await tabTo(page, toggle)
      await expectRing(page, toggle)
      await expect(toggle).toHaveAttribute('aria-checked', 'false')
      await page.keyboard.press('Space')
      await expect(toggle).toHaveAttribute('aria-checked', 'true')
      await page.keyboard.press('Enter')
      await expect(toggle).toHaveAttribute('aria-checked', 'false')
    })

    test('Onglets : flèches, Début, Fin, puis Tab vers le contenu', async ({ page }) => {
      const tab = (name: string) => page.getByRole('tab', { name })
      await tabTo(page, tab('Général'))
      await expectRing(page, tab('Général'))
      await page.keyboard.press('ArrowRight')
      await expectRing(page, tab('Accès'))
      await expect(tab('Accès')).toHaveAttribute('aria-selected', 'true')
      // L'onglet désactivé est sauté.
      await page.keyboard.press('End')
      await expectRing(page, tab('Journaux'))
      await page.keyboard.press('ArrowRight')
      await expectRing(page, tab('Général'))
      await page.keyboard.press('End')
      await page.keyboard.press('Home')
      await expectRing(page, tab('Général'))
      await page.keyboard.press('Tab')
      await expectRing(page, page.getByRole('tabpanel'))
    })

    test('Infobulle : s’affiche au focus, se ferme avec Échap', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Copier' })
      // Reka ferme l'infobulle quand la page défile : on part d'un déclencheur
      // déjà à l'écran, que Tab atteint sans faire défiler.
      await trigger.focus()
      await page.keyboard.press('Shift+Tab')
      await trigger.scrollIntoViewIfNeeded()
      await page.keyboard.press('Tab')
      await expectRing(page, trigger)
      await expect(page.getByRole('tooltip')).toContainText('Copier l’identifiant')
      await page.keyboard.press('Escape')
      await expect(page.getByRole('tooltip')).toBeHidden()
      await expectRing(page, trigger)
    })

    test('Toast : créé au clavier, atteint avec F8, fermé au clavier', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Succès', exact: true })
      await tabTo(page, trigger)
      await page.keyboard.press('Enter')
      const toast = page.locator('.th-toast')
      await expect(toast).toHaveCount(1)

      await page.keyboard.press('F8')
      await expectRing(page, page.locator('.th-toaster'))
      await page.keyboard.press('Tab')
      await expectRing(page, toast)
      await page.keyboard.press('Tab')
      const close = toast.getByRole('button', { name: 'Fermer' })
      await expectRing(page, close)
      await page.keyboard.press('Enter')
      await expect(toast).toHaveCount(0)

      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(toast).toHaveCount(1)
      await page.keyboard.press('F8')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Escape')
      await expect(toast).toHaveCount(0)
    })

    test('Modale : ouverte au clavier, focus piégé, Échap rend le focus', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Ouvrir la modale' })
      await tabTo(page, trigger)
      await expectRing(page, trigger)
      await page.keyboard.press('Enter')
      const dialog = page.getByRole('dialog', { name: 'Renommer le service' })
      await expect(dialog).toBeVisible()

      const field = dialog.getByLabel('Nom du service')
      const close = dialog.getByRole('button', { name: 'Fermer' })
      await expectRing(page, field)
      // Tab fait le tour de la modale et revient au champ sans en sortir.
      for (const next of [
        dialog.getByRole('button', { name: 'Annuler' }),
        dialog.getByRole('button', { name: 'Enregistrer' }),
        close,
        field,
      ]) {
        await page.keyboard.press('Tab')
        await expectRing(page, next)
      }
      await page.keyboard.press('Shift+Tab')
      await expectRing(page, close)

      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
      await expectRing(page, trigger)
    })

    test('Modale en v-model:open : Échap rend le focus au bouton qui l’a ouverte', async ({ page }) => {
      const opener = page.getByRole('button', { name: 'Supprimer · v-model:open' })
      await tabTo(page, opener)
      await page.keyboard.press('Enter')
      const dialog = page.getByRole('dialog', { name: 'Supprimer le service ?' })
      await expect(dialog).toBeVisible()
      await expectRing(page, dialog.getByRole('button', { name: 'Annuler' }))
      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
      await expectRing(page, opener)
    })

    test('Groupe de cases : Espace coche et décoche chaque case', async ({ page }) => {
      const group = page.getByRole('group', { name: 'Canaux d’alerte' })
      const sms = group.getByRole('checkbox', { name: 'E-mail' })
      await tabTo(page, sms)
      await expectRing(page, sms)
      await expect(sms).toBeChecked()
      await page.keyboard.press('Space')
      await expect(sms).not.toBeChecked()
      await page.keyboard.press('Space')
      await expect(sms).toBeChecked()
    })

    test('Liste : flèches et Espace choisissent, plusieurs en sélection multiple', async ({ page }) => {
      const list = page.getByRole('listbox', { name: 'Services suivis' })
      const options = list.getByRole('option')
      // Tab arrive sur l'option déjà choisie.
      await tabTo(page, options.filter({ hasText: 'Passerelle' }))
      await expectRing(page, options.filter({ hasText: 'Passerelle' }))
      await expect(options.filter({ hasText: 'Passerelle' })).toHaveAttribute('aria-selected', 'true')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Space')
      await expect(options.filter({ hasText: 'Authentification' })).toHaveAttribute('aria-selected', 'true')
      await expect(options.filter({ hasText: 'Passerelle' })).toHaveAttribute('aria-selected', 'true')
    })

    test('Combobox : la saisie filtre, Entrée choisit, Échap ferme', async ({ page }) => {
      const field = page.getByRole('combobox', { name: 'Service', exact: true })
      await tabTo(page, field)
      await expectRing(page, field)
      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('file')
      const options = page.locator('.th-combobox__content').getByRole('option')
      await expect(options).toHaveCount(1)
      await expect(options).toHaveText('File de tâches')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(field).toHaveValue('File de tâches')

      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('zzz')
      await expect(page.getByText('Aucun résultat')).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByText('Aucun résultat')).toBeHidden()
    })

    test('Autocomplétion : les suggestions suivent la saisie, toute valeur reste permise', async ({ page }) => {
      const field = page.getByRole('combobox', { name: 'Rechercher' })
      await tabTo(page, field)
      await expectRing(page, field)
      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('requêtes')
      await expect(page.locator('.th-autocomplete__content').getByRole('option')).toHaveText('requêtes par minute')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(field).toHaveValue('requêtes par minute')
      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('libre')
      await expect(field).toHaveValue('libre')
    })

    test('Champ numérique : flèches et boutons changent la valeur, bornes respectées', async ({ page }) => {
      const field = page.getByRole('spinbutton', { name: 'Instances' })
      await tabTo(page, field)
      await expectRing(page, field)
      await expect(field).toHaveValue('3')
      await page.keyboard.press('ArrowUp')
      await expect(field).toHaveValue('4')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('ArrowDown')
      await expect(field).toHaveValue('2')
      await page.keyboard.press('End')
      await expect(field).toHaveValue('8')
      // Les boutons de pas se cliquent ; au clavier, les flèches du champ font le même travail.
      await page.getByRole('button', { name: 'Diminuer' }).first().click()
      await expect(field).toHaveValue('7')
      await page.getByRole('button', { name: 'Augmenter' }).first().click()
      await expect(field).toHaveValue('8')
      await expect(page.getByRole('button', { name: 'Augmenter' }).first()).toBeDisabled()
    })

    test('Code : chaque chiffre avance à la case suivante, Retour arrière recule', async ({ page }) => {
      const cells = page.getByRole('textbox', { name: /Chiffre \d sur 6/ })
      await tabTo(page, cells.first())
      await expectRing(page, cells.first())
      await page.keyboard.type('48')
      await expect(cells.nth(2)).toBeFocused()
      await page.keyboard.press('Backspace')
      await expect(cells.nth(1)).toBeFocused()
      await expect(cells.nth(1)).toHaveValue('')
      await page.keyboard.type('73519')
      await expect(page.getByText('complete = "473519"')).toBeVisible()
    })

    test('Curseur : flèches, Début et Fin déplacent la poignée', async ({ page }) => {
      const thumb = page.getByRole('slider', { name: 'Seuil d’alerte' })
      await tabTo(page, thumb)
      await expectRing(page, thumb)
      await expect(thumb).toHaveAttribute('aria-valuenow', '60')
      await page.keyboard.press('ArrowRight')
      await expect(thumb).toHaveAttribute('aria-valuenow', '61')
      await page.keyboard.press('ArrowLeft')
      await page.keyboard.press('ArrowLeft')
      await expect(thumb).toHaveAttribute('aria-valuenow', '59')
      await page.keyboard.press('Home')
      await expect(thumb).toHaveAttribute('aria-valuenow', '0')
      await page.keyboard.press('End')
      await expect(thumb).toHaveAttribute('aria-valuenow', '100')
    })

    test('Étiquettes : Entrée ajoute, Retour arrière retire, le bouton de retrait se clique', async ({ page }) => {
      const field = page.getByRole('textbox', { name: 'Étiquettes' })
      await tabTo(page, field)
      await expectRing(page, field)
      await page.keyboard.type('staging')
      await page.keyboard.press('Enter')
      await expect(page.getByText('tags = [ "prod", "europe", "staging" ]')).toBeVisible()
      // Le premier Retour arrière sélectionne la dernière étiquette, le second la retire.
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await expect(page.getByText('tags = [ "prod", "europe" ]')).toBeVisible()
      await page.getByRole('button', { name: 'Retirer prod' }).click()
      await expect(page.getByText('tags = [ "europe" ]')).toBeVisible()
    })

    test('Texte modifiable : Entrée ouvre et valide, Échap annule', async ({ page }) => {
      const open = page.getByRole('button', { name: /Modifier le nom : Passerelle/ })
      await tabTo(page, open)
      await expectRing(page, open)
      await page.keyboard.press('Enter')
      const input = page.getByRole('textbox', { name: 'le nom' })
      await expect(input).toBeFocused()
      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('Atelier')
      await page.keyboard.press('Escape')
      await expect(page.getByRole('button', { name: /Modifier le nom : Passerelle/ })).toBeFocused()

      await page.keyboard.press('Enter')
      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('Atelier')
      await page.keyboard.press('Enter')
      await expect(page.getByRole('button', { name: /Modifier le nom : Atelier/ })).toBeFocused()
    })

    test('Note : les flèches changent la note, un seul arrêt de Tab', async ({ page }) => {
      const rating = page.getByRole('radiogroup', { name: 'Note', exact: true })
      const checked = rating.getByRole('radio', { checked: true })
      await tabTo(page, checked)
      await expectRing(page, checked)
      await expect(checked).toHaveAccessibleName('4 sur 5')
      await hold(page, 'ArrowRight')
      await expect(rating.getByRole('radio', { checked: true })).toHaveAccessibleName('5 sur 5')
      await hold(page, 'ArrowLeft')
      await hold(page, 'ArrowLeft')
      await expect(rating.getByRole('radio', { checked: true })).toHaveAccessibleName('3 sur 5')
    })

    test('Bouton à bascule : Espace et Entrée le basculent', async ({ page }) => {
      const toggle = page.getByRole('button', { name: 'Archives' })
      await tabTo(page, toggle)
      await expectRing(page, toggle)
      await expect(toggle).toHaveAttribute('aria-pressed', 'false')
      await page.keyboard.press('Space')
      await expect(toggle).toHaveAttribute('aria-pressed', 'true')
      await page.keyboard.press('Enter')
      await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    })

    test('Segments : flèches parcourent, Espace choisit', async ({ page }) => {
      const group = page.getByRole('group', { name: 'Période' })
      const current = group.getByRole('button', { pressed: true })
      await tabTo(page, current)
      await expectRing(page, current)
      await expect(current).toHaveText('24 h')
      await page.keyboard.press('ArrowRight')
      await expect(group.getByRole('button', { name: '7 j' })).toBeFocused()
      await page.keyboard.press('Space')
      await expect(group.getByRole('button', { name: '7 j' })).toHaveAttribute('aria-pressed', 'true')
      await expect(group.getByRole('button', { name: '24 h' })).toHaveAttribute('aria-pressed', 'false')
    })

    test('Confirmation : le focus démarre sur Annuler, Échap rend le focus, le fond ne ferme pas', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Purger', exact: true })
      await tabTo(page, trigger)
      await expectRing(page, trigger)
      await page.keyboard.press('Enter')
      const dialog = page.getByRole('alertdialog', { name: 'Purger les journaux ?' })
      await expect(dialog).toBeVisible()
      await expectRing(page, dialog.getByRole('button', { name: 'Annuler' }))
      await page.keyboard.press('Tab')
      await expectRing(page, dialog.getByRole('button', { name: 'Purger' }))
      await page.mouse.click(5, 5)
      await expect(dialog).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
      await expectRing(page, trigger)
    })

    test('Volet : focus piégé, Échap rend le focus au déclencheur', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Ouvrir à droite' })
      await tabTo(page, trigger)
      await page.keyboard.press('Enter')
      const drawer = page.getByRole('dialog', { name: 'Passerelle' })
      await expect(drawer).toBeVisible()
      const field = drawer.getByLabel('Nom')
      const close = drawer.getByRole('button', { name: 'Fermer' })
      await expectRing(page, close)
      for (const next of [field, drawer.getByRole('button', { name: 'Annuler' }), drawer.getByRole('button', { name: 'Enregistrer' }), close]) {
        await page.keyboard.press('Tab')
        await expectRing(page, next)
      }
      await page.keyboard.press('Escape')
      await expect(drawer).toBeHidden()
      await expectRing(page, trigger)
    })

    test('Aperçu au survol : s’ouvre au focus clavier, Échap le ferme', async ({ page }) => {
      const link = page.getByRole('link', { name: 'Atelier Nord' })
      await tabTo(page, link)
      await expectRing(page, link)
      const card = page.getByText('trois conversations ouvertes')
      await expect(card).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(card).toBeHidden()
    })

    test('Popover : Entrée ouvre, le focus entre dedans, Échap le rend', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Filtrer' })
      await tabTo(page, trigger)
      await expectRing(page, trigger)
      await page.keyboard.press('Enter')
      const panel = page.getByRole('dialog', { name: 'Filtrer' })
      await expect(panel).toBeVisible()
      await expectRing(page, panel.getByLabel('Service'))
      await page.keyboard.press('Escape')
      await expect(panel).toBeHidden()
      await expectRing(page, trigger)
    })

    test('Menu déroulant : flèches, Entrée émet l’action, désactivé sauté, Échap rend le focus', async ({ page }) => {
      const trigger = page.getByRole('button', { name: 'Actions', exact: true })
      await tabTo(page, trigger)
      await expectRing(page, trigger)
      await page.keyboard.press('Enter')
      const menu = page.getByRole('menu', { name: 'Actions' })
      await expect(menu).toBeVisible()
      const highlighted = menu.locator('.th-menu__item[data-highlighted]')
      // Le premier élément est actif dès l'ouverture : les intitulés ne le sont jamais.
      await expect(highlighted).toContainText('Modifier')
      await page.keyboard.press('ArrowDown')
      await expect(highlighted).toContainText('Dupliquer')
      // « Archiver » est désactivé : la flèche saute à « Supprimer ».
      await page.keyboard.press('ArrowDown')
      await expect(highlighted).toContainText('Supprimer')
      await page.keyboard.press('Enter')
      await expect(menu).toBeHidden()
      await expect(page.getByText('last = "delete"')).toBeVisible()
      await expectRing(page, trigger)

      await page.keyboard.press('Enter')
      await expect(menu).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(menu).toBeHidden()
      await expectRing(page, trigger)
    })

    test('Menu contextuel : la touche Menu l’ouvre, Entrée choisit', async ({ page }) => {
      const zone = page.getByText('Clic droit sur cette ligne')
      await tabTo(page, zone)
      await expectRing(page, zone)
      await page.keyboard.press('ContextMenu')
      const menu = page.getByRole('menu')
      await expect(menu).toBeVisible()
      // Le premier élément a déjà le focus à l'ouverture.
      await expect(menu.getByRole('menuitem', { name: 'Ouvrir' })).toBeFocused()
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(menu).toBeHidden()
      await expect(page.getByText('last = "copy"')).toBeVisible()
    })

    test('Barre de menus : flèches passent d’un menu à l’autre et parcourent les actions', async ({ page }) => {
      const bar = page.getByRole('menubar', { name: 'Menu principal' })
      const file = bar.getByRole('menuitem', { name: 'Fichier' })
      await tabTo(page, file)
      await expectRing(page, file)
      await page.keyboard.press('Enter')
      const menu = page.getByRole('menu', { name: 'Fichier' })
      await expect(menu).toBeVisible()
      await page.keyboard.press('ArrowRight')
      await expect(page.getByRole('menu', { name: 'Édition' })).toBeVisible()
      await expect(menu).toBeHidden()
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(page.getByText('last = "edit/undo"')).toBeVisible()
    })

    test('Navigation : Tab atteint les liens et le panneau s’ouvre à Entrée', async ({ page }) => {
      const nav = page.getByRole('navigation', { name: 'Navigation principale' })
      const home = nav.getByRole('link', { name: 'Vue d’ensemble' })
      await tabTo(page, home)
      await expectRing(page, home)
      await expect(home).toHaveAttribute('aria-current', 'page')
      await page.keyboard.press('Tab')
      const services = nav.getByRole('button', { name: 'Services' })
      await expectRing(page, services)
      await page.keyboard.press('Enter')
      await expect(page.getByRole('link', { name: /Passerelle/ })).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('link', { name: /Passerelle/ })).toBeHidden()
    })

    test('Barre d’outils : un arrêt de Tab, les flèches parcourent, Espace bascule', async ({ page }) => {
      const bar = page.getByRole('toolbar', { name: 'Mise en forme' })
      const bold = bar.getByRole('button', { name: 'Gras' })
      await tabTo(page, bold)
      await expectRing(page, bold)
      await expect(bold).toHaveAttribute('aria-pressed', 'true')
      await page.keyboard.press('ArrowRight')
      const italic = bar.getByRole('button', { name: 'Italique' })
      await expectRing(page, italic)
      await page.keyboard.press('Space')
      await expect(italic).toHaveAttribute('aria-pressed', 'true')
      await expect(page.getByText('italic = true')).toBeVisible()
      await page.keyboard.press('ArrowRight')
      await expectRing(page, bar.getByRole('button', { name: 'Aligner à gauche' }))
    })

    test('Champ : l’erreur est annoncée et reliée au champ', async ({ page }) => {
      const field = page.getByRole('textbox', { name: /Identifiant/ })
      await tabTo(page, field)
      await expectRing(page, field)
      await expect(field).toHaveAttribute('aria-invalid', 'true')
      await expect(page.getByRole('alert').filter({ hasText: 'Minuscules' })).toBeVisible()
      await page.keyboard.press('ControlOrMeta+A')
      await page.keyboard.type('passerelle')
      await expect(field).not.toHaveAttribute('aria-invalid', 'true')
    })
  })
}

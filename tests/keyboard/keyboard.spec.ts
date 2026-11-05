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
      await tabTo(page, trigger)
      await expectRing(page, trigger)
      await expect(trigger).toContainText('Europe Ouest')

      for (const key of ['Enter', 'Space', 'ArrowDown']) {
        await page.keyboard.press(key)
        await expect(page.getByRole('listbox')).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(page.getByRole('listbox')).toBeHidden()
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
      await expect(page.getByRole('listbox')).toBeHidden()
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
  })
}

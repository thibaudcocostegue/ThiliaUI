# Conventions des composants

Ces règles valent pour chaque composant de ThiliaUI. `ThSeparator`
(`src/components/separator/`) les applique et sert de modèle minimal ;
`ThButton` (`src/components/button/`) sert de modèle pour les variantes, les
tailles et les états.

## Nommage

| Élément | Règle | Exemple |
|---|---|---|
| Composant | Préfixe `Th`, PascalCase | `ThSeparator`, `ThButton` |
| Dossier | Nom en kebab-case, sans préfixe | `src/components/separator/` |
| Classe racine | `th-<nom>` | `.th-separator` |
| Partie interne | `th-<nom>__<partie>` | `.th-select__item` |
| Variable CSS | `--thilia-<rôle>`, définie dans [les tokens](../src/styles/tokens.css) | `--thilia-line` |
| Type des props | `Th<Nom>Props` | `ThSeparatorProps` |

Les variantes, tailles et états ne passent jamais par des classes de
modificateur. On les style par attribut `data-*` :

- ceux que pose Reka UI : `data-state`, `data-disabled`, `data-orientation`,
  `data-highlighted`… ;
- ceux que pose le composant : `data-variant`, `data-size`.

```css
.th-button[data-variant='primary'] { … }
.th-button[data-disabled] { … }
```

## Structure des fichiers

```
src/
  index.ts                 # export * from './components/<nom>' pour chaque composant
  components/
    <nom>/
      Th<Nom>.vue          # le composant
      types.ts             # Th<Nom>Props (et Th<Nom>Emits si besoin)
      index.ts             # export { default as Th<Nom> } + export type { … }
```

## Props

- Les props sont déclarées dans `types.ts`, puis passées à
  `defineProps<Th<Nom>Props>()`.
- Quand le composant enveloppe un composant Reka UI, `Th<Nom>Props` **étend**
  ses props (`extends SeparatorProps`) au lieu de les recopier. Les noms,
  la doc et les valeurs restent ceux de Reka.
- Les valeurs par défaut passent par la déstructuration des props :
  `const { orientation = 'horizontal' } = defineProps<…>()`.
- Les variantes et les tailles sont des unions de chaînes :
  `variant?: 'primary' | 'secondary' | 'ghost' | 'danger'`,
  `size?: '32' | '40' | '48'`.
- Les booléens sont nommés au positif (`disabled`, pas `enabled`) et valent
  `false` par défaut.
- `v-model` passe par `defineModel()`.
- Les attributs non déclarés (`class`, `id`, `aria-*`, écouteurs) sont transmis
  à l'élément racine. On ne désactive pas `inheritAttrs` sans raison.
  Exception : un champ enveloppé d'un libellé (`ThInput`) garde `class` et
  `style` sur la racine et passe le reste (`placeholder`, `name`…) au champ.
- Un champ de formulaire porte son libellé (`label`), relié par `for`/`id`.
  L'`id` est généré par `useId()` s'il n'est pas fourni.
- Quand un composant a des parties répétées, on les expose en composants
  séparés (`ThRadioGroup` et `ThRadio`) ou en liste de données (`options` de
  `ThSelect`, `tabs` de `ThTabs`), selon ce qui reste le plus court à écrire.
- Les panneaux flottants (liste du select, infobulle, modale, toasts) passent
  par le portail de Reka, rendu dans `<body>` : ils suivent le mode posé sur
  `<html>`, pas celui d'une zone `data-thilia-theme` locale.

## Styles

- Un bloc `<style>` **non scopé** dans le SFC. Les classes `th-` évitent les
  collisions, et une spécificité faible permet à une application de
  surcharger sans `:deep()` ni `!important`.
- **Aucune couleur en dur.** Seules les variables `var(--thilia-*)` sont
  permises, avec `currentColor`, `transparent` et `inherit`. Les couleurs
  hexadécimales, les fonctions `rgb()`, `hsl()`, `oklch()`… et les couleurs
  nommées sont refusées par `npm run check:colors`. Seul
  `src/styles/tokens.css` en est exempté.
- Chaque variable utilisée doit exister dans `src/styles/tokens.css`, dans le
  bloc commun ou en sombre et en clair : `npm run check:tokens` le vérifie.
  Le filet (`--thilia-line`) sert aux séparations, le contour
  (`--thilia-border`) aux contrôles.
- Les contrastes des couleurs sont vérifiés par `npm run check:contrast` :
  4,5:1 pour le texte, 3:1 pour les contours. Une nouvelle couleur de texte
  ou de contour s'ajoute aux paires de `scripts/check-contrast.mjs`.
- Typographie, espacements, hauteurs de contrôle, forme, focus et durées
  passent aussi par les tokens, définis une fois pour les deux modes :

  | Rôle | Tokens |
  |---|---|
  | Texte | `font: var(--thilia-type-body)` (`display`, `title-1`, `title-2`, `body`, `small`, `label`, `mono`) ; l'étiquette ajoute `letter-spacing: var(--thilia-label-tracking)` et `text-transform: uppercase` |
  | Espacement | `--thilia-space-4` à `--thilia-space-64`, nommés d'après leur valeur en px |
  | Hauteur de contrôle | `--thilia-control-32`, `-40`, `-48`, pour `size: '32' \| '40' \| '48'` |
  | Forme | `--thilia-radius` (0), `--thilia-stroke` (1 px), aucune ombre |
  | Focus | `--thilia-focus-width`, `--thilia-focus-offset`, couleur `--thilia-accent` |
  | Durée | `--thilia-duration-fast` (survol, focus), `--thilia-duration-panel` (panneaux), à 0 ms si l'utilisateur réduit les animations |

  ```css
  .th-button {
    height: var(--thilia-control-40);
    padding: 0 var(--thilia-space-16);
    font: var(--thilia-type-body);
    border: var(--thilia-stroke) solid var(--thilia-border);
    border-radius: var(--thilia-radius);
    transition: border-color var(--thilia-duration-fast);
  }

  .th-button:focus-visible {
    outline: var(--thilia-focus-width) solid var(--thilia-accent);
    outline-offset: var(--thilia-focus-offset);
  }
  ```

  Pas de courbe de transition imposée : on laisse celle du navigateur.

## Accessibilité

Le comportement clavier, le focus et les attributs ARIA viennent de Reka UI.
On ne les réimplémente pas : le composant ThiliaUI ajoute le style et l'API,
et transmet le reste à Reka.

Tout élément focalisable porte l'anneau de focus (`:focus-visible`, voir le
tableau des tokens). Quand l'élément touche un bord qui couperait l'anneau
(onglet, bouton fermer, zone des toasts), le décalage passe à
`calc(-1 * var(--thilia-focus-width))` pour le dessiner à l'intérieur.

`npm run test:keyboard` pilote la page de documentation au clavier dans le
Chrome installé, en sombre et en clair (`tests/keyboard/`). Il fait le tour de
la page avec Tab et vérifie l'anneau de chaque élément atteint, puis déroule le
parcours clavier de chaque composant : touches, retour du focus, piège de la
modale.

## Ajouter un composant

1. Créer `src/components/<nom>/` avec `Th<Nom>.vue`, `types.ts` et `index.ts`.
2. Ajouter `export * from './components/<nom>'` dans `src/index.ts`.
3. Créer sa section de documentation `playground/sections/NN-<nom>.vue`. Les
   fondations sont numérotées de 01 à 09, les composants à partir de 10. La
   page la trouve seule ; `npm run check:docs` refuse un composant sans
   section.

   ```vue
   <script lang="ts">
   export const section = {
     title: 'Séparateur',
     description: 'ThSeparator, basé sur le Separator de Reka UI.',
   }
   </script>

   <script setup lang="ts">
   import { ThSeparator } from '../../src'
   </script>

   <template>
     <div class="docs-demo">
       <p class="docs-label">Horizontal</p>
       <ThSeparator />
     </div>
   </template>
   ```

4. Si le composant se manipule au clavier, ajouter son parcours dans
   `tests/keyboard/keyboard.spec.ts`.
5. Lancer `npm run check`, `npm run test:keyboard`, puis
   `npm run test:consumer`.

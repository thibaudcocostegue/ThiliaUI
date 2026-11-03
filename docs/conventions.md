# Conventions des composants

Ces règles valent pour chaque composant de ThiliaUI. `ThSeparator`
(`src/components/separator/`) les applique et sert de modèle.

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

## Styles

- Un bloc `<style>` **non scopé** dans le SFC. Les classes `th-` évitent les
  collisions, et une spécificité faible permet à une application de
  surcharger sans `:deep()` ni `!important`.
- **Aucune couleur en dur.** Seules les variables `var(--thilia-*)` sont
  permises, avec `currentColor`, `transparent` et `inherit`. Les couleurs
  hexadécimales, les fonctions `rgb()`, `hsl()`, `oklch()`… et les couleurs
  nommées sont refusées par `npm run check:colors`. Seul
  `src/styles/tokens.css` en est exempté.
- Chaque variable utilisée doit exister en sombre et en clair dans
  `src/styles/tokens.css` : `npm run check:tokens` le vérifie. Le filet
  (`--thilia-line`) sert aux séparations, le contour (`--thilia-border`) aux
  contrôles.
- Rayon 0, traits de 1 px, aucune ombre (planche Fondations).
- Les tailles, espacements, durées et le focus utiliseront aussi les tokens
  dès qu'ils existeront (TIB-149).

## Accessibilité

Le comportement clavier, le focus et les attributs ARIA viennent de Reka UI.
On ne les réimplémente pas : le composant ThiliaUI ajoute le style et l'API,
et transmet le reste à Reka.

## Ajouter un composant

1. Créer `src/components/<nom>/` avec `Th<Nom>.vue`, `types.ts` et `index.ts`.
2. Ajouter `export * from './components/<nom>'` dans `src/index.ts`.
3. Ajouter sa section dans la page de documentation (le playground en
   attendant TIB-147).
4. Lancer `npm run check`, puis `npm run test:consumer`.

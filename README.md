# ThiliaUI

Bibliothèque de composants Vue 3, écrite en TypeScript.

Composants : `ThButton`, `ThInput`, `ThSelect`, `ThCheckbox`,
`ThRadioGroup` et `ThRadio`, `ThSwitch`, `ThTabs`, `ThTooltip`, `ThToaster`
et `toast`, `ThModal`, `ThGauge`, `ThSeparator`. Chacun a sa section dans la
page de documentation (`npm run dev`).

## Installation

Le paquet n'est pas publié sur npm : il s'installe depuis Git, fixé sur un
tag. npm le construit à l'installation.

```sh
npm install git+ssh://git@github.com/thibaudcocostegue/ThiliaUI.git#v0.1.0
```

Pour mettre à jour, changez le tag (`#v0.2.0`, par exemple) et relancez la
commande. Vue `^3.5` doit être installé dans l'application. Reka UI est
installé automatiquement avec le paquet.

## Démarrage rapide

Les polices, les tokens et le CSS des composants s'importent une fois, à
l'entrée de l'application :

```ts
// src/main.ts
import { createApp } from 'vue'
import 'thiliaui/fonts.css'
import 'thiliaui/tokens.css'
import 'thiliaui/style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

Les composants s'importent depuis `thiliaui` :

```vue
<!-- src/App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { ThButton, ThInput, ThToaster, toast } from 'thiliaui'

const name = ref('')
</script>

<template>
  <ThInput v-model="name" label="Nom du service" />
  <ThButton @click="toast.success('Service créé')">Créer</ThButton>
  <ThToaster />
</template>
```

`<ThToaster />` se place une fois dans l'application. `toast.success(…)`,
`toast.warning(…)` et `toast.danger(…)` s'appellent ensuite depuis
n'importe quel fichier.

## Clair et sombre

Le mode sombre s'applique par défaut. Pour le mode clair, posez
`data-thilia-theme="light"` sur `<html>` ; `"dark"` force le sombre. Posé sur
un autre élément, l'attribut change le mode de cette zone seulement.

```ts
function setTheme(theme: 'light' | 'dark') {
  document.documentElement.dataset.thiliaTheme = theme
}
```

Le mode ne suit pas `prefers-color-scheme` : c'est à l'application de choisir
et, si besoin, de mémoriser le choix.

## Personnaliser les couleurs

Chaque couleur est une variable CSS `--thilia-*`. Pour en changer, créez une
feuille dans votre projet et importez-la juste après `thiliaui/tokens.css`.
Reprenez les deux sélecteurs ci-dessous, le premier pour le mode sombre, le
second pour le mode clair, et ne listez que les variables à changer :

```css
/* src/styles/theme.css */
:root:not([data-thilia-theme='light']),
[data-thilia-theme='dark'] {
  --thilia-accent: #4d9bff;
  --thilia-accent-hover: #75b2ff;
  --thilia-on-accent: #101213;
}

[data-thilia-theme='light'] {
  --thilia-accent: #1f5fd1;
  --thilia-accent-hover: #194fae;
  --thilia-on-accent: #ffffff;
}
```

```ts
import 'thiliaui/tokens.css'
import './styles/theme.css'
```

Un mode peut être surchargé seul : l'autre garde ses valeurs. Toutes les
couleurs se surchargent de la même façon (liste dans la section Couleurs de
la page de documentation).

Vérifiez ensuite les contrastes de votre thème, en sombre et en clair :

```sh
npx thiliaui-contrast src/styles/theme.css
```

La commande exige 4,5:1 pour chaque texte sur son fond et 3:1 pour les
contours de contrôle et l'anneau de focus. Elle liste chaque paire en échec
et sort en erreur, ce qui permet de la lancer en CI. Les couleurs doivent
être écrites en `#rgb` ou `#rrggbb`.

## Polices

Inter Tight et Martian Mono sont incluses dans le paquet et fonctionnent
hors ligne, sans CDN. Elles se chargent avec `thiliaui/fonts.css`.

## Développement

Prérequis : Node.js `^20.19.0` ou `>=22.12.0`.

```sh
npm install
npm run dev            # lance la page de documentation (bascule clair/sombre)
npm run typecheck      # vérifie les types
npm run build          # lance check puis construit dist/
npm run check          # types, couleurs en dur, tokens, contrastes et sections de doc
npm run test:consumer  # installe le paquet dans une app Vue de test
npm run test:keyboard  # parcourt la doc au clavier, en clair et en sombre (Chrome requis)
```

Les règles d'écriture des composants sont dans
[docs/conventions.md](./docs/conventions.md).

## Licence

[MIT](./LICENSE). Les polices Inter Tight et Martian Mono sont sous
SIL Open Font License 1.1 : voir [src/fonts/](./src/fonts/README.md).

# ThiliaUI

Bibliothèque de composants Vue 3, écrite en TypeScript.

> En construction : aucun composant n'est encore disponible.

## Utilisation

Le paquet s'installe depuis Git. npm le construit à l'installation.

```sh
npm install git+ssh://git@github.com/thibaudcocostegue/ThiliaUI.git
```

Vue `^3.5` doit être installé dans l'application. Reka UI est installé
automatiquement avec le paquet. Les polices, les tokens, le CSS des
composants et les composants s'importent séparément :

```ts
import 'thiliaui/fonts.css'
import 'thiliaui/tokens.css'
import 'thiliaui/style.css'
import { ThSeparator } from 'thiliaui'
```

Le mode sombre s'applique par défaut. Pour le mode clair, posez
`data-thilia-theme="light"` sur `<html>`, ou sur n'importe quel élément pour
une zone dans l'autre mode.

### Personnaliser les couleurs

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

Les polices (Inter Tight et Martian Mono) sont incluses dans le paquet et
fonctionnent hors ligne, sans CDN.

## Développement

Prérequis : Node.js `^20.19.0` ou `>=22.12.0`.

```sh
npm install
npm run dev            # lance la page de documentation (bascule clair/sombre)
npm run typecheck      # vérifie les types
npm run build          # lance check puis construit dist/
npm run check          # types, couleurs en dur, tokens, contrastes et sections de doc
npm run test:consumer  # installe le paquet dans une app Vue de test
```

Les règles d'écriture des composants sont dans
[docs/conventions.md](./docs/conventions.md).

## Licence

[MIT](./LICENSE). Les polices Inter Tight et Martian Mono sont sous
SIL Open Font License 1.1 : voir [src/fonts/](./src/fonts/README.md).

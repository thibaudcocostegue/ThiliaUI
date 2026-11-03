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

Les polices (Inter Tight et Martian Mono) sont incluses dans le paquet et
fonctionnent hors ligne, sans CDN.

## Développement

Prérequis : Node.js `^20.19.0` ou `>=22.12.0`.

```sh
npm install
npm run dev            # lance le playground
npm run typecheck      # vérifie les types
npm run build          # lance check puis construit dist/
npm run check          # types, couleurs en dur et tokens
npm run test:consumer  # installe le paquet dans une app Vue de test
```

Les règles d'écriture des composants sont dans
[docs/conventions.md](./docs/conventions.md).

## Licence

[MIT](./LICENSE). Les polices Inter Tight et Martian Mono sont sous
SIL Open Font License 1.1 : voir [src/fonts/](./src/fonts/README.md).

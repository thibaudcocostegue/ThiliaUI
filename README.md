# ThiliaUI

Bibliothèque de composants Vue 3, écrite en TypeScript.

> En construction : aucun composant n'est encore disponible.

## Utilisation

Le paquet s'installe depuis Git. npm le construit à l'installation.

```sh
npm install git+ssh://git@github.com/thibaudcocostegue/ThiliaUI.git
```

Vue `^3.5` doit être installé dans l'application. Les composants, le CSS des
tokens et le CSS des composants s'importent séparément :

```ts
import 'thiliaui/tokens.css'
import 'thiliaui/style.css'
import { ThButton } from 'thiliaui'
```

## Développement

Prérequis : Node.js `^20.19.0` ou `>=22.12.0`.

```sh
npm install
npm run dev            # lance le playground
npm run typecheck      # vérifie les types
npm run build          # vérifie les types puis construit dist/
npm run test:consumer  # installe le paquet dans une app Vue de test
```

## Licence

[MIT](./LICENSE)

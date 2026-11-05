ThiliaUI est le système visuel commun aux applications Vue.js de Thibaud : web, Tauri et Electron. Son identité, Télémétrie, doit transmettre la simplicité et la haute technologie, à parts égales en clair et en sombre, avec une densité équilibrée.

## Règles d'application

- Partez toujours de `tokens.json`. N'écrivez aucune couleur en dur dans un composant.
- Traitez le sombre et le clair à égalité : vérifiez chaque écran dans les deux thèmes.
- Gardez la simplicité : une action principale par écran, peu d'éléments, des signatures ponctuelles.
- Construisez les interfaces en Vue.js sur Reka UI, en reprenant les classes de `components/bundle.css` pour l'habillage.

## Contenu

- Écrivez l'interface en français, avec des libellés courts et concrets : « Nouveau service », « Répondre au client ».
- Réservez les majuscules aux étiquettes en `thilia-label`, comme `REQUÊTES / MIN`.
- Présentez les identifiants en `thilia-code`, comme `CN-1042`.
- N'utilisez pas d'emoji.

## Couleurs

- Posez la page sur `thilia-bg`, les panneaux sur `thilia-surface`, et les champs, listes, toasts et modales sur `thilia-raised`.
- Écrivez en `thilia-fg`, et en `thilia-muted` pour le secondaire.
- Réservez `thilia-accent` à l'action principale, au focus et aux données vives. Ne l'étalez jamais en décor.
- Posez `thilia-on-accent` sur `thilia-accent`, jamais du blanc littéral.
- Accompagnez toujours `thilia-success`, `thilia-warning` et `thilia-danger` d'un mot.
- Dessinez les contours de contrôle en `thilia-outline`, et les séparateurs en `thilia-line`.

## Couleurs par projet

Les valeurs de ce système sont le thème par défaut. Chaque projet peut les remplacer dans une feuille CSS importée après les tokens, en redéclarant les variables `--thilia-*` pour `[data-theme="dark"]` et `[data-theme="light"]`.

Changez d'abord `--thilia-accent`, `--thilia-accent-hover` et `--thilia-on-accent`. Gardez 4,5:1 pour le texte et 3:1 pour les contours de contrôle, dans les deux thèmes.

## Typographie

- Composez le contenu en Inter Tight, avec `thilia-display`, `thilia-title-1`, `thilia-title-2`, `thilia-body` et `thilia-small`.
- Composez les étiquettes, les boutons et les codes en Martian Mono, avec `thilia-label` et `thilia-code`.
- N'écrivez jamais de paragraphe en mono.
- Dans une application, embarquez les polices en local pour le fonctionnement hors ligne de Tauri et d'Electron. Ici, elles sont chargées depuis Google Fonts pour les aperçus.

## Espacements et densité

- Employez uniquement les pas `thilia-space-*` : 4, 8, 12, 16, 24, 32, 48 et 64 px.
- Choisissez `thilia-control-md` (40 px) par défaut, `thilia-control-sm` (32 px) dans les zones denses et `thilia-control-lg` (48 px) sur les écrans d'action isolée.

## Formes et profondeur

- Gardez `thilia-radius` à 0 partout : aucun arrondi, y compris sur les interrupteurs et les boutons radio.
- Tracez tous les filets à 1 px.
- N'utilisez aucune ombre et aucun dégradé décoratif : la profondeur vient de l'étagement `thilia-bg`, `thilia-surface`, `thilia-raised`.
- Marquez le focus avec un anneau `thilia-accent` de 2 px, décalé de 2 px, sur tout élément interactif.

## Mouvement

Animez uniquement ce qui l'exige : 120 ms pour les contrôles, 200 ms pour les panneaux et modales.

## Signatures

- **Grille d'ingénierie :** pas de 80 px en `thilia-line`, réservée aux écrans d'accueil et aux écrans vides. Ne la placez jamais derrière un formulaire.
- **Jauge graduée :** graduations de 2 px espacées de 4 px, en `thilia-accent` sur `thilia-line`. Voir le composant Gauge.
- **Étiquettes techniques :** `thilia-label` au-dessus des valeurs et des données.

## Iconographie

Aucun jeu d'icônes n'est encore défini. Utilisez de petits SVG en ligne au trait de 1,5 à 2 px, à extrémités nettes, colorés par `currentColor` ou un token.

## Marque

Aucun logo n'existe pour l'instant : composez « ThiliaUI » en texte simple.

## Composants

Les composants de ce système sont Button, Input, Select, Checkbox, Radio, Switch, Tabs, Tooltip, Toast, Dialog et Gauge. Ce sont des références HTML et CSS : le paquet Vue est en cours de construction. Le tableau est prévu en V2 ; d'ici là, respectez les règles ci-dessus pour tout tableau.

Les groupes « Extensions » rassemblent les composants Reka UI ajoutés après ce socle. Ils suivent les mêmes règles.

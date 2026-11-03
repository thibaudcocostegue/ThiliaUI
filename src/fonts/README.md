# Polices

ThiliaUI livre ses polices dans le paquet, sans CDN, pour fonctionner hors
ligne (Tauri, Electron).

| Police | Graisse | Usage (planche Fondations) |
|---|---|---|
| Inter Tight | 400 | Corps de texte 15/22, texte secondaire 13/18 |
| Inter Tight | 500 | Affichage 40/44, Titre 1 28/34, Titre 2 20/26 |
| Martian Mono | 400 | Étiquette 11/16, identifiant 12/18 |

Seules ces graisses sont livrées, sans italique, et uniquement le
sous-ensemble `latin` : il couvre le français, `œ` compris.

## Provenance

Fichiers `woff2` et licences extraits des paquets npm
[`@fontsource/inter-tight`](https://fontsource.org/fonts/inter-tight) et
[`@fontsource/martian-mono`](https://fontsource.org/fonts/martian-mono),
version 5.3.0, qui reprennent les fichiers de Google Fonts. Ces paquets ne
sont pas des dépendances : les fichiers sont versionnés ici.

## Licences

Les deux polices sont sous SIL Open Font License 1.1 :
[`inter-tight/OFL.txt`](./inter-tight/OFL.txt) et
[`martian-mono/OFL.txt`](./martian-mono/OFL.txt). Elles sont livrées avec les
fichiers dans `dist/fonts/`.

## Ajouter une graisse

1. Récupérer le fichier `<police>-latin-<graisse>-normal.woff2` du paquet
   `@fontsource/<police>` à la même version (`npm pack @fontsource/<police>@5.3.0`).
2. Le placer dans le dossier de la police.
3. Ajouter le `@font-face` correspondant dans `fonts.css`, avec le même
   `unicode-range`.

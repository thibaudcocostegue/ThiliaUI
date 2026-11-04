<script lang="ts">
export const section = {
  title: 'Personnalisation',
  description:
    'Un projet change les couleurs dans sa propre feuille, importée après les tokens, sans recompiler ni forker ThiliaUI.',
}
</script>

<script setup lang="ts">
// Exemple minimal : l'accent, son survol et sa couleur de texte, dans les deux modes.
const themeCss = `/* src/styles/theme.css */
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
}`

const mainTs = `import 'thiliaui/fonts.css'
import 'thiliaui/tokens.css'
import './styles/theme.css'
import 'thiliaui/style.css'`
</script>

<template>
  <div class="docs-demo">
    <p class="docs-label">Feuille du projet</p>
    <pre class="docs-code"><code>{{ themeCss }}</code></pre>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Import, après les tokens</p>
    <pre class="docs-code"><code>{{ mainTs }}</code></pre>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Règles</p>
    <ul class="docs-rules">
      <li>Reprendre exactement les deux sélecteurs : le premier vise le sombre, le second le clair.</li>
      <li>Ne lister que les variables changées. Un mode peut être surchargé seul, l’autre garde ses valeurs.</li>
      <li>Toutes les couleurs de la section Couleurs se surchargent de la même façon.</li>
      <li>
        Vérifier les contrastes avec <code>npx thiliaui-contrast src/styles/theme.css</code> : 4,5:1 pour le texte,
        3:1 pour les contours de contrôle et le focus.
      </li>
    </ul>
  </div>
</template>

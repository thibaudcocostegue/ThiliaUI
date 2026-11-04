<script lang="ts">
export const section = {
  title: 'Toast',
  description:
    'ThToaster, basé sur le Toast de Reka UI, se place une fois dans l’application ; toast.success(), toast.warning() et toast.danger() s’appellent ensuite de n’importe où, même hors d’un composant. Étiquette mono du type, annonce aux lecteurs d’écran, fermeture par le bouton, Échap ou glissement. F8 va aux notifications.',
}
</script>

<script setup lang="ts">
import { ThButton, toast } from '../../src'

const appCode = `<!-- App.vue -->
<template>
  <RouterView />
  <ThToaster />
</template>`

const callCode = `import { toast } from 'thiliaui'

toast.success('Service créé')
toast.danger('Échec du déploiement', { description: 'Délai dépassé.' })`
</script>

<template>
  <div class="docs-demo">
    <p class="docs-label">Déclencher</p>
    <div class="docs-controls">
      <ThButton variant="secondary" @click="toast.success('Service créé')">Succès</ThButton>
      <ThButton variant="secondary" @click="toast.warning('Quota bientôt atteint', { description: '92 % du stockage utilisé.' })">
        Alerte
      </ThButton>
      <ThButton variant="secondary" @click="toast.danger('Échec du déploiement', { description: 'Délai dépassé après 120 s.' })">
        Erreur
      </ThButton>
      <ThButton variant="ghost" @click="toast.close()">Tout fermer</ThButton>
    </div>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Une fois dans l’application</p>
    <pre class="docs-code"><code>{{ appCode }}</code></pre>
  </div>
  <div class="docs-demo">
    <p class="docs-label">Puis n’importe où</p>
    <pre class="docs-code"><code>{{ callCode }}</code></pre>
  </div>
</template>

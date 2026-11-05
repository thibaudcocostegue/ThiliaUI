<script lang="ts">
export const section = {
  title: 'Navigation',
  description:
    'ThNavigationMenu, basé sur le NavigationMenu de Reka UI. Liens directs ou panneaux de liens, page active signalée par aria-current et un soulignement accent. Pour changer de vue dans une page, préférez les onglets.',
}
</script>

<script setup lang="ts">
import { ThNavigationMenu, type ThNavigationItem } from '../../src'

const items: ThNavigationItem[] = [
  { value: 'home', label: 'Vue d’ensemble', href: '#navigation', active: true },
  {
    value: 'services',
    label: 'Services',
    links: [
      { label: 'Passerelle', href: '#navigation', description: 'Entrée du trafic' },
      { label: 'Authentification', href: '#navigation', description: 'Accès et sessions' },
    ],
  },
  { value: 'logs', label: 'Journaux', href: '#navigation' },
]
</script>

<template>
  <div class="docs-demo docs-nav-demo">
    <ThNavigationMenu :items="items" label="Navigation principale" />
  </div>
</template>

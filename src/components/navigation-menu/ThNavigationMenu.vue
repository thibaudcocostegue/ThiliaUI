<script setup lang="ts">
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'reka-ui'
import type { ThNavigationMenuProps } from './types'

const { items, label } = defineProps<ThNavigationMenuProps>()
// L'entrée dont le panneau est ouvert, ou une chaîne vide.
const model = defineModel<string>({ default: '' })
</script>

<template>
  <NavigationMenuRoot v-model="model" class="th-navigation-menu" :aria-label="label">
    <NavigationMenuList class="th-navigation-menu__list">
      <NavigationMenuItem v-for="item in items" :key="item.value" :value="item.value">
        <NavigationMenuLink v-if="item.href" :href="item.href" :active="item.active" class="th-navigation-menu__link">
          {{ item.label }}
        </NavigationMenuLink>
        <template v-else>
          <NavigationMenuTrigger class="th-navigation-menu__link">
            {{ item.label }}
            <svg class="th-navigation-menu__chevron" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </NavigationMenuTrigger>
          <NavigationMenuContent class="th-navigation-menu__panel">
            <NavigationMenuLink v-for="link in item.links" :key="link.href" :href="link.href" class="th-navigation-menu__card">
              {{ link.label }}
              <span v-if="link.description" class="th-navigation-menu__description">{{ link.description }}</span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </template>
      </NavigationMenuItem>
    </NavigationMenuList>
    <div class="th-navigation-menu__viewport-anchor">
      <NavigationMenuViewport class="th-navigation-menu__viewport" />
    </div>
  </NavigationMenuRoot>
</template>

<style>
.th-navigation-menu {
  position: relative;
}

.th-navigation-menu__list {
  display: flex;
  gap: var(--thilia-space-16);
  padding: 0;
  margin: 0;
  list-style: none;
  border-bottom: var(--thilia-stroke) solid var(--thilia-line);
}

.th-navigation-menu__link {
  display: flex;
  gap: var(--thilia-space-8);
  align-items: center;
  box-sizing: border-box;
  height: var(--thilia-control-40);
  padding: 0 var(--thilia-space-4);
  margin-bottom: calc(-1 * var(--thilia-stroke));
  font: var(--thilia-type-label);
  letter-spacing: var(--thilia-label-tracking);
  text-decoration: none;
  text-transform: uppercase;
  color: var(--thilia-text-secondary);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  transition: color var(--thilia-duration-fast);
}

.th-navigation-menu__link:hover {
  color: var(--thilia-text);
}

.th-navigation-menu__link[data-active],
.th-navigation-menu__link[data-state='open'] {
  color: var(--thilia-text);
  border-bottom-color: var(--thilia-accent);
}

.th-navigation-menu__link:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}

.th-navigation-menu__chevron {
  transition: transform var(--thilia-duration-fast);
}

.th-navigation-menu__link[data-state='open'] .th-navigation-menu__chevron {
  transform: rotate(180deg);
}

.th-navigation-menu__viewport-anchor {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 40;
  margin-top: var(--thilia-space-4);
}

.th-navigation-menu__viewport {
  position: relative;
  width: var(--reka-navigation-menu-viewport-width);
  height: var(--reka-navigation-menu-viewport-height);
  overflow: hidden;
  background: var(--thilia-surface-raised);
  border: var(--thilia-stroke) solid var(--thilia-border);
  border-radius: var(--thilia-radius);
}

.th-navigation-menu__viewport[data-state='closed'] {
  border-color: transparent;
}

.th-navigation-menu__panel {
  display: grid;
  grid-template-columns: repeat(2, 200px);
  gap: var(--thilia-space-4);
  padding: var(--thilia-space-8);
}

.th-navigation-menu__card {
  display: flex;
  flex-direction: column;
  padding: var(--thilia-space-12);
  font: var(--thilia-type-body);
  font-weight: 500;
  text-decoration: none;
  color: var(--thilia-text);
}

.th-navigation-menu__card:hover {
  background: var(--thilia-line);
}

.th-navigation-menu__card:focus-visible {
  outline: var(--thilia-focus-width) solid var(--thilia-accent);
  outline-offset: calc(-1 * var(--thilia-focus-width));
}

.th-navigation-menu__description {
  font: var(--thilia-type-small);
  font-weight: 400;
  color: var(--thilia-text-secondary);
}

.th-navigation-menu__card:hover .th-navigation-menu__description {
  color: inherit;
}
</style>

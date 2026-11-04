<script setup lang="ts">
import type { Component } from 'vue'
import DocSection from './components/DocSection.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { ThToaster } from '../src'

interface SectionModule {
  default: Component
  section: { title: string; description?: string }
}

// Chaque fichier sections/NN-nom.vue devient une section, dans l'ordre de NN.
const sections = Object.entries(import.meta.glob<SectionModule>('./sections/*.vue', { eager: true }))
  .map(([path, module]) => {
    const [, number = '', id = ''] = /(\d+)-([\w-]+)\.vue$/.exec(path) ?? []
    return { id, number, component: module.default, ...module.section }
  })
  .sort((a, b) => a.number.localeCompare(b.number))
</script>

<template>
  <div class="docs">
    <header class="docs-header">
      <h1 class="docs-header__title">ThiliaUI</h1>
      <div class="docs-header__meta">
        <span class="docs-label">ThiliaUI · Base Reka UI · Thème projet : Télémétrie</span>
        <ThemeToggle />
      </div>
    </header>

    <nav class="docs-nav" aria-label="Sections">
      <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" class="docs-label">
        {{ section.number }} {{ section.title }}
      </a>
    </nav>

    <main>
      <DocSection
        v-for="section in sections"
        :id="section.id"
        :key="section.id"
        :number="section.number"
        :title="section.title"
        :description="section.description"
      >
        <component :is="section.component" />
      </DocSection>
    </main>

    <ThToaster />
  </div>
</template>

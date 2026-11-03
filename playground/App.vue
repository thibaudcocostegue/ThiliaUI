<script setup lang="ts">
import { ThSeparator } from '../src'
</script>

<template>
  <main class="playground">
    <h1>ThiliaUI</h1>
    <p>Playground de développement.</p>

    <section>
      <h2>Séparateur</h2>
      <p>Horizontal :</p>
      <ThSeparator />
      <div class="playground__row">
        <span>Gauche</span>
        <ThSeparator orientation="vertical" decorative />
        <span>Droite</span>
      </div>
    </section>
  </main>
</template>

<style>
.playground__row {
  display: flex;
  gap: 12px;
  align-items: center;
  height: 24px;
  margin-top: 16px;
}
</style>

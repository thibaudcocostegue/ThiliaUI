<script setup lang="ts">
import { ThSeparator } from '../src'
</script>

<template>
  <main class="playground">
    <h1>ThiliaUI</h1>
    <p>Playground de développement.</p>

    <section>
      <h2>Polices</h2>
      <p class="playground__display">Affichage · Inter Tight 500</p>
      <p>Corps de texte · Inter Tight 400 · « Œuvre, ça, déjà. »</p>
      <p class="playground__mono">CN-1042 · Martian Mono 400</p>
    </section>

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
/* Familles et échelle provisoires : les tokens typographiques arrivent avec TIB-149. */
.playground {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 400;
}

.playground h1,
.playground h2,
.playground__display {
  font-weight: 500;
}

.playground__display {
  font-size: 40px;
  line-height: 44px;
}

.playground__mono {
  font-family: 'Martian Mono', monospace;
  font-size: 12px;
  line-height: 18px;
}

.playground__row {
  display: flex;
  gap: 12px;
  align-items: center;
  height: 24px;
  margin-top: 16px;
}
</style>

import { readonly, ref, watchEffect } from 'vue'

export type Theme = 'dark' | 'light'

const storageKey = 'thiliaui-docs-theme'

// Le mode vient de ?theme=light|dark, sinon du choix mémorisé, sinon sombre.
function initialTheme(): Theme {
  const fromUrl = new URLSearchParams(location.search).get('theme')
  if (fromUrl === 'light' || fromUrl === 'dark') return fromUrl
  try {
    return localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

const theme = ref<Theme>(initialTheme())

watchEffect(() => {
  document.documentElement.dataset.thiliaTheme = theme.value
  try {
    localStorage.setItem(storageKey, theme.value)
  } catch {
    // Stockage indisponible : le mode vaut pour cette visite seulement.
  }
})

export function useTheme() {
  return {
    theme: readonly(theme),
    toggle: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    },
  }
}

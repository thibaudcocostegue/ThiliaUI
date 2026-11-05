import { defineConfig } from '@playwright/test'

const baseURL = 'http://localhost:5199'

// Pilote la page de documentation au clavier dans le Chrome installé : aucun
// navigateur à télécharger.
export default defineConfig({
  testDir: 'tests/keyboard',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL, channel: 'chrome' },
  webServer: {
    command: 'npm run dev -- --port 5199 --strictPort',
    url: baseURL,
    reuseExistingServer: true,
  },
})

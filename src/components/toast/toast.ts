import { createToastManager } from 'reka-ui'
import type { ThToastOptions, ThToastType } from './types'

// Gestionnaire partagé : toast() s'appelle de n'importe où, ThToaster affiche.
export const toastManager = createToastManager()

function add(type: ThToastType, title: string, options: ThToastOptions = {}) {
  return toastManager.add({
    ...options,
    title,
    status: type,
    // Une erreur ou une alerte interrompt le lecteur d'écran ; un succès attend son tour.
    type: type === 'success' ? 'background' : 'foreground',
  })
}

/**
 * Affiche un toast dans le ThToaster de l'application et renvoie son id.
 *
 * ```ts
 * toast.success('Service créé')
 * toast.danger('Échec du déploiement', { description: 'Délai dépassé.' })
 * ```
 */
export const toast = {
  success: (title: string, options?: ThToastOptions) => add('success', title, options),
  warning: (title: string, options?: ThToastOptions) => add('warning', title, options),
  danger: (title: string, options?: ThToastOptions) => add('danger', title, options),
  /** Ferme le toast donné, ou tous les toasts sans argument. */
  close: (id?: string) => toastManager.close(id),
}

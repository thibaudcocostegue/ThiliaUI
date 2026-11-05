import type { ThToastOptions } from './types';
export declare const toastManager: import("reka-ui").GlobalToastManager<any>;
/**
 * Affiche un toast dans le ThToaster de l'application et renvoie son id.
 *
 * ```ts
 * toast.success('Service créé')
 * toast.danger('Échec du déploiement', { description: 'Délai dépassé.' })
 * ```
 */
export declare const toast: {
    success: (title: string, options?: ThToastOptions) => string;
    warning: (title: string, options?: ThToastOptions) => string;
    danger: (title: string, options?: ThToastOptions) => string;
    /** Ferme le toast donné, ou tous les toasts sans argument. */
    close: (id?: string) => void;
};

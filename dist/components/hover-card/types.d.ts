export interface ThHoverCardProps {
    /** Délai d'ouverture au survol, en ms. */
    openDelay?: number;
    /** Délai de fermeture après le survol, en ms. */
    closeDelay?: number;
    side?: 'top' | 'right' | 'bottom' | 'left';
}

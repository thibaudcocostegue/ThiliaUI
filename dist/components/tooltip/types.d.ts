export interface ThTooltipProps {
    /** Texte de l'infobulle. Le slot `content` le remplace. */
    content?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Délai d'apparition au survol, en ms. Au focus clavier, l'infobulle s'affiche sans délai. */
    delayDuration?: number;
    disabled?: boolean;
}

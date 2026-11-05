export interface ThNavigationLink {
    label: string;
    href: string;
    /** Courte description, affichée sous le libellé dans un panneau. */
    description?: string;
}
export interface ThNavigationItem {
    value: string;
    label: string;
    /** Lien direct. Sans lui, l'entrée ouvre le panneau de ses `links`. */
    href?: string;
    /** Page active : posé sur `aria-current` et souligné en accent. */
    active?: boolean;
    links?: ThNavigationLink[];
}
export interface ThNavigationMenuProps {
    items: ThNavigationItem[];
    /** Nom accessible de la navigation. */
    label?: string;
}

export interface ThAlertDialogProps {
    /** Titre de la confirmation, qui lui sert aussi de nom accessible. */
    title: string;
    /** Conséquence de l'action, reliée à la fenêtre par aria-describedby. */
    description: string;
    /** Verbe de l'action, par exemple « Purger » : jamais « Oui ». */
    actionLabel: string;
    cancelLabel?: string;
    /** Étiquette technique au-dessus du titre, par exemple « Action irréversible ». */
    kind?: string;
    /** `danger` pour une action destructrice. */
    variant?: 'primary' | 'danger';
}

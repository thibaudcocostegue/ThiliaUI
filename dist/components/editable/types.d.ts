import type { EditableRootProps } from 'reka-ui';
export interface ThEditableProps extends Omit<EditableRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'activationMode'> {
    /** Nom de la valeur, qui nomme le bouton de modification et le champ. */
    label: string;
    /** Nom accessible du bouton de validation. */
    submitLabel?: string;
    /** Nom accessible du bouton d'annulation. */
    cancelLabel?: string;
}

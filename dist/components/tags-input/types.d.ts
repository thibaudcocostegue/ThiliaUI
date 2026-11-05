import type { TagsInputRootProps } from 'reka-ui';
export interface ThTagsInputProps extends Omit<TagsInputRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'id'> {
    /** Libellé affiché au-dessus du champ et relié à lui. */
    label: string;
    placeholder?: string;
    /** Texte d'aide sous le champ. */
    help?: string;
    /** Début du nom accessible du bouton de retrait : « Retirer » donne « Retirer prod ». */
    removeLabel?: string;
    /** Identifiant du champ de saisie. Généré s'il est absent. */
    id?: string;
}

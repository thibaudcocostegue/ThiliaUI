import type { NumberFieldRootProps } from 'reka-ui';
export interface ThNumberFieldProps extends Omit<NumberFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue'> {
    /** Libellé affiché au-dessus du champ et relié à lui. */
    label: string;
    /** Texte d'aide sous le champ. */
    help?: string;
    /** Unité affichée après le champ, par exemple « ms ». */
    unit?: string;
    /** Nom accessible du bouton qui diminue la valeur. */
    decrementLabel?: string;
    /** Nom accessible du bouton qui augmente la valeur. */
    incrementLabel?: string;
}

import type { PrimitiveProps } from 'reka-ui';
export interface ThButtonProps extends PrimitiveProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: '32' | '40' | '48';
    disabled?: boolean;
    /** Type de l'élément `<button>`, ignoré avec `as` ou `asChild`. */
    type?: 'button' | 'submit' | 'reset';
}

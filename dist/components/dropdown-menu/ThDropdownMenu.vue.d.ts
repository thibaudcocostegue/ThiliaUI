import type { ThDropdownMenuProps } from './types';
import '../../shared/menu.css';
type __VLS_Props = ThDropdownMenuProps;
type __VLS_Slots = {
    /** Déclencheur : un bouton, qui reprend le focus à la fermeture et nomme le menu. */
    default?: () => unknown;
};
type __VLS_ModelProps = {
    'open'?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (value: string) => any;
    "update:open": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onSelect?: ((value: string) => any) | undefined;
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

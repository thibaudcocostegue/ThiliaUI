import type { ThDrawerProps } from './types';
type __VLS_Props = ThDrawerProps;
type __VLS_Slots = {
    /** Déclencheur : un élément focalisable, qui reprend le focus à la fermeture. */
    trigger?: () => unknown;
    default?: (props: {
        close: () => void;
    }) => unknown;
    /** Actions en bas à droite. */
    footer?: (props: {
        close: () => void;
    }) => unknown;
};
type __VLS_ModelProps = {
    'open'?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
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

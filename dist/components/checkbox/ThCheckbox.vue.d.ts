import type { ThCheckboxProps } from './types';
type __VLS_Props = ThCheckboxProps;
type __VLS_ModelProps = {
    modelValue?: boolean | 'indeterminate';
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_template: () => {
    __VLS_Slots: {
        default?: (props: {}) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean | "indeterminate") => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean | "indeterminate") => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

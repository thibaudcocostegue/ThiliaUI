import type { ThFieldProps } from './types';
import '../../shared/field.css';
type __VLS_Slots = {
    /** Le contrôle : il reçoit son `id`, son `aria-describedby` et son état d'erreur. */
    default?: (props: {
        id: string;
        describedby: string | undefined;
        invalid: boolean;
    }) => unknown;
};
declare const __VLS_base: import("vue").DefineComponent<ThFieldProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ThFieldProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

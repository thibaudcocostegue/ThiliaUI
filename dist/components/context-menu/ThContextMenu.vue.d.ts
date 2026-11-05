import type { ThContextMenuProps } from './types';
import '../../shared/menu.css';
type __VLS_Slots = {
    /** La zone qui ouvre le menu au clic droit. */
    default?: () => unknown;
};
declare const __VLS_base: import("vue").DefineComponent<ThContextMenuProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (value: string) => any;
}, string, import("vue").PublicProps, Readonly<ThContextMenuProps> & Readonly<{
    onSelect?: ((value: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

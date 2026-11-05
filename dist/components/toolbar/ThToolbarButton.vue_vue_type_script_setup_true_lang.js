import { createBlock as e, defineComponent as t, openBlock as n, renderSlot as r, unref as i, withCtx as a } from "vue";
import { ToolbarButton as o } from "reka-ui";
// src/components/toolbar/ThToolbarButton.vue?vue&type=script&setup=true&lang.ts
var s = /*@__PURE__*/ t({
	__name: "ThToolbarButton",
	props: {
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(t) {
		return (s, c) => (n(), e(i(o), {
			class: "th-toolbar__button",
			disabled: t.disabled,
			"aria-label": t.label
		}, {
			default: a(() => [r(s.$slots, "default")]),
			_: 3
		}, 8, ["disabled", "aria-label"]));
	}
});
export { s as default };

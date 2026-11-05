import { createBlock as e, defineComponent as t, openBlock as n, renderSlot as r, unref as i, withCtx as a } from "vue";
import { ToolbarRoot as o } from "reka-ui";
// src/components/toolbar/ThToolbar.vue?vue&type=script&setup=true&lang.ts
var s = /*@__PURE__*/ t({
	__name: "ThToolbar",
	props: {
		label: {},
		orientation: { default: "horizontal" }
	},
	setup(t) {
		return (s, c) => (n(), e(i(o), {
			class: "th-toolbar",
			orientation: t.orientation,
			"aria-label": t.label
		}, {
			default: a(() => [r(s.$slots, "default")]),
			_: 3
		}, 8, ["orientation", "aria-label"]));
	}
});
export { s as default };

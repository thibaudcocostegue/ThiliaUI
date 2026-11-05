import { computed as e, createBlock as t, defineComponent as n, openBlock as r, renderSlot as i, unref as a, withCtx as o } from "vue";
import { Primitive as s } from "reka-ui";
// src/components/button/ThButton.vue?vue&type=script&setup=true&lang.ts
var c = /*@__PURE__*/ n({
	__name: "ThButton",
	props: {
		variant: { default: "primary" },
		size: { default: "40" },
		disabled: {
			type: Boolean,
			default: !1
		},
		type: { default: "button" },
		asChild: { type: Boolean },
		as: { default: "button" }
	},
	setup(n) {
		let c = e(() => n.as === "button" && !n.asChild);
		return (e, l) => (r(), t(a(s), {
			class: "th-button",
			as: n.as,
			"as-child": n.asChild,
			type: c.value ? n.type : void 0,
			disabled: c.value ? n.disabled : void 0,
			"aria-disabled": !c.value && n.disabled ? "true" : void 0,
			"data-variant": n.variant,
			"data-size": n.size,
			"data-disabled": n.disabled ? "" : void 0
		}, {
			default: o(() => [i(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"type",
			"disabled",
			"aria-disabled",
			"data-variant",
			"data-size",
			"data-disabled"
		]));
	}
});
export { c as default };

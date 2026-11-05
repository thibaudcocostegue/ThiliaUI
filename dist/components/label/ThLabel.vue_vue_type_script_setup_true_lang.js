import { createBlock as e, createCommentVNode as t, createElementBlock as n, createPropsRestProxy as r, defineComponent as i, mergeProps as a, openBlock as o, renderSlot as s, toDisplayString as c, unref as l, withCtx as u } from "vue";
import { Label as d } from "reka-ui";
// src/components/label/ThLabel.vue?vue&type=script&setup=true&lang.ts
var f = {
	key: 0,
	class: "th-label__required"
}, p = /*@__PURE__*/ i({
	__name: "ThLabel",
	props: {
		required: {
			type: Boolean,
			default: !1
		},
		requiredLabel: { default: "Requis" },
		for: {},
		asChild: { type: Boolean },
		as: {}
	},
	setup(i) {
		let p = r(i, ["required", "requiredLabel"]);
		return (r, m) => (o(), e(l(d), a(p, { class: "th-label" }), {
			default: u(() => [s(r.$slots, "default"), i.required ? (o(), n("span", f, c(i.requiredLabel), 1)) : t("", !0)]),
			_: 3
		}, 16));
	}
});
export { p as default };

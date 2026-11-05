import { createBlock as e, createPropsRestProxy as t, defineComponent as n, mergeModels as r, mergeProps as i, openBlock as a, renderSlot as o, unref as s, useModel as c, withCtx as l } from "vue";
import { Toggle as u } from "reka-ui";
// src/components/toggle/ThToggle.vue?vue&type=script&setup=true&lang.ts
var d = /*@__PURE__*/ n({
	__name: "ThToggle",
	props: /*@__PURE__*/ r({
		size: { default: "40" },
		disabled: { type: Boolean },
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(n) {
		let r = t(n, ["size"]), d = c(n, "modelValue");
		return (t, c) => (a(), e(s(u), i(r, {
			modelValue: d.value,
			"onUpdate:modelValue": c[0] ||= (e) => d.value = e,
			class: "th-toggle",
			"data-size": n.size
		}), {
			default: l(() => [o(t.$slots, "default")]),
			_: 3
		}, 16, ["modelValue", "data-size"]));
	}
});
export { d as default };

import e from "../checkbox/ThCheckbox.js";
import { Fragment as t, createBlock as n, createElementBlock as r, createElementVNode as i, createPropsRestProxy as a, defineComponent as o, mergeModels as s, mergeProps as c, openBlock as l, renderList as u, toDisplayString as d, unref as f, useModel as p, withCtx as m } from "vue";
import { CheckboxGroupRoot as h } from "reka-ui";
// src/components/checkbox-group/ThCheckboxGroup.vue?vue&type=script&setup=true&lang.ts
var g = {
	class: "th-checkbox-group__legend",
	"aria-hidden": "true"
}, _ = /*@__PURE__*/ o({
	__name: "ThCheckboxGroup",
	props: /*@__PURE__*/ s({
		label: {},
		options: {},
		rovingFocus: {
			type: Boolean,
			default: !0
		},
		disabled: { type: Boolean },
		max: {},
		dir: {},
		orientation: {},
		loop: { type: Boolean },
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: { default: () => [] },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(o) {
		let s = a(o, [
			"label",
			"options",
			"rovingFocus"
		]), _ = p(o, "modelValue");
		return (a, p) => (l(), n(f(h), c(s, {
			modelValue: _.value,
			"onUpdate:modelValue": p[0] ||= (e) => _.value = e,
			"roving-focus": o.rovingFocus,
			class: "th-checkbox-group",
			role: "group",
			"aria-label": o.label
		}), {
			default: m(() => [i("span", g, d(o.label), 1), (l(!0), r(t, null, u(o.options, (t) => (l(), n(f(e), {
				key: t.value,
				label: t.label,
				value: t.value,
				disabled: t.disabled || s.disabled
			}, null, 8, [
				"label",
				"value",
				"disabled"
			]))), 128))]),
			_: 1
		}, 16, [
			"modelValue",
			"roving-focus",
			"aria-label"
		]));
	}
});
export { _ as default };

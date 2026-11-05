import { Fragment as e, createBlock as t, createElementBlock as n, createPropsRestProxy as r, createTextVNode as i, defineComponent as a, mergeModels as o, mergeProps as s, openBlock as c, renderList as l, toDisplayString as u, unref as d, useModel as f, withCtx as p } from "vue";
import { ToggleGroupItem as m, ToggleGroupRoot as h } from "reka-ui";
// src/components/toggle-group/ThToggleGroup.vue?vue&type=script&setup=true&lang.ts
var g = /*@__PURE__*/ a({
	__name: "ThToggleGroup",
	props: /*@__PURE__*/ o({
		label: {},
		options: {},
		type: { default: "single" },
		size: { default: "40" },
		rovingFocus: {
			type: Boolean,
			default: !0
		},
		disabled: { type: Boolean },
		orientation: {},
		dir: {},
		loop: {
			type: Boolean,
			default: !0
		},
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(a) {
		let o = r(a, [
			"label",
			"options",
			"type",
			"size",
			"rovingFocus",
			"loop"
		]), g = f(a, "modelValue");
		return (r, f) => (c(), t(d(h), s(o, {
			modelValue: g.value,
			"onUpdate:modelValue": f[0] ||= (e) => g.value = e,
			type: a.type,
			"roving-focus": a.rovingFocus,
			loop: a.loop,
			class: "th-toggle-group",
			"aria-label": a.label,
			"data-size": a.size
		}), {
			default: p(() => [(c(!0), n(e, null, l(a.options, (e) => (c(), t(d(m), {
				key: e.value,
				value: e.value,
				disabled: e.disabled,
				class: "th-toggle-group__item"
			}, {
				default: p(() => [i(u(e.label), 1)]),
				_: 2
			}, 1032, ["value", "disabled"]))), 128))]),
			_: 1
		}, 16, [
			"modelValue",
			"type",
			"roving-focus",
			"loop",
			"aria-label",
			"data-size"
		]));
	}
});
export { g as default };

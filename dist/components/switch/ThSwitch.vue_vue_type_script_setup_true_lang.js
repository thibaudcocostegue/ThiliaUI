import { computed as e, createCommentVNode as t, createElementBlock as n, createTextVNode as r, createVNode as i, defineComponent as a, mergeModels as o, openBlock as s, renderSlot as c, toDisplayString as l, unref as u, useId as d, useModel as f, withCtx as p } from "vue";
import { SwitchRoot as m, SwitchThumb as h } from "reka-ui";
// src/components/switch/ThSwitch.vue?vue&type=script&setup=true&lang.ts
var g = ["data-disabled"], _ = ["for"], v = /*@__PURE__*/ a({
	__name: "ThSwitch",
	props: /*@__PURE__*/ o({
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		required: {
			type: Boolean,
			default: !1
		},
		name: {},
		value: {},
		id: {}
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(a) {
		let o = f(a, "modelValue"), v = d(), y = e(() => a.id ?? v);
		return (e, d) => (s(), n("div", {
			class: "th-switch",
			"data-disabled": a.disabled ? "" : void 0
		}, [a.label || e.$slots.default ? (s(), n("label", {
			key: 0,
			class: "th-switch__label",
			for: y.value
		}, [c(e.$slots, "default", {}, () => [r(l(a.label), 1)])], 8, _)) : t("", !0), i(u(m), {
			id: y.value,
			modelValue: o.value,
			"onUpdate:modelValue": d[0] ||= (e) => o.value = e,
			class: "th-switch__track",
			disabled: a.disabled,
			required: a.required,
			name: a.name,
			value: a.value
		}, {
			default: p(() => [i(u(h), { class: "th-switch__thumb" })]),
			_: 1
		}, 8, [
			"id",
			"modelValue",
			"disabled",
			"required",
			"name",
			"value"
		])], 8, g));
	}
});
export { v as default };

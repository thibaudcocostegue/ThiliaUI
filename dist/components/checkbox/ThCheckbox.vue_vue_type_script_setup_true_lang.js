import { computed as e, createCommentVNode as t, createElementBlock as n, createElementVNode as r, createTextVNode as i, createVNode as a, defineComponent as o, mergeModels as s, openBlock as c, renderSlot as l, toDisplayString as u, unref as d, useId as f, useModel as p, withCtx as m } from "vue";
import { CheckboxIndicator as h, CheckboxRoot as g } from "reka-ui";
// src/components/checkbox/ThCheckbox.vue?vue&type=script&setup=true&lang.ts
var _ = ["data-disabled"], v = {
	key: 0,
	viewBox: "0 0 16 16",
	width: "12",
	height: "12",
	"aria-hidden": "true"
}, y = {
	key: 1,
	viewBox: "0 0 16 16",
	width: "12",
	height: "12",
	"aria-hidden": "true"
}, b = ["for"], x = /*@__PURE__*/ o({
	__name: "ThCheckbox",
	props: /*@__PURE__*/ s({
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
			type: [Boolean, String],
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(o) {
		let s = p(o, "modelValue"), x = f(), S = e(() => o.id ?? x);
		return (e, f) => (c(), n("div", {
			class: "th-checkbox",
			"data-disabled": o.disabled ? "" : void 0
		}, [a(d(g), {
			id: S.value,
			modelValue: s.value,
			"onUpdate:modelValue": f[0] ||= (e) => s.value = e,
			class: "th-checkbox__box",
			disabled: o.disabled,
			required: o.required,
			name: o.name,
			value: o.value
		}, {
			default: m(() => [a(d(h), { class: "th-checkbox__indicator" }, {
				default: m(() => [s.value === "indeterminate" ? (c(), n("svg", v, [...f[1] ||= [r("path", {
					d: "M3 8h10",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, null, -1)]])) : (c(), n("svg", y, [...f[2] ||= [r("path", {
					d: "M2.5 8.5l3.5 3.5 7.5-8",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, null, -1)]]))]),
				_: 1
			})]),
			_: 1
		}, 8, [
			"id",
			"modelValue",
			"disabled",
			"required",
			"name",
			"value"
		]), o.label || e.$slots.default ? (c(), n("label", {
			key: 0,
			class: "th-checkbox__label",
			for: S.value
		}, [l(e.$slots, "default", {}, () => [i(u(o.label), 1)])], 8, b)) : t("", !0)], 8, _));
	}
});
export { x as default };

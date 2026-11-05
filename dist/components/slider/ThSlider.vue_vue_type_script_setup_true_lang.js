import { Fragment as e, computed as t, createBlock as n, createElementBlock as r, createElementVNode as i, createPropsRestProxy as a, createVNode as o, defineComponent as s, mergeModels as c, mergeProps as l, openBlock as u, renderList as d, toDisplayString as f, unref as p, useModel as m, withCtx as h } from "vue";
import { SliderRange as g, SliderRoot as _, SliderThumb as v, SliderTrack as y } from "reka-ui";
// src/components/slider/ThSlider.vue?vue&type=script&setup=true&lang.ts
var b = { class: "th-slider__header" }, x = { class: "th-slider__label" }, S = { class: "th-slider__value" }, C = { class: "th-slider__control" }, w = /*@__PURE__*/ s({
	__name: "ThSlider",
	props: /*@__PURE__*/ c({
		label: {},
		unit: {},
		disabled: { type: Boolean },
		orientation: {},
		dir: {},
		inverted: { type: Boolean },
		min: {},
		max: {},
		step: {},
		minStepsBetweenThumbs: {},
		thumbAlignment: {},
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: { default: () => [0] },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(s) {
		let c = a(s, ["label", "unit"]), w = m(s, "modelValue"), T = t(() => `${w.value.join(" – ")}${s.unit ? ` ${s.unit}` : ""}`);
		return (t, a) => (u(), n(p(_), l(c, {
			modelValue: w.value,
			"onUpdate:modelValue": a[0] ||= (e) => w.value = e,
			class: "th-slider"
		}), {
			default: h(() => [i("div", b, [i("span", x, f(s.label), 1), i("span", S, f(T.value), 1)]), i("div", C, [o(p(y), { class: "th-slider__track" }, {
				default: h(() => [o(p(g), { class: "th-slider__range" })]),
				_: 1
			}), (u(!0), r(e, null, d(w.value, (e, t) => (u(), n(p(v), {
				key: t,
				class: "th-slider__thumb",
				"aria-label": s.label
			}, null, 8, ["aria-label"]))), 128))])]),
			_: 1
		}, 16, ["modelValue"]));
	}
});
export { w as default };

/* empty css                 */
import { computed as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createPropsRestProxy as a, createVNode as o, defineComponent as s, mergeModels as c, mergeProps as l, openBlock as u, toDisplayString as d, unref as f, useId as p, useModel as m, withCtx as h } from "vue";
import { NumberFieldDecrement as g, NumberFieldIncrement as _, NumberFieldInput as v, NumberFieldRoot as y } from "reka-ui";
// src/components/number-field/ThNumberField.vue?vue&type=script&setup=true&lang.ts
var b = ["for"], x = { class: "th-number-field__group" }, S = {
	key: 0,
	class: "th-number-field__unit"
}, C = ["id"], w = /*@__PURE__*/ s({
	__name: "ThNumberField",
	props: /*@__PURE__*/ c({
		label: {},
		help: {},
		unit: {},
		decrementLabel: { default: "Diminuer" },
		incrementLabel: { default: "Augmenter" },
		min: {},
		max: {},
		step: {},
		stepSnapping: {
			type: Boolean,
			default: !0
		},
		allowInvalid: { type: Boolean },
		focusOnChange: {
			type: Boolean,
			default: !0
		},
		formatOptions: {},
		locale: {},
		disabled: { type: Boolean },
		readonly: { type: Boolean },
		disableWheelChange: { type: Boolean },
		invertWheelChange: { type: Boolean },
		id: {},
		startingValue: {},
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(s) {
		let c = a(s, [
			"label",
			"help",
			"unit",
			"decrementLabel",
			"incrementLabel",
			"id",
			"stepSnapping",
			"focusOnChange"
		]), w = m(s, "modelValue"), T = p(), E = e(() => s.id ?? T), D = e(() => `${E.value}-help`);
		return (e, a) => (u(), t(f(y), l(c, {
			modelValue: w.value,
			"onUpdate:modelValue": a[0] ||= (e) => w.value = e,
			"step-snapping": s.stepSnapping,
			"focus-on-change": s.focusOnChange,
			class: "th-number-field th-field"
		}), {
			default: h(() => [
				i("label", {
					class: "th-field__label",
					for: E.value
				}, d(s.label), 9, b),
				i("div", x, [
					o(f(v), {
						id: E.value,
						class: "th-number-field__input",
						"aria-describedby": s.help ? D.value : void 0
					}, null, 8, ["id", "aria-describedby"]),
					o(f(g), {
						class: "th-number-field__step",
						"aria-label": s.decrementLabel
					}, {
						default: h(() => [...a[1] ||= [i("svg", {
							viewBox: "0 0 16 16",
							width: "16",
							height: "16",
							"aria-hidden": "true"
						}, [i("path", {
							d: "M3 8h10",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.5"
						})], -1)]]),
						_: 1
					}, 8, ["aria-label"]),
					o(f(_), {
						class: "th-number-field__step",
						"aria-label": s.incrementLabel
					}, {
						default: h(() => [...a[2] ||= [i("svg", {
							viewBox: "0 0 16 16",
							width: "16",
							height: "16",
							"aria-hidden": "true"
						}, [i("path", {
							d: "M3 8h10M8 3v10",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.5"
						})], -1)]]),
						_: 1
					}, 8, ["aria-label"]),
					s.unit ? (u(), r("span", S, d(s.unit), 1)) : n("", !0)
				]),
				s.help ? (u(), r("p", {
					key: 0,
					id: D.value,
					class: "th-field__help"
				}, d(s.help), 9, C)) : n("", !0)
			]),
			_: 1
		}, 16, [
			"modelValue",
			"step-snapping",
			"focus-on-change"
		]));
	}
});
export { w as default };

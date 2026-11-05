/* empty css                 */
import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createPropsRestProxy as a, createVNode as o, defineComponent as s, mergeModels as c, mergeProps as l, openBlock as u, renderList as d, toDisplayString as f, unref as p, useId as m, useModel as h, withCtx as g } from "vue";
import { PinInputInput as _, PinInputRoot as v } from "reka-ui";
// src/components/pin-input/ThPinInput.vue?vue&type=script&setup=true&lang.ts
var y = { class: "th-pin-input th-field" }, b = ["id"], x = ["id"], S = /*@__PURE__*/ s({
	__name: "ThPinInput",
	props: /*@__PURE__*/ c({
		label: {},
		length: { default: 6 },
		help: {},
		itemLabel: { default: "Chiffre" },
		placeholder: {},
		mask: { type: Boolean },
		otp: { type: Boolean },
		type: { default: "number" },
		dir: {},
		disabled: { type: Boolean },
		id: {},
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: { default: () => [] },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ c(["complete"], ["update:modelValue"]),
	setup(s, { emit: c }) {
		let S = a(s, [
			"label",
			"length",
			"help",
			"itemLabel",
			"type"
		]), C = h(s, "modelValue"), w = c, T = m(), E = m();
		return (a, c) => (u(), r("div", y, [
			i("span", {
				id: p(T),
				class: "th-field__label"
			}, f(s.label), 9, b),
			o(p(v), l(S, {
				modelValue: C.value,
				"onUpdate:modelValue": c[0] ||= (e) => C.value = e,
				type: s.type,
				class: "th-pin-input__group",
				role: "group",
				"aria-labelledby": p(T),
				"aria-describedby": s.help ? p(E) : void 0,
				onComplete: c[1] ||= (e) => w("complete", e)
			}), {
				default: g(() => [(u(!0), r(e, null, d(s.length, (e) => (u(), t(p(_), {
					key: e,
					index: e - 1,
					class: "th-pin-input__cell",
					"aria-label": `${s.itemLabel} ${e} sur ${s.length}`
				}, null, 8, ["index", "aria-label"]))), 128))]),
				_: 1
			}, 16, [
				"modelValue",
				"type",
				"aria-labelledby",
				"aria-describedby"
			]),
			s.help ? (u(), r("p", {
				key: 0,
				id: p(E),
				class: "th-field__help"
			}, f(s.help), 9, x)) : n("", !0)
		]));
	}
});
export { S as default };

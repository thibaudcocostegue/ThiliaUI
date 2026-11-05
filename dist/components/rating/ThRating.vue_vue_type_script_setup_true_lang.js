import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createPropsRestProxy as i, defineComponent as a, mergeModels as o, mergeProps as s, openBlock as c, renderList as l, toDisplayString as u, unref as d, useModel as f, withCtx as p } from "vue";
import { RatingItem as m, RatingItemIndicator as h, RatingRoot as g } from "reka-ui";
// src/components/rating/ThRating.vue?vue&type=script&setup=true&lang.ts
var _ = {
	key: 0,
	class: "th-rating__value"
}, v = /*@__PURE__*/ a({
	__name: "ThRating",
	props: /*@__PURE__*/ o({
		label: {},
		showValue: {
			type: Boolean,
			default: !0
		},
		length: { default: 5 },
		clearable: { type: Boolean },
		hoverable: { type: Boolean },
		step: {},
		disabled: { type: Boolean },
		orientation: {},
		dir: {},
		loop: { type: Boolean },
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: { default: 0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(a) {
		let o = i(a, [
			"label",
			"showValue",
			"length"
		]), v = f(a, "modelValue");
		return (i, f) => (c(), t(d(g), s(o, {
			modelValue: v.value,
			"onUpdate:modelValue": f[0] ||= (e) => v.value = e,
			length: a.length,
			class: "th-rating",
			"aria-label": a.label
		}), {
			default: p(({ items: i }) => [(c(!0), r(e, null, l(i, (n) => (c(), t(d(m), {
				key: n,
				item: n,
				class: "th-rating__item"
			}, {
				default: p(({ steps: n }) => [(c(!0), r(e, null, l(n, (e) => (c(), t(d(h), {
					key: e,
					step: e,
					class: "th-rating__square",
					"aria-label": `${e} sur ${a.length}`
				}, null, 8, ["step", "aria-label"]))), 128))]),
				_: 1
			}, 8, ["item"]))), 128)), a.showValue ? (c(), r("span", _, u(v.value) + " / " + u(a.length), 1)) : n("", !0)]),
			_: 1
		}, 16, [
			"modelValue",
			"length",
			"aria-label"
		]));
	}
});
export { v as default };

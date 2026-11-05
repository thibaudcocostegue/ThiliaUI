import { computed as e, createCommentVNode as t, createElementBlock as n, createTextVNode as r, createVNode as i, defineComponent as a, openBlock as o, renderSlot as s, toDisplayString as c, unref as l, useId as u, withCtx as d } from "vue";
import { RadioGroupIndicator as f, RadioGroupItem as p } from "reka-ui";
// src/components/radio-group/ThRadio.vue?vue&type=script&setup=true&lang.ts
var m = { class: "th-radio" }, h = ["for"], g = /*@__PURE__*/ a({
	__name: "ThRadio",
	props: {
		value: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {}
	},
	setup(a) {
		let g = u(), _ = e(() => a.id ?? g);
		return (e, u) => (o(), n("div", m, [i(l(p), {
			id: _.value,
			class: "th-radio__box",
			value: a.value,
			disabled: a.disabled
		}, {
			default: d(() => [i(l(f), { class: "th-radio__indicator" })]),
			_: 1
		}, 8, [
			"id",
			"value",
			"disabled"
		]), a.label || e.$slots.default ? (o(), n("label", {
			key: 0,
			class: "th-radio__label",
			for: _.value
		}, [s(e.$slots, "default", {}, () => [r(c(a.label), 1)])], 8, h)) : t("", !0)]));
	}
});
export { g as default };

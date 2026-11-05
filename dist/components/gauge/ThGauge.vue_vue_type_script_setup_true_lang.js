import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, normalizeStyle as l, openBlock as u, toDisplayString as d, unref as f, withCtx as p } from "vue";
import { ProgressIndicator as m, ProgressRoot as h } from "reka-ui";
// src/components/gauge/ThGauge.vue?vue&type=script&setup=true&lang.ts
var g = { class: "th-gauge" }, _ = {
	class: "th-gauge__label",
	"aria-hidden": "true"
}, v = /*@__PURE__*/ c({
	__name: "ThGauge",
	props: {
		value: {},
		max: { default: 100 },
		label: {},
		showValue: {
			type: Boolean,
			default: !0
		},
		valueText: {}
	},
	setup(c) {
		let v = t(() => c.value === null ? null : Math.round(Math.min(Math.max(c.value, 0), c.max) / c.max * 100));
		return (t, y) => (u(), i("div", g, [a("p", _, [o(d(c.label), 1), c.showValue && v.value !== null ? (u(), i(e, { key: 0 }, [o(" · " + d(v.value) + " %", 1)], 64)) : r("", !0)]), s(f(h), {
			class: "th-gauge__track",
			"model-value": c.value,
			max: c.max,
			"get-value-label": () => c.label,
			"get-value-text": c.valueText ? () => c.valueText : void 0
		}, {
			default: p(() => [v.value === null ? r("", !0) : (u(), n(f(m), {
				key: 0,
				class: "th-gauge__fill",
				style: l({ "--th-gauge-percent": `${v.value}%` })
			}, null, 8, ["style"]))]),
			_: 1
		}, 8, [
			"model-value",
			"max",
			"get-value-label",
			"get-value-text"
		])]));
	}
});
export { v as default };

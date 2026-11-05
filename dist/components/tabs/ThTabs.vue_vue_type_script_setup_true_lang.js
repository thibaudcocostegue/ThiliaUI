import { Fragment as e, createBlock as t, createElementBlock as n, createTextVNode as r, createVNode as i, defineComponent as a, mergeModels as o, openBlock as s, renderList as c, renderSlot as l, toDisplayString as u, unref as d, useModel as f, withCtx as p } from "vue";
import { TabsContent as m, TabsList as h, TabsRoot as g, TabsTrigger as _ } from "reka-ui";
// src/components/tabs/ThTabs.vue?vue&type=script&setup=true&lang.ts
var v = /*@__PURE__*/ a({
	__name: "ThTabs",
	props: /*@__PURE__*/ o({
		tabs: {},
		label: {},
		activationMode: { default: "automatic" }
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(a) {
		let o = f(a, "modelValue");
		return (f, v) => (s(), t(d(g), {
			modelValue: o.value,
			"onUpdate:modelValue": v[0] ||= (e) => o.value = e,
			"default-value": a.tabs[0]?.value,
			class: "th-tabs",
			"activation-mode": a.activationMode
		}, {
			default: p(() => [i(d(h), {
				class: "th-tabs__list",
				"aria-label": a.label
			}, {
				default: p(() => [(s(!0), n(e, null, c(a.tabs, (e) => (s(), t(d(_), {
					key: e.value,
					class: "th-tabs__tab",
					value: e.value,
					disabled: e.disabled
				}, {
					default: p(() => [r(u(e.label), 1)]),
					_: 2
				}, 1032, ["value", "disabled"]))), 128))]),
				_: 1
			}, 8, ["aria-label"]), (s(!0), n(e, null, c(a.tabs, (e) => (s(), t(d(m), {
				key: e.value,
				class: "th-tabs__panel",
				value: e.value
			}, {
				default: p(() => [l(f.$slots, e.value)]),
				_: 2
			}, 1032, ["value"]))), 128))]),
			_: 3
		}, 8, [
			"modelValue",
			"default-value",
			"activation-mode"
		]));
	}
});
export { v as default };

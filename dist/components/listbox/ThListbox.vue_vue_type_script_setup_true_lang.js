/* empty css                 */
/* empty css                   */
import { Fragment as e, createBlock as t, createElementBlock as n, createElementVNode as r, createVNode as i, defineComponent as a, mergeModels as o, openBlock as s, renderList as c, toDisplayString as l, unref as u, useId as d, useModel as f, withCtx as p } from "vue";
import { ListboxContent as m, ListboxItem as h, ListboxItemIndicator as g, ListboxRoot as _ } from "reka-ui";
// src/components/listbox/ThListbox.vue?vue&type=script&setup=true&lang.ts
var v = { class: "th-listbox th-field" }, y = ["id"], b = /*@__PURE__*/ a({
	__name: "ThListbox",
	props: /*@__PURE__*/ o({
		label: {},
		options: {},
		multiple: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		name: {}
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(a) {
		let o = f(a, "modelValue"), b = d();
		return (d, f) => (s(), n("div", v, [r("span", {
			id: u(b),
			class: "th-field__label"
		}, l(a.label), 9, y), i(u(_), {
			modelValue: o.value,
			"onUpdate:modelValue": f[0] ||= (e) => o.value = e,
			multiple: a.multiple,
			disabled: a.disabled,
			name: a.name,
			class: "th-listbox__root th-options"
		}, {
			default: p(() => [i(u(m), {
				class: "th-listbox__content",
				"aria-labelledby": u(b)
			}, {
				default: p(() => [(s(!0), n(e, null, c(a.options, (e) => (s(), t(u(h), {
					key: e.value,
					value: e.value,
					disabled: e.disabled,
					class: "th-options__item"
				}, {
					default: p(() => [r("span", null, l(e.label), 1), i(u(g), { class: "th-options__check" }, {
						default: p(() => [...f[1] ||= [r("svg", {
							viewBox: "0 0 16 16",
							width: "16",
							height: "16",
							"aria-hidden": "true"
						}, [r("path", {
							d: "M3 8.5l3 3 7-7",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.5"
						})], -1)]]),
						_: 1
					})]),
					_: 2
				}, 1032, ["value", "disabled"]))), 128))]),
				_: 1
			}, 8, ["aria-labelledby"])]),
			_: 1
		}, 8, [
			"modelValue",
			"multiple",
			"disabled",
			"name"
		])]));
	}
});
export { b as default };

import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, mergeModels as l, openBlock as u, renderList as d, toDisplayString as f, unref as p, useId as m, useModel as h, withCtx as g } from "vue";
import { SelectContent as _, SelectIcon as v, SelectItem as y, SelectItemIndicator as b, SelectItemText as x, SelectPortal as S, SelectRoot as C, SelectTrigger as w, SelectValue as T, SelectViewport as E } from "reka-ui";
// src/components/select/ThSelect.vue?vue&type=script&setup=true&lang.ts
var D = ["data-size"], O = ["for"], k = ["id"], A = /*@__PURE__*/ c({
	__name: "ThSelect",
	props: /*@__PURE__*/ l({
		label: {},
		options: {},
		placeholder: {},
		help: {},
		size: { default: "40" },
		disabled: {
			type: Boolean,
			default: !1
		},
		required: {
			type: Boolean,
			default: !1
		},
		name: {},
		id: {}
	}, {
		modelValue: {},
		modelModifiers: {},
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: ["update:modelValue", "update:open"],
	setup(c) {
		let l = h(c, "modelValue"), A = h(c, "open"), j = m(), M = t(() => c.id ?? j), N = t(() => `${M.value}-help`);
		return (t, m) => (u(), i("div", {
			class: "th-select",
			"data-size": c.size
		}, [
			a("label", {
				class: "th-select__label",
				for: M.value
			}, f(c.label), 9, O),
			s(p(C), {
				modelValue: l.value,
				"onUpdate:modelValue": m[0] ||= (e) => l.value = e,
				open: A.value,
				"onUpdate:open": m[1] ||= (e) => A.value = e,
				disabled: c.disabled,
				required: c.required,
				name: c.name
			}, {
				default: g(() => [s(p(w), {
					id: M.value,
					class: "th-select__trigger",
					"aria-describedby": c.help ? N.value : void 0
				}, {
					default: g(() => [s(p(T), {
						class: "th-select__value",
						placeholder: c.placeholder
					}, null, 8, ["placeholder"]), s(p(v), { class: "th-select__icon" }, {
						default: g(() => [...m[2] ||= [a("svg", {
							viewBox: "0 0 16 16",
							width: "16",
							height: "16",
							"aria-hidden": "true"
						}, [a("path", {
							d: "M4 6l4 4 4-4",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.5"
						})], -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["id", "aria-describedby"]), s(p(S), null, {
					default: g(() => [s(p(_), {
						class: "th-select__content",
						position: "popper",
						"side-offset": 4
					}, {
						default: g(() => [s(p(E), null, {
							default: g(() => [(u(!0), i(e, null, d(c.options, (e) => (u(), n(p(y), {
								key: e.value,
								class: "th-select__item",
								value: e.value,
								disabled: e.disabled
							}, {
								default: g(() => [s(p(x), null, {
									default: g(() => [o(f(e.label), 1)]),
									_: 2
								}, 1024), s(p(b), { class: "th-select__check" }, {
									default: g(() => [...m[3] ||= [a("svg", {
										viewBox: "0 0 16 16",
										width: "16",
										height: "16",
										"aria-hidden": "true"
									}, [a("path", {
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
						})]),
						_: 1
					})]),
					_: 1
				})]),
				_: 1
			}, 8, [
				"modelValue",
				"open",
				"disabled",
				"required",
				"name"
			]),
			c.help ? (u(), i("p", {
				key: 0,
				id: N.value,
				class: "th-select__help"
			}, f(c.help), 9, k)) : r("", !0)
		], 8, D));
	}
});
export { A as default };

/* empty css                 */
/* empty css                   */
import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, mergeModels as l, openBlock as u, ref as d, renderList as f, toDisplayString as p, unref as m, useId as h, useModel as g, withCtx as _ } from "vue";
import { ComboboxAnchor as v, ComboboxContent as y, ComboboxEmpty as b, ComboboxInput as x, ComboboxItem as S, ComboboxItemIndicator as C, ComboboxPortal as w, ComboboxRoot as T, ComboboxTrigger as E, ComboboxViewport as D } from "reka-ui";
// src/components/combobox/ThCombobox.vue?vue&type=script&setup=true&lang.ts
var O = ["data-size"], k = ["for"], A = ["id"], j = /*@__PURE__*/ c({
	__name: "ThCombobox",
	props: /*@__PURE__*/ l({
		label: {},
		options: {},
		placeholder: {},
		help: {},
		emptyLabel: { default: "Aucun résultat" },
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
		let l = g(c, "modelValue"), j = g(c, "open"), M = h(), N = t(() => c.id ?? M), P = t(() => `${N.value}-help`), F = d(""), I = t(() => {
			let e = F.value.trim().toLocaleLowerCase();
			return e ? c.options.filter((t) => t.label.toLocaleLowerCase().includes(e)) : c.options;
		}), L = (e) => c.options.find((t) => t.value === e)?.label ?? "";
		return (t, d) => (u(), i("div", {
			class: "th-combobox th-field",
			"data-size": c.size
		}, [
			a("label", {
				class: "th-field__label",
				for: N.value
			}, p(c.label), 9, k),
			s(m(T), {
				modelValue: l.value,
				"onUpdate:modelValue": d[1] ||= (e) => l.value = e,
				open: j.value,
				"onUpdate:open": d[2] ||= (e) => j.value = e,
				"ignore-filter": "",
				disabled: c.disabled,
				required: c.required,
				name: c.name
			}, {
				default: _(() => [s(m(v), { class: "th-combobox__anchor" }, {
					default: _(() => [s(m(x), {
						id: N.value,
						modelValue: F.value,
						"onUpdate:modelValue": d[0] ||= (e) => F.value = e,
						class: "th-combobox__input",
						placeholder: c.placeholder,
						"display-value": L,
						"aria-describedby": c.help ? P.value : void 0
					}, null, 8, [
						"id",
						"modelValue",
						"placeholder",
						"aria-describedby"
					]), s(m(E), {
						class: "th-combobox__trigger",
						"aria-label": "Afficher les options",
						tabindex: "-1"
					}, {
						default: _(() => [...d[3] ||= [a("svg", {
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
				}), s(m(w), null, {
					default: _(() => [s(m(y), {
						class: "th-combobox__content th-options",
						position: "popper",
						"side-offset": 4
					}, {
						default: _(() => [s(m(D), null, {
							default: _(() => [s(m(b), { class: "th-options__empty" }, {
								default: _(() => [o(p(c.emptyLabel), 1)]),
								_: 1
							}), (u(!0), i(e, null, f(I.value, (e) => (u(), n(m(S), {
								key: e.value,
								class: "th-options__item",
								value: e.value,
								disabled: e.disabled
							}, {
								default: _(() => [a("span", null, p(e.label), 1), s(m(C), { class: "th-options__check" }, {
									default: _(() => [...d[4] ||= [a("svg", {
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
				id: P.value,
				class: "th-field__help"
			}, p(c.help), 9, A)) : r("", !0)
		], 8, O));
	}
});
export { j as default };

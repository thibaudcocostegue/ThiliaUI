/* empty css                 */
/* empty css                   */
import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, mergeModels as l, openBlock as u, renderList as d, toDisplayString as f, unref as p, useId as m, useModel as h, withCtx as g } from "vue";
import { AutocompleteAnchor as _, AutocompleteContent as v, AutocompleteInput as y, AutocompleteItem as b, AutocompletePortal as x, AutocompleteRoot as S, AutocompleteViewport as C } from "reka-ui";
// src/components/autocomplete/ThAutocomplete.vue?vue&type=script&setup=true&lang.ts
var w = ["data-size"], T = ["for"], E = ["id"], D = /*@__PURE__*/ c({
	__name: "ThAutocomplete",
	props: /*@__PURE__*/ l({
		label: {},
		suggestions: {},
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
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(c) {
		let l = h(c, "modelValue"), D = m(), O = t(() => c.id ?? D), k = t(() => `${O.value}-help`), A = t(() => {
			let e = l.value.trim().toLocaleLowerCase();
			return c.suggestions.filter((t) => t.toLocaleLowerCase().includes(e) && t.toLocaleLowerCase() !== e);
		});
		return (t, m) => (u(), i("div", {
			class: "th-autocomplete th-field",
			"data-size": c.size
		}, [
			a("label", {
				class: "th-field__label",
				for: O.value
			}, f(c.label), 9, T),
			s(p(S), {
				modelValue: l.value,
				"onUpdate:modelValue": m[0] ||= (e) => l.value = e,
				"ignore-filter": "",
				disabled: c.disabled,
				required: c.required,
				name: c.name
			}, {
				default: g(() => [s(p(_), { class: "th-autocomplete__anchor" }, {
					default: g(() => [s(p(y), {
						id: O.value,
						class: "th-autocomplete__input",
						placeholder: c.placeholder,
						"aria-describedby": c.help ? k.value : void 0
					}, null, 8, [
						"id",
						"placeholder",
						"aria-describedby"
					])]),
					_: 1
				}), s(p(x), null, {
					default: g(() => [A.value.length ? (u(), n(p(v), {
						key: 0,
						class: "th-autocomplete__content th-options",
						position: "popper",
						"side-offset": 4
					}, {
						default: g(() => [s(p(C), null, {
							default: g(() => [(u(!0), i(e, null, d(A.value, (e) => (u(), n(p(b), {
								key: e,
								class: "th-options__item",
								value: e
							}, {
								default: g(() => [o(f(e), 1)]),
								_: 2
							}, 1032, ["value"]))), 128))]),
							_: 1
						})]),
						_: 1
					})) : r("", !0)]),
					_: 1
				})]),
				_: 1
			}, 8, [
				"modelValue",
				"disabled",
				"required",
				"name"
			]),
			c.help ? (u(), i("p", {
				key: 0,
				id: k.value,
				class: "th-field__help"
			}, f(c.help), 9, E)) : r("", !0)
		], 8, w));
	}
});
export { D as default };

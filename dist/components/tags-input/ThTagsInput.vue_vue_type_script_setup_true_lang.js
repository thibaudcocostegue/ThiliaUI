/* empty css                 */
import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createPropsRestProxy as o, createVNode as s, defineComponent as c, mergeModels as l, mergeProps as u, openBlock as d, renderList as f, toDisplayString as p, unref as m, useId as h, useModel as g, withCtx as _ } from "vue";
import { TagsInputInput as v, TagsInputItem as y, TagsInputItemDelete as b, TagsInputItemText as x, TagsInputRoot as S } from "reka-ui";
// src/components/tags-input/ThTagsInput.vue?vue&type=script&setup=true&lang.ts
var C = { class: "th-tags-input th-field" }, w = ["for"], T = ["id"], E = /*@__PURE__*/ c({
	__name: "ThTagsInput",
	props: /*@__PURE__*/ l({
		label: {},
		placeholder: {},
		help: {},
		removeLabel: { default: "Retirer" },
		id: {},
		addOnPaste: { type: Boolean },
		addOnTab: { type: Boolean },
		addOnBlur: { type: Boolean },
		duplicate: { type: Boolean },
		disabled: { type: Boolean },
		delimiter: {},
		dir: {},
		max: {},
		convertValue: { type: Function },
		displayValue: { type: Function },
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: { default: () => [] },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(c) {
		let l = o(c, [
			"label",
			"placeholder",
			"help",
			"removeLabel",
			"id"
		]), E = g(c, "modelValue"), D = h(), O = t(() => c.id ?? D), k = t(() => `${O.value}-help`);
		return (t, o) => (d(), i("div", C, [
			a("label", {
				class: "th-field__label",
				for: O.value
			}, p(c.label), 9, w),
			s(m(S), u(l, {
				modelValue: E.value,
				"onUpdate:modelValue": o[0] ||= (e) => E.value = e,
				class: "th-tags-input__box"
			}), {
				default: _(() => [(d(!0), i(e, null, f(E.value, (e) => (d(), n(m(y), {
					key: e,
					value: e,
					class: "th-tags-input__tag"
				}, {
					default: _(() => [s(m(x)), s(m(b), {
						class: "th-tags-input__remove",
						"aria-labelledby": void 0,
						"aria-label": `${c.removeLabel} ${e}`
					}, {
						default: _(() => [...o[1] ||= [a("svg", {
							viewBox: "0 0 16 16",
							width: "10",
							height: "10",
							"aria-hidden": "true"
						}, [a("path", {
							d: "M3 3l10 10M13 3L3 13",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.5"
						})], -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					_: 2
				}, 1032, ["value"]))), 128)), s(m(v), {
					id: O.value,
					class: "th-tags-input__field",
					placeholder: c.placeholder,
					"aria-describedby": c.help ? k.value : void 0
				}, null, 8, [
					"id",
					"placeholder",
					"aria-describedby"
				])]),
				_: 1
			}, 16, ["modelValue"]),
			c.help ? (d(), i("p", {
				key: 0,
				id: k.value,
				class: "th-field__help"
			}, p(c.help), 9, T)) : r("", !0)
		]));
	}
});
export { E as default };

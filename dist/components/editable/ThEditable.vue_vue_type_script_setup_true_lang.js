import { createBlock as e, createCommentVNode as t, createPropsRestProxy as n, createTextVNode as r, createVNode as i, defineComponent as a, mergeModels as o, mergeProps as s, openBlock as c, ref as l, toDisplayString as u, unref as d, useModel as f, vShow as p, withCtx as m, withDirectives as h } from "vue";
import { EditableArea as g, EditableCancelTrigger as _, EditableEditTrigger as v, EditableInput as y, EditableRoot as b, EditableSubmitTrigger as x } from "reka-ui";
// src/components/editable/ThEditable.vue?vue&type=script&setup=true&lang.ts
var S = /*@__PURE__*/ a({
	__name: "ThEditable",
	props: /*@__PURE__*/ o({
		label: {},
		submitLabel: { default: "Valider" },
		cancelLabel: { default: "Annuler" },
		placeholder: {},
		dir: {},
		disabled: { type: Boolean },
		readonly: { type: Boolean },
		selectOnFocus: { type: Boolean },
		submitMode: { default: "enter" },
		startWithEditMode: { type: Boolean },
		maxLength: {},
		autoResize: { type: Boolean },
		id: {},
		name: {},
		required: { type: Boolean }
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ o(["submit"], ["update:modelValue"]),
	setup(a, { emit: o }) {
		let S = n(a, [
			"label",
			"submitLabel",
			"cancelLabel",
			"submitMode"
		]), C = f(a, "modelValue"), w = o, T = l(null);
		function E(e) {
			e !== "edit" && setTimeout(() => T.value?.$el.focus());
		}
		return (n, o) => (c(), e(d(b), s(S, {
			modelValue: C.value,
			"onUpdate:modelValue": o[0] ||= (e) => C.value = e,
			"activation-mode": "none",
			"submit-mode": a.submitMode,
			class: "th-editable",
			onSubmit: o[1] ||= (e) => w("submit", e),
			"onUpdate:state": E
		}), {
			default: m(({ isEditing: n }) => [h(i(d(g), { class: "th-editable__area" }, {
				default: m(() => [
					i(d(y), {
						class: "th-editable__input",
						"aria-label": a.label
					}, null, 8, ["aria-label"]),
					i(d(_), {
						class: "th-editable__button",
						"data-variant": "secondary",
						"aria-label": a.cancelLabel
					}, {
						default: m(() => [r(u(a.cancelLabel), 1)]),
						_: 1
					}, 8, ["aria-label"]),
					i(d(x), {
						class: "th-editable__button",
						"data-variant": "primary",
						"aria-label": a.submitLabel
					}, {
						default: m(() => [r(u(a.submitLabel), 1)]),
						_: 1
					}, 8, ["aria-label"])
				]),
				_: 1
			}, 512), [[p, n]]), n ? t("", !0) : (c(), e(d(v), {
				key: 0,
				ref_key: "trigger",
				ref: T,
				class: "th-editable__value",
				"aria-label": `Modifier ${a.label} : ${C.value || S.placeholder || ""}`
			}, {
				default: m(() => [r(u(C.value || S.placeholder), 1)]),
				_: 1
			}, 8, ["aria-label"]))]),
			_: 1
		}, 16, ["modelValue", "submit-mode"]));
	}
});
export { S as default };

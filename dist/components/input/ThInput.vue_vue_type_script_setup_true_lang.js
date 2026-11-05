import { computed as e, createCommentVNode as t, createElementBlock as n, createElementVNode as r, defineComponent as i, mergeModels as a, mergeProps as o, openBlock as s, toDisplayString as c, useAttrs as l, useId as u, useModel as d, vModelDynamic as f, withDirectives as p } from "vue";
// src/components/input/ThInput.vue?vue&type=script&setup=true&lang.ts
var m = [
	"data-size",
	"data-invalid",
	"data-disabled"
], h = ["for"], g = [
	"id",
	"type",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], _ = ["id", "role"], v = /*@__PURE__*/ i({
	inheritAttrs: !1,
	__name: "ThInput",
	props: /*@__PURE__*/ a({
		label: {},
		help: {},
		error: {},
		type: { default: "text" },
		size: { default: "40" },
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {}
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(i) {
		let a = d(i, "modelValue"), v = l(), y = e(() => ({
			class: v.class,
			style: v.style
		})), b = e(() => {
			let { class: e, style: t, ...n } = v;
			return n;
		}), x = u(), S = e(() => i.id ?? x), C = e(() => `${S.value}-message`), w = e(() => i.error || i.help);
		return (e, l) => (s(), n("div", o({ class: "th-input" }, y.value, {
			"data-size": i.size,
			"data-invalid": i.error ? "" : void 0,
			"data-disabled": i.disabled ? "" : void 0
		}), [
			r("label", {
				class: "th-input__label",
				for: S.value
			}, c(i.label), 9, h),
			p(r("input", o(b.value, {
				id: S.value,
				"onUpdate:modelValue": l[0] ||= (e) => a.value = e,
				class: "th-input__field",
				type: i.type,
				disabled: i.disabled,
				"aria-invalid": i.error ? "true" : void 0,
				"aria-describedby": w.value ? C.value : void 0
			}), null, 16, g), [[f, a.value]]),
			w.value ? (s(), n("p", {
				key: 0,
				id: C.value,
				class: "th-input__message",
				role: i.error ? "alert" : void 0
			}, c(w.value), 9, _)) : t("", !0)
		], 16, m));
	}
});
export { v as default };

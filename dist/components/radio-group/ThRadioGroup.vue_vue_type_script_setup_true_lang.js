import { createBlock as e, defineComponent as t, mergeModels as n, openBlock as r, renderSlot as i, unref as a, useModel as o, withCtx as s } from "vue";
import { RadioGroupRoot as c } from "reka-ui";
// src/components/radio-group/ThRadioGroup.vue?vue&type=script&setup=true&lang.ts
var l = /*@__PURE__*/ t({
	__name: "ThRadioGroup",
	props: /*@__PURE__*/ n({
		label: {},
		orientation: { default: "vertical" },
		disabled: {
			type: Boolean,
			default: !1
		},
		required: {
			type: Boolean,
			default: !1
		},
		name: {}
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(t) {
		let n = o(t, "modelValue");
		return (o, l) => (r(), e(a(c), {
			modelValue: n.value,
			"onUpdate:modelValue": l[0] ||= (e) => n.value = e,
			class: "th-radio-group",
			"aria-label": t.label,
			orientation: t.orientation,
			disabled: t.disabled,
			required: t.required,
			name: t.name
		}, {
			default: s(() => [i(o.$slots, "default")]),
			_: 3
		}, 8, [
			"modelValue",
			"aria-label",
			"orientation",
			"disabled",
			"required",
			"name"
		]));
	}
});
export { l as default };

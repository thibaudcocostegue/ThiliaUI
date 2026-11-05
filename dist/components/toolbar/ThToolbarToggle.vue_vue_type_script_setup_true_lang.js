import { createBlock as e, createVNode as t, defineComponent as n, mergeModels as r, openBlock as i, renderSlot as a, unref as o, useModel as s, withCtx as c } from "vue";
import { ToolbarToggleGroup as l, ToolbarToggleItem as u } from "reka-ui";
// src/components/toolbar/ThToolbarToggle.vue?vue&type=script&setup=true&lang.ts
var d = /*@__PURE__*/ n({
	__name: "ThToolbarToggle",
	props: /*@__PURE__*/ r({
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(n) {
		let r = s(n, "modelValue");
		function d(e) {
			r.value = Array.isArray(e) && e.length > 0;
		}
		return (s, f) => (i(), e(o(l), {
			type: "multiple",
			"model-value": r.value ? ["on"] : [],
			"onUpdate:modelValue": d
		}, {
			default: c(() => [t(o(u), {
				value: "on",
				class: "th-toolbar__button",
				disabled: n.disabled,
				"aria-label": n.label
			}, {
				default: c(() => [a(s.$slots, "default")]),
				_: 3
			}, 8, ["disabled", "aria-label"])]),
			_: 3
		}, 8, ["model-value"]));
	}
});
export { d as default };

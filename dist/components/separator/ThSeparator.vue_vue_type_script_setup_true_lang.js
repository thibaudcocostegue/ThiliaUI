import { createBlock as e, defineComponent as t, openBlock as n, unref as r } from "vue";
import { Separator as i } from "reka-ui";
// src/components/separator/ThSeparator.vue?vue&type=script&setup=true&lang.ts
var a = /*@__PURE__*/ t({
	__name: "ThSeparator",
	props: {
		orientation: { default: "horizontal" },
		decorative: {
			type: Boolean,
			default: !1
		},
		asChild: { type: Boolean },
		as: {}
	},
	setup(t) {
		return (a, o) => (n(), e(r(i), {
			class: "th-separator",
			orientation: t.orientation,
			decorative: t.decorative,
			as: t.as,
			"as-child": t.asChild
		}, null, 8, [
			"orientation",
			"decorative",
			"as",
			"as-child"
		]));
	}
});
export { a as default };

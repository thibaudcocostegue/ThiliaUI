import { createBlock as e, createVNode as t, defineComponent as n, mergeModels as r, openBlock as i, renderSlot as a, unref as o, useModel as s, withCtx as c } from "vue";
import { HoverCardContent as l, HoverCardPortal as u, HoverCardRoot as d, HoverCardTrigger as f } from "reka-ui";
// src/components/hover-card/ThHoverCard.vue?vue&type=script&setup=true&lang.ts
var p = /*@__PURE__*/ n({
	__name: "ThHoverCard",
	props: /*@__PURE__*/ r({
		openDelay: { default: 400 },
		closeDelay: { default: 200 },
		side: { default: "bottom" }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: ["update:open"],
	setup(n) {
		let r = s(n, "open");
		return (s, p) => (i(), e(o(d), {
			open: r.value,
			"onUpdate:open": p[0] ||= (e) => r.value = e,
			"open-delay": n.openDelay,
			"close-delay": n.closeDelay
		}, {
			default: c(() => [t(o(f), { "as-child": "" }, {
				default: c(() => [a(s.$slots, "default")]),
				_: 3
			}), t(o(u), null, {
				default: c(() => [t(o(l), {
					class: "th-hover-card",
					side: n.side,
					"side-offset": 8,
					"collision-padding": 8
				}, {
					default: c(() => [a(s.$slots, "content")]),
					_: 3
				}, 8, ["side"])]),
				_: 3
			})]),
			_: 3
		}, 8, [
			"open",
			"open-delay",
			"close-delay"
		]));
	}
});
export { p as default };

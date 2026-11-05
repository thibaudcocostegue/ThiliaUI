import { createBlock as e, createVNode as t, defineComponent as n, mergeModels as r, openBlock as i, renderSlot as a, unref as o, useModel as s, withCtx as c } from "vue";
import { PopoverContent as l, PopoverPortal as u, PopoverRoot as d, PopoverTrigger as f } from "reka-ui";
// src/components/popover/ThPopover.vue?vue&type=script&setup=true&lang.ts
var p = /*@__PURE__*/ n({
	__name: "ThPopover",
	props: /*@__PURE__*/ r({
		side: { default: "bottom" },
		align: { default: "start" }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: ["update:open"],
	setup(n) {
		let r = s(n, "open"), p = () => {
			r.value = !1;
		};
		return (s, m) => (i(), e(o(d), {
			open: r.value,
			"onUpdate:open": m[0] ||= (e) => r.value = e
		}, {
			default: c(() => [t(o(f), { "as-child": "" }, {
				default: c(() => [a(s.$slots, "trigger")]),
				_: 3
			}), t(o(u), null, {
				default: c(() => [t(o(l), {
					class: "th-popover",
					side: n.side,
					align: n.align,
					"side-offset": 8,
					"collision-padding": 8
				}, {
					default: c(() => [a(s.$slots, "default", { close: p })]),
					_: 3
				}, 8, ["side", "align"])]),
				_: 3
			})]),
			_: 3
		}, 8, ["open"]));
	}
});
export { p as default };

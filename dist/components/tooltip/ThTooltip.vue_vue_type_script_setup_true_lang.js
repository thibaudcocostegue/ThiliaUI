import { createBlock as e, createTextVNode as t, createVNode as n, defineComponent as r, mergeModels as i, openBlock as a, renderSlot as o, toDisplayString as s, unref as c, useModel as l, withCtx as u } from "vue";
import { TooltipContent as d, TooltipPortal as f, TooltipProvider as p, TooltipRoot as m, TooltipTrigger as h } from "reka-ui";
// src/components/tooltip/ThTooltip.vue?vue&type=script&setup=true&lang.ts
var g = /*@__PURE__*/ r({
	__name: "ThTooltip",
	props: /*@__PURE__*/ i({
		content: {},
		side: { default: "top" },
		delayDuration: { default: 400 },
		disabled: {
			type: Boolean,
			default: !1
		}
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: ["update:open"],
	setup(r) {
		let i = l(r, "open");
		return (l, g) => (a(), e(c(p), { "delay-duration": r.delayDuration }, {
			default: u(() => [n(c(m), {
				open: i.value,
				"onUpdate:open": g[0] ||= (e) => i.value = e,
				disabled: r.disabled
			}, {
				default: u(() => [n(c(h), { "as-child": "" }, {
					default: u(() => [o(l.$slots, "default")]),
					_: 3
				}), n(c(f), null, {
					default: u(() => [n(c(d), {
						class: "th-tooltip",
						side: r.side,
						"side-offset": 8,
						"collision-padding": 8
					}, {
						default: u(() => [o(l.$slots, "content", {}, () => [t(s(r.content), 1)])]),
						_: 3
					}, 8, ["side"])]),
					_: 3
				})]),
				_: 3
			}, 8, ["open", "disabled"])]),
			_: 3
		}, 8, ["delay-duration"]));
	}
});
export { g as default };

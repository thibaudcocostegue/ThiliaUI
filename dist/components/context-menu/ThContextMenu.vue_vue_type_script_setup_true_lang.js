/* empty css                */
import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createTextVNode as i, createVNode as a, defineComponent as o, openBlock as s, renderList as c, renderSlot as l, toDisplayString as u, unref as d, withCtx as f } from "vue";
import { ContextMenuContent as p, ContextMenuItem as m, ContextMenuLabel as h, ContextMenuPortal as g, ContextMenuRoot as _, ContextMenuSeparator as v, ContextMenuTrigger as y } from "reka-ui";
// src/components/context-menu/ThContextMenu.vue?vue&type=script&setup=true&lang.ts
var b = {
	key: 0,
	class: "th-menu__shortcut"
}, x = /*@__PURE__*/ o({
	__name: "ThContextMenu",
	props: {
		items: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["select"],
	setup(o, { emit: x }) {
		let S = x;
		return (x, C) => (s(), t(d(_), null, {
			default: f(() => [a(d(y), {
				class: "th-context-menu",
				disabled: o.disabled
			}, {
				default: f(() => [l(x.$slots, "default")]),
				_: 3
			}, 8, ["disabled"]), a(d(g), null, {
				default: f(() => [a(d(p), {
					class: "th-menu",
					"collision-padding": 8
				}, {
					default: f(() => [(s(!0), r(e, null, c(o.items, (a, o) => (s(), r(e, { key: o }, [a.type === "separator" ? (s(), t(d(v), {
						key: 0,
						class: "th-menu__separator"
					})) : a.type === "label" ? (s(), t(d(h), {
						key: 1,
						class: "th-menu__label"
					}, {
						default: f(() => [i(u(a.label), 1)]),
						_: 2
					}, 1024)) : (s(), t(d(m), {
						key: 2,
						class: "th-menu__item",
						"data-variant": a.variant,
						disabled: a.disabled,
						onSelect: (e) => S("select", a.value)
					}, {
						default: f(() => [i(u(a.label) + " ", 1), a.shortcut ? (s(), r("span", b, u(a.shortcut), 1)) : n("", !0)]),
						_: 2
					}, 1032, [
						"data-variant",
						"disabled",
						"onSelect"
					]))], 64))), 128))]),
					_: 1
				})]),
				_: 1
			})]),
			_: 3
		}));
	}
});
export { x as default };

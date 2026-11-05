/* empty css                */
import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createTextVNode as i, createVNode as a, defineComponent as o, mergeModels as s, openBlock as c, renderList as l, renderSlot as u, toDisplayString as d, unref as f, useModel as p, withCtx as m } from "vue";
import { DropdownMenuContent as h, DropdownMenuItem as g, DropdownMenuLabel as _, DropdownMenuPortal as v, DropdownMenuRoot as y, DropdownMenuSeparator as b, DropdownMenuTrigger as x } from "reka-ui";
// src/components/dropdown-menu/ThDropdownMenu.vue?vue&type=script&setup=true&lang.ts
var S = {
	key: 0,
	class: "th-menu__shortcut"
}, C = /*@__PURE__*/ o({
	__name: "ThDropdownMenu",
	props: /*@__PURE__*/ s({
		items: {},
		side: { default: "bottom" },
		align: { default: "start" }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ s(["select"], ["update:open"]),
	setup(o, { emit: s }) {
		let C = p(o, "open"), w = s;
		return (s, p) => (c(), t(f(y), {
			open: C.value,
			"onUpdate:open": p[0] ||= (e) => C.value = e
		}, {
			default: m(() => [a(f(x), { "as-child": "" }, {
				default: m(() => [u(s.$slots, "default")]),
				_: 3
			}), a(f(v), null, {
				default: m(() => [a(f(h), {
					class: "th-menu",
					side: o.side,
					align: o.align,
					"side-offset": 4,
					"collision-padding": 8
				}, {
					default: m(() => [(c(!0), r(e, null, l(o.items, (a, o) => (c(), r(e, { key: o }, [a.type === "separator" ? (c(), t(f(b), {
						key: 0,
						class: "th-menu__separator"
					})) : a.type === "label" ? (c(), t(f(_), {
						key: 1,
						class: "th-menu__label"
					}, {
						default: m(() => [i(d(a.label), 1)]),
						_: 2
					}, 1024)) : (c(), t(f(g), {
						key: 2,
						class: "th-menu__item",
						"data-variant": a.variant,
						disabled: a.disabled,
						onSelect: (e) => w("select", a.value)
					}, {
						default: m(() => [i(d(a.label) + " ", 1), a.shortcut ? (c(), r("span", S, d(a.shortcut), 1)) : n("", !0)]),
						_: 2
					}, 1032, [
						"data-variant",
						"disabled",
						"onSelect"
					]))], 64))), 128))]),
					_: 1
				}, 8, ["side", "align"])]),
				_: 1
			})]),
			_: 3
		}, 8, ["open"]));
	}
});
export { C as default };

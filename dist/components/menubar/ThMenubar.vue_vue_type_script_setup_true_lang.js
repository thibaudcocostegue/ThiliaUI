/* empty css                */
import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createTextVNode as i, createVNode as a, defineComponent as o, mergeModels as s, openBlock as c, renderList as l, toDisplayString as u, unref as d, useModel as f, withCtx as p } from "vue";
import { MenubarContent as m, MenubarItem as h, MenubarLabel as g, MenubarMenu as _, MenubarPortal as v, MenubarRoot as y, MenubarSeparator as b, MenubarTrigger as x } from "reka-ui";
// src/components/menubar/ThMenubar.vue?vue&type=script&setup=true&lang.ts
var S = {
	key: 0,
	class: "th-menu__shortcut"
}, C = /*@__PURE__*/ o({
	__name: "ThMenubar",
	props: /*@__PURE__*/ s({
		menus: {},
		label: {}
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ s(["select"], ["update:modelValue"]),
	setup(o, { emit: s }) {
		let C = f(o, "modelValue"), w = s;
		return (s, f) => (c(), t(d(y), {
			modelValue: C.value,
			"onUpdate:modelValue": f[0] ||= (e) => C.value = e,
			class: "th-menubar",
			"aria-label": o.label
		}, {
			default: p(() => [(c(!0), r(e, null, l(o.menus, (o) => (c(), t(d(_), {
				key: o.value,
				value: o.value
			}, {
				default: p(() => [a(d(x), { class: "th-menubar__trigger" }, {
					default: p(() => [i(u(o.label), 1)]),
					_: 2
				}, 1024), a(d(v), null, {
					default: p(() => [a(d(m), {
						class: "th-menu",
						"side-offset": 4,
						align: "start",
						"collision-padding": 8
					}, {
						default: p(() => [(c(!0), r(e, null, l(o.items, (a, s) => (c(), r(e, { key: s }, [a.type === "separator" ? (c(), t(d(b), {
							key: 0,
							class: "th-menu__separator"
						})) : a.type === "label" ? (c(), t(d(g), {
							key: 1,
							class: "th-menu__label"
						}, {
							default: p(() => [i(u(a.label), 1)]),
							_: 2
						}, 1024)) : (c(), t(d(h), {
							key: 2,
							class: "th-menu__item",
							"data-variant": a.variant,
							disabled: a.disabled,
							onSelect: (e) => w("select", o.value, a.value)
						}, {
							default: p(() => [i(u(a.label) + " ", 1), a.shortcut ? (c(), r("span", S, u(a.shortcut), 1)) : n("", !0)]),
							_: 2
						}, 1032, [
							"data-variant",
							"disabled",
							"onSelect"
						]))], 64))), 128))]),
						_: 2
					}, 1024)]),
					_: 2
				}, 1024)]),
				_: 2
			}, 1032, ["value"]))), 128))]),
			_: 1
		}, 8, ["modelValue", "aria-label"]));
	}
});
export { C as default };

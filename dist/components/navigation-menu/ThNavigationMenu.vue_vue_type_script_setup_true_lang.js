import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createTextVNode as a, createVNode as o, defineComponent as s, mergeModels as c, openBlock as l, renderList as u, toDisplayString as d, unref as f, useModel as p, withCtx as m } from "vue";
import { NavigationMenuContent as h, NavigationMenuItem as g, NavigationMenuLink as _, NavigationMenuList as v, NavigationMenuRoot as y, NavigationMenuTrigger as b, NavigationMenuViewport as x } from "reka-ui";
// src/components/navigation-menu/ThNavigationMenu.vue?vue&type=script&setup=true&lang.ts
var S = {
	key: 0,
	class: "th-navigation-menu__description"
}, C = { class: "th-navigation-menu__viewport-anchor" }, w = /*@__PURE__*/ s({
	__name: "ThNavigationMenu",
	props: /*@__PURE__*/ c({
		items: {},
		label: {}
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(s) {
		let c = p(s, "modelValue");
		return (p, w) => (l(), t(f(y), {
			modelValue: c.value,
			"onUpdate:modelValue": w[0] ||= (e) => c.value = e,
			class: "th-navigation-menu",
			"aria-label": s.label
		}, {
			default: m(() => [o(f(v), { class: "th-navigation-menu__list" }, {
				default: m(() => [(l(!0), r(e, null, u(s.items, (s) => (l(), t(f(g), {
					key: s.value,
					value: s.value
				}, {
					default: m(() => [s.href ? (l(), t(f(_), {
						key: 0,
						href: s.href,
						active: s.active,
						class: "th-navigation-menu__link"
					}, {
						default: m(() => [a(d(s.label), 1)]),
						_: 2
					}, 1032, ["href", "active"])) : (l(), r(e, { key: 1 }, [o(f(b), { class: "th-navigation-menu__link" }, {
						default: m(() => [a(d(s.label) + " ", 1), w[1] ||= i("svg", {
							class: "th-navigation-menu__chevron",
							viewBox: "0 0 16 16",
							width: "12",
							height: "12",
							"aria-hidden": "true"
						}, [i("path", {
							d: "M4 6l4 4 4-4",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.5"
						})], -1)]),
						_: 2
					}, 1024), o(f(h), { class: "th-navigation-menu__panel" }, {
						default: m(() => [(l(!0), r(e, null, u(s.links, (e) => (l(), t(f(_), {
							key: e.href,
							href: e.href,
							class: "th-navigation-menu__card"
						}, {
							default: m(() => [a(d(e.label) + " ", 1), e.description ? (l(), r("span", S, d(e.description), 1)) : n("", !0)]),
							_: 2
						}, 1032, ["href"]))), 128))]),
						_: 2
					}, 1024)], 64))]),
					_: 2
				}, 1032, ["value"]))), 128))]),
				_: 1
			}), i("div", C, [o(f(x), { class: "th-navigation-menu__viewport" })])]),
			_: 1
		}, 8, ["modelValue", "aria-label"]));
	}
});
export { w as default };

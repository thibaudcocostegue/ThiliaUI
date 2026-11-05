import { createBlock as e, createCommentVNode as t, createElementBlock as n, createElementVNode as r, createTextVNode as i, createVNode as a, defineComponent as o, mergeModels as s, openBlock as c, renderSlot as l, toDisplayString as u, unref as d, useModel as f, withCtx as p } from "vue";
import { DialogClose as m, DialogContent as h, DialogDescription as g, DialogOverlay as _, DialogPortal as v, DialogRoot as y, DialogTitle as b, DialogTrigger as x } from "reka-ui";
// src/components/drawer/ThDrawer.vue?vue&type=script&setup=true&lang.ts
var S = { class: "th-drawer__header" }, C = {
	key: 1,
	class: "th-drawer__body"
}, w = {
	key: 2,
	class: "th-drawer__footer"
}, T = /*@__PURE__*/ o({
	__name: "ThDrawer",
	props: /*@__PURE__*/ s({
		title: {},
		description: {},
		side: { default: "right" },
		closeLabel: { default: "Fermer" }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: ["update:open"],
	setup(o) {
		let s = f(o, "open"), T = () => {
			s.value = !1;
		};
		return (f, E) => (c(), e(d(y), {
			open: s.value,
			"onUpdate:open": E[0] ||= (e) => s.value = e
		}, {
			default: p(() => [f.$slots.trigger ? (c(), e(d(x), {
				key: 0,
				"as-child": ""
			}, {
				default: p(() => [l(f.$slots, "trigger")]),
				_: 3
			})) : t("", !0), a(d(v), null, {
				default: p(() => [a(d(_), { class: "th-drawer__overlay" }), a(d(h), {
					class: "th-drawer",
					"data-side": o.side
				}, {
					default: p(() => [
						r("header", S, [a(d(b), { class: "th-drawer__title" }, {
							default: p(() => [i(u(o.title), 1)]),
							_: 1
						}), a(d(m), {
							class: "th-drawer__close",
							"aria-label": o.closeLabel
						}, {
							default: p(() => [...E[1] ||= [r("svg", {
								viewBox: "0 0 16 16",
								width: "16",
								height: "16",
								"aria-hidden": "true"
							}, [r("path", {
								d: "M4 4l8 8M12 4l-8 8",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "1.5"
							})], -1)]]),
							_: 1
						}, 8, ["aria-label"])]),
						o.description ? (c(), e(d(g), {
							key: 0,
							class: "th-drawer__description"
						}, {
							default: p(() => [i(u(o.description), 1)]),
							_: 1
						})) : t("", !0),
						f.$slots.default ? (c(), n("div", C, [l(f.$slots, "default", { close: T })])) : t("", !0),
						f.$slots.footer ? (c(), n("div", w, [l(f.$slots, "footer", { close: T })])) : t("", !0)
					]),
					_: 3
				}, 8, ["data-side"])]),
				_: 3
			})]),
			_: 3
		}, 8, ["open"]));
	}
});
export { T as default };

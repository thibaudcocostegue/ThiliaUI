import { createBlock as e, createCommentVNode as t, createElementBlock as n, createElementVNode as r, createTextVNode as i, createVNode as a, defineComponent as o, mergeModels as s, openBlock as c, renderSlot as l, toDisplayString as u, unref as d, useModel as f, withCtx as p } from "vue";
import { AlertDialogAction as m, AlertDialogCancel as h, AlertDialogContent as g, AlertDialogDescription as _, AlertDialogOverlay as v, AlertDialogPortal as y, AlertDialogRoot as b, AlertDialogTitle as x, AlertDialogTrigger as S } from "reka-ui";
// src/components/alert-dialog/ThAlertDialog.vue?vue&type=script&setup=true&lang.ts
var C = ["data-variant"], w = { class: "th-alert-dialog__footer" }, T = /*@__PURE__*/ o({
	__name: "ThAlertDialog",
	props: /*@__PURE__*/ s({
		title: {},
		description: {},
		actionLabel: {},
		cancelLabel: { default: "Annuler" },
		kind: {},
		variant: { default: "danger" }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ s(["action", "cancel"], ["update:open"]),
	setup(o, { emit: s }) {
		let T = f(o, "open"), E = s;
		return (s, f) => (c(), e(d(b), {
			open: T.value,
			"onUpdate:open": f[2] ||= (e) => T.value = e
		}, {
			default: p(() => [s.$slots.trigger ? (c(), e(d(S), {
				key: 0,
				"as-child": ""
			}, {
				default: p(() => [l(s.$slots, "trigger")]),
				_: 3
			})) : t("", !0), a(d(y), null, {
				default: p(() => [a(d(v), { class: "th-alert-dialog__overlay" }), a(d(g), { class: "th-alert-dialog" }, {
					default: p(() => [
						o.kind ? (c(), n("span", {
							key: 0,
							class: "th-alert-dialog__kind",
							"data-variant": o.variant
						}, u(o.kind), 9, C)) : t("", !0),
						a(d(x), { class: "th-alert-dialog__title" }, {
							default: p(() => [i(u(o.title), 1)]),
							_: 1
						}),
						a(d(_), { class: "th-alert-dialog__description" }, {
							default: p(() => [i(u(o.description), 1)]),
							_: 1
						}),
						r("div", w, [a(d(h), {
							class: "th-alert-dialog__button",
							"data-variant": "secondary",
							onClick: f[0] ||= (e) => E("cancel")
						}, {
							default: p(() => [i(u(o.cancelLabel), 1)]),
							_: 1
						}), a(d(m), {
							class: "th-alert-dialog__button",
							"data-variant": o.variant,
							onClick: f[1] ||= (e) => E("action")
						}, {
							default: p(() => [i(u(o.actionLabel), 1)]),
							_: 1
						}, 8, ["data-variant"])])
					]),
					_: 1
				})]),
				_: 1
			})]),
			_: 3
		}, 8, ["open"]));
	}
});
export { T as default };

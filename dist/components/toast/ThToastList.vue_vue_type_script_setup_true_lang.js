import { Fragment as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createVNode as a, defineComponent as o, openBlock as s, renderList as c, toDisplayString as l, unref as u, withCtx as d } from "vue";
import { ToastClose as f, ToastDescription as p, ToastRoot as m, ToastTitle as h, useToastManager as g } from "reka-ui";
// src/components/toast/ThToastList.vue?vue&type=script&setup=true&lang.ts
var _ = { class: "th-toast__label" }, v = /*@__PURE__*/ o({
	__name: "ThToastList",
	props: {
		labels: {},
		closeLabel: {}
	},
	setup(o) {
		let { toasts: v } = g();
		return (g, y) => (s(!0), r(e, null, c(u(v), (e) => (s(), t(u(m), {
			key: e.id,
			toast: e,
			class: "th-toast"
		}, {
			default: d(() => [
				i("p", _, l(o.labels[e.status]), 1),
				a(u(h), { class: "th-toast__title" }),
				e.description ? (s(), t(u(p), {
					key: 0,
					class: "th-toast__description"
				})) : n("", !0),
				a(u(f), {
					class: "th-toast__close",
					"aria-label": o.closeLabel
				}, {
					default: d(() => [...y[0] ||= [i("svg", {
						viewBox: "0 0 16 16",
						width: "16",
						height: "16",
						"aria-hidden": "true"
					}, [i("path", {
						d: "M4 4l8 8M12 4l-8 8",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "1.5"
					})], -1)]]),
					_: 1
				}, 8, ["aria-label"])
			]),
			_: 2
		}, 1032, ["toast"]))), 128));
	}
});
export { v as default };

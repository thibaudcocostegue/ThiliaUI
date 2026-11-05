import e from "./ThToastList.js";
import { toastManager as t } from "./toast.js";
import { computed as n, createBlock as r, createVNode as i, defineComponent as a, openBlock as o, unref as s, withCtx as c } from "vue";
import { ToastProvider as l, ToastViewport as u } from "reka-ui";
// src/components/toast/ThToaster.vue?vue&type=script&setup=true&lang.ts
var d = /*@__PURE__*/ a({
	__name: "ThToaster",
	props: {
		labels: {},
		closeLabel: { default: "Fermer" },
		duration: { default: 5e3 }
	},
	setup(a) {
		let d = n(() => ({
			success: "Succès",
			warning: "Alerte",
			danger: "Erreur",
			...a.labels
		}));
		return (n, f) => (o(), r(s(l), {
			"toast-manager": s(t),
			duration: a.duration,
			label: "Notification"
		}, {
			default: c(() => [i(e, {
				labels: d.value,
				"close-label": a.closeLabel
			}, null, 8, ["labels", "close-label"]), i(s(u), {
				class: "th-toaster",
				label: "Notifications ({hotkey})"
			})]),
			_: 1
		}, 8, ["toast-manager", "duration"]));
	}
});
export { d as default };

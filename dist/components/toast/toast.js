import { createToastManager as e } from "reka-ui";
// src/components/toast/toast.ts
var t = e();
function n(e, n, r = {}) {
	return t.add({
		...r,
		title: n,
		status: e,
		type: e === "success" ? "background" : "foreground"
	});
}
var r = {
	success: (e, t) => n("success", e, t),
	warning: (e, t) => n("warning", e, t),
	danger: (e, t) => n("danger", e, t),
	close: (e) => t.close(e)
};
export { r as toast, t as toastManager };

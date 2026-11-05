import e from "../label/ThLabel.js";
/* empty css                 */
import { computed as t, createCommentVNode as n, createElementBlock as r, createTextVNode as i, createVNode as a, defineComponent as o, openBlock as s, renderSlot as c, toDisplayString as l, unref as u, useId as d, withCtx as f } from "vue";
// src/components/field/ThField.vue?vue&type=script&setup=true&lang.ts
var p = ["data-invalid"], m = ["id", "role"], h = /*@__PURE__*/ o({
	__name: "ThField",
	props: {
		label: {},
		help: {},
		error: {},
		required: {
			type: Boolean,
			default: !1
		},
		id: {}
	},
	setup(o) {
		let h = d(), g = t(() => o.id ?? h), _ = t(() => `${g.value}-message`), v = t(() => o.error || o.help);
		return (t, d) => (s(), r("div", {
			class: "th-field",
			"data-invalid": o.error ? "" : void 0
		}, [
			a(u(e), {
				for: g.value,
				required: o.required
			}, {
				default: f(() => [i(l(o.label), 1)]),
				_: 1
			}, 8, ["for", "required"]),
			c(t.$slots, "default", {
				id: g.value,
				describedby: v.value ? _.value : void 0,
				invalid: !!o.error
			}),
			v.value ? (s(), r("p", {
				key: 0,
				id: _.value,
				class: "th-field__help",
				role: o.error ? "alert" : void 0
			}, l(v.value), 9, m)) : n("", !0)
		], 8, p));
	}
});
export { h as default };

import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as ChevronLeft, b as Download, d as Presentation, s as Smartphone, x as ChevronRight, y as Film } from "../_libs/lucide-react.mjs";
import { h as cn, l as Button, p as CapsuleMark } from "./router-Db4lE2eo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaign-CKRAJVmi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLIDES = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9
];
var SOCIAL = [
	1,
	2,
	3,
	4,
	5,
	6
];
var CAPTIONS = [
	"The black box for your real life.",
	"The moments nobody knows will matter until they do.",
	"Not a tracker. Not a panic app. A black box.",
	"Prevent · Detect · Preserve · Escalate · Reconstruct.",
	"Authorize a session. Guardian records facts — not danger.",
	"Original evidence. Observed events. Never a verdict.",
	"Your circle. Your protocol. Including dead-man escrow.",
	"PIN, phrase, gesture. Decoy calculator. Covert by design.",
	"Start a Guardian Session. Keep the record original."
];
var SOCIAL_CAPTIONS = [
	"Hook. Stay protected. Preserve the truth.",
	"Late meeting. First date. Rideshare. They want the record.",
	"Prevent, detect, preserve, escalate, reconstruct.",
	"If I don’t check in, start my protocol.",
	"Your people. Your rules. Dead-man escrow.",
	"Start a session. Keep the record original."
];
function Campaign() {
	const [mode, setMode] = (0, import_react.useState)("social");
	const [i, setI] = (0, import_react.useState)(0);
	const count = mode === "social" ? SOCIAL.length : SLIDES.length;
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (mode === "reel") return;
			if (e.key === "ArrowRight" || e.key === " ") {
				e.preventDefault();
				setI((n) => Math.min(count - 1, n + 1));
			}
			if (e.key === "ArrowLeft") setI((n) => Math.max(0, n - 1));
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [mode, count]);
	const pptx = mode === "deck" ? "/campaign/GuardianOS-campaign.pptx" : "/campaign/DigitalGuardian-social.pptx";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex h-11 items-center gap-2 text-sm text-muted hover:text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapsuleMark, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "GuardianOS"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-full bg-elevated p-1 shadow-[var(--shadow-border)]",
					children: [
						[
							"social",
							"Social",
							Smartphone
						],
						[
							"deck",
							"Deck",
							Presentation
						],
						[
							"reel",
							"Reel",
							Film
						]
					].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("flex h-11 items-center gap-1.5 rounded-full px-3 text-xs md:px-4", mode === id ? "bg-surface text-fg" : "text-muted"),
						onClick: () => {
							setMode(id);
							setI(0);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: pptx,
						download: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "PPTX"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex flex-1 flex-col items-center justify-center px-3 pb-6",
			children: mode === "reel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-black shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						className: "aspect-[9/16] w-full",
						src: "/campaign/DigitalGuardian-social-reel.mp4",
						controls: true,
						playsInline: true,
						poster: "/campaign/social/c1.png"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/campaign/DigitalGuardian-social-reel.mp4",
						download: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Download reel"]
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("relative overflow-hidden rounded-lg bg-black shadow-[var(--shadow-border)]", mode === "social" ? "w-full max-w-sm" : "w-full max-w-6xl"),
					onClick: () => setI((n) => Math.min(count - 1, n + 1)),
					"aria-label": "Next slide",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mode === "social" ? `/campaign/social/c${SOCIAL[i]}.png` : `/campaign/s${SLIDES[i]}.png`,
						alt: mode === "social" ? `GuardianOS social card ${i + 1} of ${count}` : `GuardianOS briefing slide ${i + 1} of ${count}`,
						className: cn("w-full object-contain", mode === "social" ? "aspect-[9/16]" : "aspect-video")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-center text-sm text-muted",
					children: mode === "social" ? SOCIAL_CAPTIONS[i] : CAPTIONS[i]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "secondary",
							"aria-label": "Previous slide",
							disabled: i === 0,
							onClick: () => setI((n) => n - 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: Array.from({ length: count }, (_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Slide ${idx + 1}`,
									className: cn("h-11 min-w-3 px-0.5", idx === i ? "w-8" : "w-3"),
									onClick: () => setI(idx),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-1.5 rounded-full transition-[width,background-color] duration-150", idx === i ? "w-6 bg-accent" : "w-2 bg-border") })
								}, idx))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-xs text-subtle",
								children: [
									String(i + 1).padStart(2, "0"),
									" / ",
									String(count).padStart(2, "0")
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "secondary",
							"aria-label": "Next slide",
							disabled: i === count - 1,
							onClick: () => setI((n) => n + 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[11px] tracking-[0.16em] text-subtle uppercase",
					children: mode === "social" ? "Stories · Reels · X" : "Arrow keys or tap the frame"
				})
			] })
		})]
	});
}
//#endregion
export { Campaign as component };

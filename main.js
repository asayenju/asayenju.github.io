import { animate, scroll, inView, stagger, hover } from "https://cdn.jsdelivr.net/npm/motion@12.23.0/+esm";
import { featured, more, forks, G } from "./projects.js";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Render
const fg = document.getElementById("featured-grid");
for (const p of featured) {
  const links = [`<a href="${G + p.repo}">Code</a>`];
  for (const [l, r] of p.extra || []) links.push(`<a href="${G + r}">${esc(l)}</a>`);
  if (p.live) links.push(`<a href="${p.live}">Live demo ↗</a>`);
  fg.append(el(`<article class="card">
    <div class="media">${p.video ? `<video src="${p.video}" muted loop playsinline preload="metadata"></video>` : `<span class="ph">${esc(p.name.split(/\s+/).map(w => w[0]).join("").slice(0, 3))}</span>`}</div>
    <div class="body"><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>
    <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
    <div class="links">${links.join("")}</div></div></article>`));
}
const mg = document.getElementById("more-grid");
for (const [n, r, d, t] of more)
  mg.append(el(`<a class="mini" href="${G + r}"><small>${esc(t)}</small><h3>${esc(n)}</h3><p>${esc(d)}</p></a>`));
const fl = document.getElementById("forks");
for (const [r, d] of forks) fl.append(el(`<li><a href="${G + r}">${esc(r)}</a>: ${esc(d)}</li>`));
const cs=document.querySelectorAll("[data-count]");cs[0].dataset.count=featured.length;cs[1].dataset.count=more.length;
document.getElementById("y").textContent = new Date().getFullYear();

// Play card videos on hover
document.querySelectorAll(".card video").forEach((v) => {
  v.closest(".card").addEventListener("pointerenter", () => v.play().catch(() => {}));
  v.closest(".card").addEventListener("pointerleave", () => v.pause());
});

if (!reduce) {
  // Scroll progress bar
  scroll(animate("#progress", { scaleX: [0, 1] }, { ease: "linear" }));

  // Hero name: words slide up
  animate("#name .w span", { y: ["110%", "0%"] }, { duration: 0.8, delay: stagger(0.12), ease: [0.16, 1, 0.3, 1] });
  animate("#avatar", { opacity: [0, 1], scale: [0.8, 1] }, { type: "spring", bounce: 0.35, duration: 1 });

  // Hero reveals
  animate("[data-reveal]", { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.08, { startDelay: 0.3 }), duration: 0.6 })
    .finished.then(() => {});

  // Avatar drifts as you scroll
  scroll(animate("#avatar", { y: [0, 80], rotate: [0, 6] }, { ease: "linear" }), { target: document.querySelector(".hero"), offset: ["start start", "end start"] });

  // Cards and minis reveal as they enter
  for (const sel of [".card", ".mini", "section h2, section .sub, .forks li"]) {
    document.querySelectorAll(sel).forEach((n) => { if (!n.closest(".hero")) n.style.opacity = 0; });
  }
  inView(".card", (n) => { animate(n, { opacity: [0, 1], y: [40, 0] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] }); });
  inView(".mini", (n) => { animate(n, { opacity: [0, 1], y: [20, 0] }, { duration: 0.4 }); });
  inView("section h2, section .sub, .forks li", (n) => { animate(n, { opacity: [0, 1], y: [16, 0] }, { duration: 0.5 }); });

  // Hover springs
  hover(".card", (n) => { animate(n, { y: -6, scale: 1.015 }, { type: "spring", stiffness: 300, damping: 20 }); return () => animate(n, { y: 0, scale: 1 }, { type: "spring", stiffness: 300, damping: 20 }); });
  hover(".mini", (n) => { animate(n, { x: 4 }, { duration: 0.15 }); return () => animate(n, { x: 0 }, { duration: 0.2 }); });

  // Count-up stats
  inView(".stats", () => {
    document.querySelectorAll("[data-count]").forEach((n) => {
      const to = +n.dataset.count;
      animate(0, to, { duration: 1.2, ease: "easeOut", onUpdate: (v) => (n.textContent = Math.round(v)) });
    });
  });
} else {
  document.querySelectorAll("[data-count]").forEach((n) => (n.textContent = n.dataset.count));
}

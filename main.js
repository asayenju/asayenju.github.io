window.__ok = true;
import { animate, scroll, inView, stagger, hover } from "https://cdn.jsdelivr.net/npm/motion@12.23.0/+esm";
import { animate as anime, stagger as animeStagger, utils as animeUtils } from "https://cdn.jsdelivr.net/npm/animejs@4.0.2/+esm";
import { featured, G } from "./projects.js?v=6";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const spring = { type: "spring", stiffness: 300, damping: 20 };

// ---------- Render content ----------
const fg = $("#featured-grid");
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
$("#y").textContent = new Date().getFullYear();
const counts = $$("[data-count]"); counts[0].dataset.count = featured.length;

// Skills: grouped cards you page through with arrows
const skillGroups = [
  ["Languages", ["Python", "TypeScript", "Go", "JavaScript", "SQL", "Java", "Kotlin", "C/C++", "HTML/CSS"]],
  ["Frontend", ["React", "React Native"]],
  ["Backend & Testing", ["Node.js", "Stripe", "FastAPI", "REST APIs", "GraphQL", "gRPC", "JUnit", "pytest", "Playwright"]],
  ["Data & Cloud", ["PostgreSQL", "pgvector", "AWS", "ECS", "Kafka", "Redis", "Kubernetes", "Docker", "MySQL", "GCP", "Prometheus", "GitLab CI/CD"]],
  ["AI & Agentic Tools", ["LLM evaluations", "RAG", "Agentic systems", "MCP", "Claude API", "Claude Code", "Copilot"]],
];
const skTrack = $("#sk-track");
for (const [t, items] of skillGroups)
  skTrack.append(el(`<div class="sk-card"><h3>${esc(t.toUpperCase())}</h3><div class="sk-chips">${items.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>`));
const skPrev = $("#sk-prev"), skNext = $("#sk-next");
const skStep = () => skTrack.firstElementChild.getBoundingClientRect().width + 16;
const skUpdate = () => {
  skPrev.disabled = skTrack.scrollLeft < 4;
  skNext.disabled = skTrack.scrollLeft + skTrack.clientWidth >= skTrack.scrollWidth - 4;
};
skPrev.addEventListener("click", () => skTrack.scrollBy({ left: -skStep(), behavior: reduce ? "auto" : "smooth" }));
skNext.addEventListener("click", () => skTrack.scrollBy({ left: skStep(), behavior: reduce ? "auto" : "smooth" }));
skTrack.addEventListener("scroll", skUpdate, { passive: true });
addEventListener("resize", skUpdate);
skUpdate();

// Split the name into letters
$$("#name .w").forEach((w) => {
  const word = w.textContent; w.textContent = "";
  for (const ch of word) { const s = document.createElement("span"); s.className = "ch"; s.textContent = ch; w.append(s); }
});

// Card videos play on hover
$$(".card video").forEach((v) => {
  const c = v.closest(".card");
  c.addEventListener("pointerenter", () => v.play().catch(() => {}));
  c.addEventListener("pointerleave", () => v.pause());
});

// Spotlight position for cards / minis (CSS vars; works even with reduced motion)
for (const n of $$(".card, .mini")) n.addEventListener("pointermove", (e) => {
  const r = n.getBoundingClientRect();
  n.style.setProperty("--mx", e.clientX - r.left + "px"); n.style.setProperty("--my", e.clientY - r.top + "px");
});

if (reduce) {
  counts.forEach((n) => (n.textContent = n.dataset.count));
  $$("#metrics b").forEach((b) => (b.textContent = (b.dataset.pre || "") + (+b.dataset.to).toFixed(+(b.dataset.dec || 0)) + b.dataset.suf));
  $("#type").textContent = "reliable agents,";
  $(".caret").remove();
} else start();

async function start() {
  // ---- Hero entrance ----
  animate("#name .ch", { y: ["115%", "0%"], rotate: [12, 0] }, { duration: 0.7, delay: stagger(0.035), ease: [0.16, 1, 0.3, 1] }).then(() => $$("#name .w").forEach((w) => (w.style.overflow = "visible")));
  animate("#avatar", { opacity: [0, 1], scale: [0.4, 1], rotate: [-25, 0] }, { type: "spring", bounce: 0.4, duration: 1.2, delay: 0.2 });
  animate(".rays", { opacity: [0, 1], scale: [0.5, 1] }, { duration: 1.2, delay: 0.3 });
  animate("[data-reveal]", { opacity: [0, 1], y: [24, 0] }, { delay: stagger(0.09, { startDelay: 0.4 }), duration: 0.7, ease: [0.16, 1, 0.3, 1] });
  animate("#hint", { opacity: [0, 1] }, { delay: 2 });

  // ---- Ambient loops ----
  animate(".rays", { rotate: 360 }, { duration: 80, ease: "linear", repeat: Infinity });
  animate("#avatar", { y: [0, -10, 0] }, { duration: 4, ease: "easeInOut", repeat: Infinity });
  animate(".b1", { x: [0, 120, -40, 0], y: [0, 80, 160, 0], scale: [1, 1.2, 0.9, 1] }, { duration: 22, ease: "easeInOut", repeat: Infinity });
  animate(".b2", { x: [0, -140, 30, 0], y: [0, -100, 60, 0] }, { duration: 26, ease: "easeInOut", repeat: Infinity });
  animate(".b3", { x: [0, 90, -90, 0], scale: [1, 0.8, 1.15, 1] }, { duration: 30, ease: "easeInOut", repeat: Infinity });
  animate(".caret", { opacity: [1, 0] }, { duration: 0.5, repeat: Infinity, repeatType: "reverse" });
  $$(".ph").forEach((n, i) => animate(n, { y: [0, -8, 0], rotate: [-3, 3, -3] }, { duration: 3 + (i % 4), ease: "easeInOut", repeat: Infinity }));
  typewriter();

  // ---- Scroll-linked ----
  scroll(animate("#progress", { scaleX: [0, 1] }, { ease: "linear" }));
  const hero = $(".hero");
  scroll(animate(".avatar-wrap", { y: [0, 90], scale: [1, 0.85] }, { ease: "linear" }), { target: hero, offset: ["start start", "end start"] });
  scroll(animate(".hero>div:first-child", { y: [0, -70], opacity: [1, 0.15] }, { ease: "linear" }), { target: hero, offset: ["start start", "end start"] });
  for (const [i, b] of $$(".bw").entries()) scroll(animate(b, { y: [0, (i + 1) * -160] }, { ease: "linear" }));

  // ---- Reveals ----
  inView(".sk-card", (n) => { animate(n, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] }); animate($$("span", n), { opacity: [0, 1], scale: [0.8, 1] }, { delay: stagger(0.03, { startDelay: 0.2 }), duration: 0.35 }); }, { amount: 0.2 });
  inView(".card", (n) => { animate(n, { opacity: [0, 1], y: [60, 0], rotate: [3, 0] }, { duration: 0.8, ease: [0.16, 1, 0.3, 1] }); }, { amount: 0.15 });
  inView("section h2", (n) => { animate(n, { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], x: [-30, 0] }, { duration: 0.8, ease: [0.16, 1, 0.3, 1] }); });
  inView("section .sub", (n) => { animate(n, { opacity: [0, 1], y: [16, 0] }, { duration: 0.5 }); });
  inView(".stats", () => {
    counts.forEach((n) => { const to = +n.dataset.count; animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => (n.textContent = Math.round(v)) }); });
  });

  journey();

  // ---- Nav underline follows the section ----
  const pill = $(".pill"), navWrap = $("nav .wrap");
  inView(".hero", () => { animate(pill, { opacity: 0 }, { duration: 0.2 }); return () => animate(pill, { opacity: 1 }, { duration: 0.2 }); }, { amount: 0.6 });
  inView("#journey, #featured, #contact", (sec) => {
    const a = $(`nav a[href="#${sec.id}"]`), r = a.getBoundingClientRect(), p = navWrap.getBoundingClientRect();
    animate(pill, { x: r.left - p.left, width: r.width, opacity: 1 }, { type: "spring", stiffness: 260, damping: 26 });
  }, { amount: 0.35 });

  // ---- Letter wave on the name ----
  hover("#name .ch", (n) => {
    animate(n, { y: -14, color: "#e8a4c8", scale: 1.15 }, spring);
    return () => animate(n, { y: 0, color: "#f3effa", scale: 1 }, spring);
  });

  // ---- Magnetic buttons & nav links ----
  for (const n of $$(".btn, nav a")) {
    n.addEventListener("pointermove", (e) => {
      const r = n.getBoundingClientRect();
      animate(n, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.5 }, { duration: 0.2 });
    });
    n.addEventListener("pointerleave", () => animate(n, { x: 0, y: 0 }, { type: "spring", stiffness: 400, damping: 12 }));
  }

  // ---- 3D tilt cards ----
  for (const n of $$(".card")) {
    n.addEventListener("pointermove", (e) => {
      const r = n.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      animate(n, { rotateY: px * 14, rotateX: -py * 14, y: -6, scale: 1.02 }, { duration: 0.25, ease: "easeOut" });
    });
    n.addEventListener("pointerleave", () => animate(n, { rotateX: 0, rotateY: 0, y: 0, scale: 1 }, spring));
  }

  // ---- Custom cursor ring ----
  if (fine) {
    const c = $("#cursor");
    addEventListener("pointermove", (e) => {
      animate(c, { x: e.clientX, y: e.clientY, opacity: 1 }, { type: "spring", stiffness: 500, damping: 40, mass: 0.4 });
    });
    document.addEventListener("pointerover", (e) => {
      const hot = e.target.closest("a, .card, .avatar, .btn");
      animate(c, { scale: hot ? 1.9 : 1, backgroundColor: hot ? "rgba(232,164,200,0.18)" : "rgba(232,164,200,0)" }, { duration: 0.2 });
    });
  }

  eyes();
}

// ---------- Typewriter ----------
async function typewriter() {
  const t = $("#type"), words = ["reliable agents", "ML systems", "backends that don't break", "tools people use"];
  let i = 0;
  while (true) {
    const w = words[i++ % words.length];
    for (let k = 1; k <= w.length; k++) { t.textContent = w.slice(0, k); await sleep(55); }
    await sleep(1600);
    for (let k = w.length; k >= 0; k--) { t.textContent = w.slice(0, k); await sleep(28); }
    await sleep(250);
  }
}

// ---------- Journey (anime.js) ----------
function journey() {
  // The line fills as you read down the timeline (Motion, scroll-linked)
  scroll(animate(".tl-line i", { scaleY: [0, 1] }, { ease: "linear" }), { target: $(".tl"), offset: ["start 75%", "end 60%"] });

  // Split each card title into letters for the stagger
  $$(".tl-card h3").forEach((h) => {
    const t = h.textContent; h.textContent = "";
    for (const ch of t) { const s = document.createElement("span"); s.className = "c"; s.textContent = ch; h.append(s); }
  });

  // Pulsing rings on the nodes, looping forever
  anime(".tl-node i", { scale: [1, 2.8], opacity: [0.7, 0], duration: 1800, ease: "outQuad", loop: true, delay: animeStagger(400) });

  const seen = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting || seen.has(e.target)) continue;
      seen.add(e.target);
      const item = e.target, card = $(".tl-card", item);
      anime($(".tl-node b", item), { scale: [0, 1], opacity: [0, 1], duration: 900, ease: "outElastic(1, .6)" });
      anime(card, { opacity: [0, 1], translateX: [-50, 0], rotate: [-2, 0], duration: 900, ease: "outExpo" });
      anime($$("h3 .c", card), { translateY: [40, 0], opacity: [0, 1], rotateX: [-90, 0], delay: animeStagger(28, { start: 250 }), duration: 700, ease: "outBack" });
      anime($$(".kind, .role, .meta, .pts li, .date", card), { opacity: [0, 1], translateY: [14, 0], delay: animeStagger(110, { start: 500 }), duration: 600, ease: "outQuad" });
      const yr = $("#year", card);
      if (yr) { const o = { n: 1990 }; anime(o, { n: 2027, duration: 1800, delay: 600, ease: "outExpo", onUpdate: () => (yr.textContent = Math.round(o.n)) }); }
    }
  }, { threshold: 0.35 });
  $$(".tl-item").forEach((n) => io.observe(n));

  // Metrics strip: tiles rise, numbers count up
  const mio = new IntersectionObserver((es) => {
    if (!es[0].isIntersecting) return; mio.disconnect();
    anime("#metrics>div", { opacity: [0, 1], translateY: [40, 0], scale: [0.9, 1], delay: animeStagger(120), duration: 800, ease: "outExpo" });
    $$("#metrics b").forEach((b, i) => {
      const o = { n: 0 }, to = +b.dataset.to, dec = +(b.dataset.dec || 0);
      anime(o, { n: to, duration: 1800, delay: 150 * i, ease: "outExpo", onUpdate: () => (b.textContent = (b.dataset.pre || "") + o.n.toFixed(dec) + b.dataset.suf) });
    });
  }, { threshold: 0.4 });
  mio.observe($("#metrics"));
}

// ---------- Saitama's eyes follow the cursor ----------
function eyes() {
  const av = $("#avatar"), img = $("img", av), NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "eyes"); svg.setAttribute("viewBox", "0 0 1080 1080"); svg.setAttribute("preserveAspectRatio", "none");
  // Coordinates are in the original 1080x1080 photo. rest = where the drawn pupil sits; clip = inside of the eye outline.
  const eyesData = [
    { rest: [493.7, 350], r: 8.6, cover: 9.6, clip: [483, 361, 44, 20], c: [483, 361] },
    { rest: [633.7, 350.7], r: 8.2, cover: 9.2, clip: [637, 361, 39, 20], c: [637, 361] },
  ];
  svg.innerHTML = eyesData.map((e, i) => `
    <clipPath id="eclip${i}"><ellipse cx="${e.clip[0]}" cy="${e.clip[1]}" rx="${e.clip[2]}" ry="${e.clip[3]}"/></clipPath>
    <circle class="cover" cx="${e.rest[0]}" cy="${e.rest[1]}" r="${e.cover}" fill="#e6e6e6"/>
    <g clip-path="url(#eclip${i})"><circle class="pupil" cx="${e.rest[0]}" cy="${e.rest[1]}" r="${e.r}" fill="#1b1242"/></g>`).join("");
  av.append(svg);
  const covers = $$(".cover", svg), pupils = $$(".pupil", svg);

  // Match the cover colour to the real eye white by sampling the photo
  const sample = () => {
    try {
      const cv = document.createElement("canvas"); cv.width = cv.height = 1080;
      const x = cv.getContext("2d"); x.drawImage(img, 0, 0, 1080, 1080);
      eyesData.forEach((e, i) => { const d = x.getImageData(e.c[0] - 18, e.c[1] + 12, 1, 1).data; covers[i].setAttribute("fill", `rgb(${d[0]},${d[1]},${d[2]})`); });
    } catch (_) {}
  };
  img.complete ? sample() : img.addEventListener("load", sample);

  // Where the cursor is, then smooth the pupils toward it
  let mx = innerWidth / 2, my = innerHeight / 2, idleAt = 0;
  const cur = eyesData.map(() => [0, 0]);
  const MAXX = 34, MAXUP = 9, MAXDOWN = 17;
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; idleAt = performance.now(); });
  const tick = (now) => {
    const box = svg.getBoundingClientRect(), k = box.width / 1080;
    // After 4s with no pointer, glance around on its own
    if (now - idleAt > 4000) { const s = Math.floor(now / 1800) % 4; [mx, my] = [[0.2, 0.4], [0.8, 0.45], [0.5, 0.9], [0.65, 0.1]][s].map((f, j) => (j ? innerHeight : innerWidth) * f); }
    eyesData.forEach((e, i) => {
      const ex = box.left + e.c[0] * k, ey = box.top + e.c[1] * k;
      const dx = mx - ex, dy = my - ey, dist = Math.hypot(dx, dy) || 1, t = Math.min(1, dist / (box.width * 0.6));
      const tx = (dx / dist) * t * MAXX, ny = (dy / dist) * t, ty = ny * (ny < 0 ? MAXUP : MAXDOWN);
      cur[i][0] += (tx - cur[i][0]) * 0.15; cur[i][1] += (ty - cur[i][1]) * 0.15;
      pupils[i].setAttribute("transform", `translate(${cur[i][0].toFixed(2)} ${cur[i][1].toFixed(2)})`);
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

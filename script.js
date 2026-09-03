// Mobile nav toggle (used on every page)
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
});

/* ============================================================
   CATEGORIES
   This is the single source of truth for all 7 "folders".
   Edit the `count` once you know how many real clips are in
   each category, and see work.html for where the real <video>
   tags get added inside renderVideoGrid().
============================================================ */
const CATEGORIES = [
  {
    slug: "ai-generated-ugc",
    name: "AI-Generated UGC",
    description: "AI-generated creators and avatars built for ad campaigns.",
    tools: ["Premiere Pro", "AI Video"],
    count: 0,
  },
  {
    slug: "ai-cartoons-animation",
    name: "AI Cartoons & Animation",
    description: "AI-generated characters and animated scenes for commercial storytelling.",
    tools: ["Premiere Pro", "After Effects", "AI Video"],
    count: 0,
  },
  {
    slug: "static-ads",
    name: "Static Ads",
    description: "Static advertising creatives for performance campaigns.",
    tools: ["Figma", "Photoshop"],
    count: 0,
  },
  {
    slug: "localization",
    name: "Localization",
    description: "Creative adaptation and translation of ad content across markets and languages.",
    tools: ["Premiere Pro", "After Effects"],
    count: 0,
  },
  {
    slug: "graphic-motion",
    name: "Graphic Motion",
    description: "Original animation made end to end — graphics and motion, built by hand.",
    tools: ["After Effects"],
    count: 0,
  },
  {
    slug: "illustration-branding",
    name: "Illustration & Branding",
    description: "Illustration, logos, and packaging made to order.",
    tools: ["Procreate", "Illustrator"],
    count: 0,
  },
  {
    slug: "social-content",
    name: "Social Media Content",
    description: "Instagram content — posts and reels.",
    tools: ["Premiere Pro", "Photoshop", "Illustrator", "AI Content"],
    count: 0,
  },
];

/* ============================================================
   VIDEOS — this is where you list your real clips.
   For each category slug, add one entry per video file.
   `src`    — path to the mp4 file (must match your assets/video/ folder)
   `poster` — OPTIONAL: a still-frame jpg/png shown before play (recommended,
              otherwise the browser just shows a black box until playback)
   `caption`— OPTIONAL: short text shown under the clip

   Example — after adding files to assets/video/ai-generated-ugc/:
   "ai-generated-ugc": [
     { src: "assets/video/ai-generated-ugc/clip-1.mp4", poster: "assets/video/ai-generated-ugc/clip-1.jpg", caption: "UGC ad — skincare" },
     { src: "assets/video/ai-generated-ugc/clip-2.mp4" },
   ],

   Categories left as [] will keep showing the "Replace with your clip"
   placeholder, so it's safe to fill these in one category at a time.
============================================================ */
const VIDEOS = {
  "ai-generated-ugc": [
    { src: "assets/video/ai-generated-ugc/clip-1.mp4" },
  ],
  "ai-cartoons-animation": [],
  "static-ads": [],
"localization": [
  { src: "assets/video/localization/clip-1-de.mp4", caption: "German adaptation" },
  { src: "assets/video/localization/clip-1-it.mp4", caption: "Italian adaptation" },
],  
"graphic-motion": [],
  "illustration-branding": [],
  "social-content": [],
};

// Renders the pill navigation + heading + video grid on work.html
function initWorkPage() {
  const params = new URLSearchParams(window.location.search);
  const activeSlug = params.get("c") || CATEGORIES[0].slug;
  const active = CATEGORIES.find((c) => c.slug === activeSlug) || CATEGORIES[0];

  document.getElementById("category-title").textContent = active.name;
  document.getElementById("category-desc").textContent = active.description;

  const pillNav = document.getElementById("pill-nav");
  pillNav.innerHTML = CATEGORIES.map((c) => `
    <a class="pill ${c.slug === active.slug ? "active" : ""}" href="work.html?c=${c.slug}">
      ${c.name} (${(VIDEOS[c.slug] || []).length})
    </a>
  `).join("");

  const grid = document.getElementById("video-grid");
  const clips = VIDEOS[active.slug] || [];

  if (clips.length === 0) {
    // placeholder shown until real clips are added for this category
    grid.innerHTML = Array.from({ length: 4 }).map(() => `
      <div class="video-card">
        <div class="play">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 4L20 12L6 20V4Z" fill="#eaf2ee"/></svg>
        </div>
        <span>Replace with your clip</span>
      </div>
    `).join("");
    return;
  }

  grid.innerHTML = clips.map((v) => `
    <div class="video-card video-card--real">
      <video src="${v.src}" ${v.poster ? `poster="${v.poster}"` : ""} controls preload="metadata" playsinline></video>
      ${v.caption ? `<span>${v.caption}</span>` : ""}
    </div>
  `).join("");
}

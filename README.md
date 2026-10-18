# Yousef Hakeem — UX Portfolio

بورتفوليو يوسف زين العابدين حكيم، مصمم واجهات وتجربة المستخدم.
Portfolio of Yousef Zain Alabdeen Hakeem — UI/UX Designer & Human-Computer Interaction.

موقع ثابت (عربي/إنجليزي، وضع فاتح وداكن) — يشتغل عند أي شخص بدون تسجيل دخول ولا اعتماد على أي خدمة خارجية.

**الرابط المباشر / Live:** https://yousef-hakeem.github.io/

## Structure
- `index.html` — the page shell; content is rendered by `assets/site.js` with styles in `assets/site.css`.
- `shared/data.js` — all copy (AR/EN), contact details and project metadata. Edit text here.
- `shared/media.js` + `media/<project>/` — project screens (WebP, full + small), generated from `media/manifest.json`.
- `shared/viewer.*` — the project sheet with full-screen zoom; `shared/fab.*` — the floating contact button.
- `lib/` — GSAP, ScrollTrigger and Lenis, vendored. `fonts/` — self-hosted fonts.
- `Yousef_Hakeem_CV.pdf` — the CV linked from the site.
- `/concepts/` only redirects to the home page now.

## النشر (Publish)
Settings → Pages → Source: **Deploy from a branch** → Branch: **main** / **`/ (root)`** → Save.

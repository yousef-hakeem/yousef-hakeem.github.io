# Portfolio Redesign — Brief

Agreed decisions (keep these as the source of truth for the redesign).

## Direction
- **Style:** Creative / Interactive — distinctive motion, scroll-driven elements, memorable interactions. Must still read as professional, not gimmicky.
- **Scope:** Full redesign from scratch with clean, hand-written code (replacing the exported template).
- **Process:** Show design concepts first, pick one, then build the full site.
- **Reference:** 21st.dev components (via MCP) + Adobe for Creativity (fonts, type palettes, image work).

## Decision (after concepts)
- **Chosen: Concept C — Immersive Showcase** (`/concepts/c/`).
- Desktop loved as-is. Phone must feel just as strong: the sticky scroll-story of projects now runs on phones too
  (visual pinned to the top half, stories scroll underneath, circular wipe + aurora colour per project),
  fanned hero deck on phones, 3D tile entrances, and roomier line-height for Noto Kufi headings (no overlaps).
- Round 2: ScrapBid added (first, marked "Latest"), Thoby removed. The pinned stage is a swipeable gallery —
  drag/swipe (RTL-aware), arrows, keys or trackpad flip the active project's screens without opening it; tap opens
  the project at that screen. Light/dark theme toggle with a circular reveal (saved per visitor). Motion refined:
  directional wipes with depth, blur-in headings, magnetic CTAs, scroll progress bar.
- Round 3 polish: once-per-visit intro curtain, custom desktop cursor (labels: Drag / View / Zoom), progressive-blur
  bands around the phone stage, aligned process cards, fuller tools marquee, auto-fitted name signature in the footer.
- Next: user reviews C, then decides whether it replaces the live root site.

## Must keep
- All content: hero, about, process/methodology, focus & HCI expertise, projects, contact.
- Arabic (RTL) + English (LTR) toggle, light + dark mode.
- Projects: ScrapBid (latest), StudyBuddy (featured), Qurrat, Nusuk Watch, Mister, MindWell — full screen galleries. Thoby removed.
- Mobile gallery: vertical stack of full-size screens + full-screen pinch/drag/double-tap zoom.
- Floating contact button: bottom-right in Arabic, bottom-left in English; hidden while a project is open; sits above the mobile bottom nav.
- Contact: phone +966 59 070 0541 (call + WhatsApp), email yousef.z.hakeem@gmail.com.
- CV button → `Yousef_Hakeem_CV.pdf` (current: HCI version).
- Content edits already made: "UX Improvement" instead of Information Architecture; Accessibility/WCAG removed.
- URL stays: https://yousef-hakeem.github.io/

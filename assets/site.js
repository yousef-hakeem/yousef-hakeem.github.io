/* Yousef Hakeem — portfolio */
(function () {
  'use strict';
  var S = window.SITE, gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var app = document.getElementById('app');
  var esc = S.esc, W = function (x, c) { return S.words(x, c || 'w'); };
  var lenis = null, ctx = null, clock = null, menuOpen = false;
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var rtl = function () { return document.documentElement.dir === 'rtl'; };
  var isSmall = function () { return window.innerWidth <= 960; };
  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    swipe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18"/></svg>',
    moon: '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
  };
  var L = {
    ar: { workH: 'كل مشروع قصة — من المشكلة إلى الشاشة.', aboutH: 'تصميم يبدأ من الإنسان.', processH: 'أربع خطوات، تجربة واحدة واضحة.', expH: 'أدوات ومهارات أعمل بها.',
      hint: 'اسحب يمين ويسار لتقليب الشاشات', open: 'افتح', drag: 'اسحب', view: 'عرض', zoom: 'تكبير', cover: 'الغلاف', prev: 'الشاشة السابقة', next: 'الشاشة التالية', toLight: 'الوضع الفاتح', toDark: 'الوضع الداكن' },
    en: { workH: 'Every project is a story — from problem to screen.', aboutH: 'Design that starts with people.', processH: 'Four steps, one clear experience.', expH: 'The tools and skills I work with.',
      hint: 'Swipe left and right to flip through the screens', open: 'Open', drag: 'Drag', view: 'View', zoom: 'Zoom', cover: 'Cover', prev: 'Previous screen', next: 'Next screen', toLight: 'Light mode', toDark: 'Dark mode' }
  };
  // Aurora palettes per project (c1, c2, c3); default = brand.
  var BRAND = ['#2f8f77', '#4b3bd6', '#0f5bd8'];
  var PAL = {
    scrapbid: ['#c4561f', '#5a2410', '#e0883a'], studybuddy: ['#6d5bd0', '#3b2fa8', '#2a6bf0'], qurrat: ['#1d6b5f', '#b08a35', '#0f5b4f'],
    nusuk: ['#b08a35', '#3a2d12', '#6b5a2a'], mister: ['#4f6ff0', '#7b5cff', '#2aa8f0'], mindwell: ['#1f6b6e', '#2f8f77', '#155a7a']
  };
  // Floating screens around the hero: [project, image index, left%, top%, width(vw), depth]
  var FLOAT = [
    ['studybuddy', 4, 1.5, 13, 16, .9], ['mister', 6, 84, 9, 8.5, .6], ['scrapbid', 1, 75, 68, 17, 1],
    ['mindwell', 2, 4, 62, 7.5, .5], ['nusuk', 2, 88.5, 43, 9.5, .35], ['scrapbid', 15, 18, 76, 6.5, .3]
  ];
  // Fanned phone screens under the hero on small screens: [project, image index]
  var DECK = [['mindwell', 2], ['scrapbid', 13], ['mister', 0]];

  /* ---------- language + theme ---------- */
  function setLang(l) { document.documentElement.lang = l; document.documentElement.dir = S.t[l].dir; try { localStorage.setItem('yh-lang', l); } catch (e) {} }
  var saved = null; try { saved = localStorage.getItem('yh-lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'ar');

  function theme() { return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'; }
  function applyTheme(th) {
    document.documentElement.dataset.theme = th;
    try { localStorage.setItem('yh-theme', th); } catch (e) {}
    var mc = document.querySelector('meta[name="theme-color"]');
    if (mc) mc.content = th === 'light' ? '#f2f4f9' : '#070a12';
    var b = app.querySelector('.theme-btn');
    if (b) b.setAttribute('aria-label', th === 'light' ? L[S.lang()].toDark : L[S.lang()].toLight);
  }
  function toggleTheme(e) {
    var next = theme() === 'light' ? 'dark' : 'light';
    if (!document.startViewTransition || reduce) { applyTheme(next); return; }
    // The new theme spreads out from the button as a circle.
    var r = e.currentTarget.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    var R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var vt = document.startViewTransition(function () { applyTheme(next); });
    vt.ready.then(function () {
      document.documentElement.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + R + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 800, easing: 'cubic-bezier(.76,0,.24,1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(function () {});
  }

  /* ---------- templates ---------- */
  function tpl() {
    var t = S.tr(), l = L[S.lang()];
    var ids = ['about', 'work', 'process', 'contact'];
    var links = ids.map(function (id) { return '<a href="#' + id + '" data-scroll="' + id + '">' + esc(t.nav[id]) + '</a>'; }).join('');
    var floaters = FLOAT.map(function (f, i) {
      var im = S.img(f[0], f[1]);
      return '<div class="fl" data-proj="' + f[0] + '" data-depth="' + f[5] + '" style="left:' + f[2] + '%;top:' + f[3] + '%;width:' + f[4] + 'vw;aspect-ratio:' + im.w + '/' + im.h + ';--b:' + (0.5 + f[5] * 0.5).toFixed(2) + '"><img src="' + S.url(im.sm) + '" alt="" loading="' + (i < 3 ? 'eager' : 'lazy') + '"></div>';
    }).join('');
    var dots = S.order.map(function () { return '<i></i>'; }).join('');
    var items = S.order.map(function (id, i) {
      var p = t.P[id], m = S.meta[id];
      var badge = m.isNew ? '<em class="on-grad">★ ' + esc(t.isNew) + '</em>' : id === 'studybuddy' ? '<em class="on-grad">' + esc(t.featured) + '</em>' : '';
      return '<article class="sc-item" data-proj="' + id + '" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(p.title) + '">' +
        '<div class="sc-body"><span class="sc-n">' + pad(i + 1) + ' — ' + pad(S.order.length) + badge + '</span>' +
        '<p class="sc-tag">' + esc(p.tag) + '</p><h3 class="kufi">' + W(p.title) + '</h3><p class="sc-sub">' + esc(p.sub) + '</p>' +
        '<p class="sc-desc">' + esc(p.desc) + '</p>' +
        '<span class="sc-btn glass">' + esc(t.viewCase) + ' <small>' + window.MEDIA[id].length + '</small><i class="on-grad">' + ICON.arrow + '</i></span></div></article>';
    }).join('');
    var stats = t.stats.map(function (s) {
      var n = parseInt(s[0], 10), suf = s[0].replace(/^\d+/, '');
      return '<div class="tile t-stat glass spot" data-tilt><b class="grad" data-n="' + n + '" data-s="' + suf + '">' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>';
    });
    var facts = t.facts.map(function (f) { return '<li><span>' + esc(f[0]) + '</span><strong>' + esc(f[1]) + '</strong></li>'; }).join('');
    var tools = t.tools.concat(t.tools, t.tools, t.tools).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
    var steps = t.process.map(function (s) {
      return '<div class="step glass spot" data-tilt><div class="step-ring"><svg viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="28"/><circle class="fg" cx="32" cy="32" r="28"/></svg><b>' + s.n + '</b></div>' +
        '<div><h3 class="kufi">' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p></div></div>';
    }).join('');
    var exp = t.expertise.map(function (g) { return '<div class="exp-col glass spot" data-fade><h3 class="kufi">' + esc(g.h) + '</h3><ul>' + g.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>'; }).join('');
    var tl = t.timeline.map(function (e, i) { return '<div class="tl-item"><b>' + pad(i + 1) + '</b><div><h3>' + esc(e.title) + '</h3><small>' + esc(e.org) + '</small></div><p>' + esc(e.desc) + '</p></div>'; }).join('');
    var name = '<span class="w"><span>' + esc(t.firstName) + '</span></span> <span class="w"><span class="grad">' + esc(t.lastName) + '</span></span>';
    var dark = theme() === 'dark';

    return '' +
      '<div class="aurora" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i><div class="aurora-grid"></div><div class="aurora-vignette"></div></div>' +
      '<div class="progress" aria-hidden="true"></div>' +
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--accent)"/><stop offset="1" style="stop-color:var(--accent-2)"/></linearGradient></defs></svg>' +
      '<header class="nav glass"><a class="logo" href="#top" data-scroll="top"><i class="on-grad">YH</i><span>' + esc(t.brand) + '</span></a><nav class="nav-links">' + links + '</nav>' +
        '<div class="nav-actions">' +
          '<button class="gbtn theme-btn" type="button" aria-label="' + esc(dark ? l.toLight : l.toDark) + '">' + ICON.moon + ICON.sun + '</button>' +
          '<button class="gbtn lang" type="button" aria-label="Language">' + t.langBtn + '</button>' +
          '<a class="gbtn gbtn-grad on-grad" href="#contact" data-scroll="contact">' + esc(t.nav.contact) + '</a>' +
          '<button class="gbtn menu-btn" type="button">' + esc(t.menu) + '</button></div></header>' +
      '<div class="menu"><nav class="menu-links">' + links + '</nav><div class="menu-foot"><a class="gbtn" href="mailto:' + S.email + '">' + esc(t.emailLbl) + '</a>' +
        '<a class="gbtn" href="' + S.whatsapp + '" target="_blank" rel="noopener">' + esc(t.whatsapp) + '</a><a class="gbtn" href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' PDF</a></div></div>' +

      '<main>' +
      '<section class="hero" id="top" data-fab-hide><div class="floaters">' + floaters + '</div>' +
        '<div class="hero-inner"><span class="avail glass"><i></i>' + esc(t.available) + '</span>' +
          '<h1 class="hero-name kufi" aria-label="' + esc(t.fullName) + '">' + name + '</h1>' +
          '<p class="hero-role">' + esc(t.role) + ' <span>· ' + esc(t.roleSub) + '</span></p>' +
          '<p class="hero-intro">' + esc(t.intro) + '</p>' +
          '<div class="hero-cta"><a class="cta cta-grad on-grad" data-mag href="#work" data-scroll="work">' + esc(t.ctaWork) + ICON.down + '</a>' +
          '<a class="cta glass" data-mag href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' <small>PDF</small></a></div></div>' +
        '<div class="hero-deck">' + DECK.map(function (d, k) { var im = S.img(d[0], d[1]); return '<img class="d' + (k + 1) + '" data-proj="' + d[0] + '" src="' + S.url(im.sm) + '" width="' + im.w + '" height="' + im.h + '" alt="' + esc(t.P[d[0]].title) + '">'; }).join('') + '</div>' +
        '<span class="scroll-hint" aria-hidden="true"></span>' +
      '</section>' +

      '<section class="showcase" id="work"><div class="sc-head"><span class="eyebrow glass"><b class="on-grad">02</b>' + esc(t.workLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.workH) + '</h2></div>' +
        '<div class="sc-wrap"><div class="sc-sticky">' +
          '<div class="sc-stage glass" tabindex="0" role="region" aria-roledescription="carousel">' +
            '<div class="sc-glow"></div><div class="sc-slides"></div>' +
            '<div class="sc-label"><b class="on-grad">01 / ' + pad(S.order.length) + '</b><span></span></div>' +
            '<button class="sc-open" type="button">' + ICON.expand + '<span>' + esc(l.open) + '</span></button>' +
            '<button class="sc-nav sc-prev" type="button" aria-label="' + esc(l.prev) + '"></button>' +
            '<button class="sc-nav sc-next" type="button" aria-label="' + esc(l.next) + '"></button>' +
            '<div class="sc-meter"><span class="sc-count"></span><div class="sc-bar"><i></i></div></div>' +
            '<div class="sc-hint">' + ICON.swipe + esc(l.hint) + '</div>' +
          '</div><div class="sc-dots">' + dots + '</div></div>' +
        '<div class="sc-list">' + items + '</div></div></section>' +

      '<section id="about"><div class="sc-head"><span class="eyebrow glass"><b class="on-grad">01</b>' + esc(t.aboutLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.aboutH) + '</h2></div>' +
        '<div class="bento">' +
          '<div class="tile t-statement glass spot" data-tilt><p>' + W(t.statement, 'sw') + '</p><small>' + esc(t.aboutP) + '</small></div>' +
          stats[0] + stats[1] +
          '<div class="tile t-facts glass spot" data-tilt><ul>' + facts + '</ul></div>' +
          '<div class="tile t-quote glass spot" data-tilt><p class="kufi">' + esc(t.quote) + '</p></div>' +
          '<div class="tile t-tools glass"><div class="tools-row">' + tools + '</div></div>' +
        '</div></section>' +

      '<section id="process"><div class="sc-head"><span class="eyebrow glass"><b class="on-grad">03</b>' + esc(t.processLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.processH) + '</h2></div>' +
        '<div class="steps">' + steps + '</div></section>' +

      '<section id="expertise"><div class="sc-head"><span class="eyebrow glass"><b class="on-grad">04</b>' + esc(t.expertiseLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.expH) + '</h2></div>' +
        '<div class="exp">' + exp + '</div><div class="tl glass" data-fade>' + tl + '</div></section>' +

      '<section id="contact" data-fab-hide><div class="contact-card glass"><span class="eyebrow glass"><b class="on-grad">05</b>' + esc(t.contactLabel) + '</span>' +
        '<h2 class="contact-h kufi" data-reveal>' + W(t.contactH) + '</h2><p class="contact-p">' + esc(t.contactP) + '</p>' +
        '<a class="mail grad" href="mailto:' + S.email + '">' + S.email + '</a>' +
        '<div class="c-grid">' +
          '<a class="c-item glass" href="tel:' + S.phone + '"><span>' + esc(t.call) + '</span><strong>' + S.phoneDisplay + '</strong></a>' +
          '<a class="c-item glass" href="' + S.whatsapp + '" target="_blank" rel="noopener"><span>' + esc(t.whatsapp) + '</span><strong>WhatsApp ↗</strong></a>' +
          '<a class="c-item glass" href="' + S.linkedin + '" target="_blank" rel="noopener"><span>' + esc(t.linkedin) + '</span><strong>LinkedIn ↗</strong></a>' +
          '<a class="c-item glass" href="' + S.url(S.cv) + '" target="_blank" rel="noopener"><span>PDF</span><strong>' + esc(t.ctaCV) + ' ↓</strong></a>' +
        '</div></div>' +
        '<div class="sig kufi" aria-hidden="true"><span class="grad">' + esc(t.firstName + ' ' + t.lastName) + '</span></div>' +
        '<div class="footer"><span>' + esc(t.footer) + '</span><span>' + esc(t.localTime) + ' · <span class="clock" dir="ltr">--:--</span></span><button type="button" class="to-top">' + esc(t.backTop) + ' ↑</button></div>' +
      '</section>' +
      '</main>';
  }

  /* ---------- stage: flip through the active project's screens without opening it ---------- */
  var Stage = { el: null, slides: null, id: null, list: [], s: 0, cur: null, hinted: false, dragged: 0 };

  // Slide 0 is the project's cover composition; the rest are its screens (a plain cover isn't repeated).
  function slidesOf(id) {
    var m = S.meta[id], list = [{ cover: true }], skip = m.coverStyle === 'plain' ? m.cover[S.lang()][0] : -1;
    window.MEDIA[id].forEach(function (im, i) { if (i !== skip) list.push({ i: i }); });
    return list;
  }
  function slideEl(id, sl) {
    var m = S.meta[id], html;
    if (sl.cover) html = S.cover(id);
    else {
      var im = window.MEDIA[id][sl.i];
      var img = '<img src="' + S.url(im.sm) + '" srcset="' + S.url(im.sm) + ' 760w, ' + S.url(im.src) + ' 1800w" sizes="(max-width: 960px) 92vw, 680px" width="' + im.w + '" height="' + im.h +
        '" alt="' + esc(S.tr().P[id].title) + ' — ' + (sl.i + 1) + '" draggable="false" decoding="async">';
      if (im.h > im.w) html = '<div class="cv cv-tall">' + img + '</div>';
      else if (m.kind === 'web') html = '<div class="cv cv-web"><div class="cv-bar"><i></i><i></i><i></i></div>' + img + '</div>';
      else html = '<div class="cv cv-watch">' + img + '</div>';
    }
    var d = document.createElement('div');
    d.className = 'sv';
    d.innerHTML = html;
    d.querySelectorAll('img').forEach(function (x) { x.setAttribute('draggable', 'false'); x.removeAttribute('loading'); });
    return d;
  }
  function screenIndex() { var sl = Stage.list[Stage.s]; return sl && !sl.cover ? sl.i : 0; }
  function updateMeter() {
    var n = Stage.list.length - 1, l = L[S.lang()];
    var c = Stage.el.querySelector('.sc-count');
    c.textContent = Stage.s === 0 ? l.cover + ' · ' + n : pad(Stage.s) + ' / ' + pad(n);
    gsap.to(Stage.el.querySelector('.sc-bar i'), { scaleX: n ? Stage.s / n : 0, duration: reduce ? 0 : .6, ease: 'power3.out' });
    Stage.el.querySelector('.sc-prev').disabled = Stage.s <= 0;
    Stage.el.querySelector('.sc-next').disabled = Stage.s >= n;
  }
  function preload() {
    [Stage.s + 1, Stage.s + 2, Stage.s - 1].forEach(function (k) {
      var sl = Stage.list[k];
      if (sl && !sl.cover) { var im = new Image(); im.src = S.url(window.MEDIA[Stage.id][sl.i].sm); }
    });
  }
  // +1 = next, -1 = previous. "Next" comes from the reading direction: dragging left in English, right in Arabic.
  function stepFromDx(dx) { return (dx < 0) !== rtl() ? 1 : -1; }
  function canGo(step) { var t = Stage.s + step; return t >= 0 && t < Stage.list.length; }

  function flip(step) {
    if (!canGo(step)) { // rubber-band at the ends
      if (!reduce && Stage.cur) gsap.fromTo(Stage.cur, { x: 0 }, { x: (rtl() ? 1 : -1) * step * -18, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out' });
      return;
    }
    var old = Stage.cur;
    Stage.s += step;
    var el = slideEl(Stage.id, Stage.list[Stage.s]);
    Stage.slides.appendChild(el);
    Stage.cur = el;
    updateMeter();
    preload();
    if (reduce || !old) { if (old) old.remove(); return; }
    var dirX = (rtl() ? -1 : 1) * step; // where the incoming slide enters from, on screen
    gsap.killTweensOf(old);
    gsap.fromTo(el, { xPercent: dirX * 26, opacity: 0, rotationY: dirX * -14, scale: .94 },
      { xPercent: 0, x: 0, opacity: 1, rotationY: 0, scale: 1, duration: .85, ease: 'expo.out' });
    gsap.to(old, { xPercent: dirX * -22, opacity: 0, rotationY: dirX * 12, scale: .92, duration: .55, ease: 'power3.in', onComplete: function () { old.remove(); } });
  }

  function stageProject(id, dir, instant) {
    if (Stage.id === id) return;
    var old = Stage.cur, l = L[S.lang()], i = S.order.indexOf(id);
    Stage.id = id; Stage.list = slidesOf(id); Stage.s = 0;
    var el = slideEl(id, Stage.list[0]);
    Stage.slides.appendChild(el);
    Stage.cur = el;
    Stage.el.querySelector('.sc-glow').style.setProperty('--c', S.meta[id].accent);
    Stage.el.setAttribute('aria-label', S.tr().P[id].title);
    var lab = Stage.el.querySelector('.sc-label'), b = lab.querySelector('b'), sp = lab.querySelector('span');
    updateMeter();
    preload();
    if (instant || reduce) {
      b.textContent = pad(i + 1) + ' / ' + pad(S.order.length); sp.textContent = S.tr().P[id].title;
      if (old) old.remove();
      return;
    }
    // label rolls in the scroll direction
    gsap.timeline()
      .to([b, sp], { yPercent: -dir * 120, opacity: 0, duration: .25, ease: 'power2.in' })
      .add(function () { b.textContent = pad(i + 1) + ' / ' + pad(S.order.length); sp.textContent = S.tr().P[id].title; })
      .fromTo([b, sp], { yPercent: dir * 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .45, ease: 'expo.out', stagger: .04 });
    // incoming project wipes up (or down when scrolling back) and settles from depth; outgoing recedes
    var soft = !isSmall();
    gsap.fromTo(el, { clipPath: dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'expo.inOut' });
    var cv = el.querySelector('.cv');
    gsap.fromTo(cv, soft ? { yPercent: dir * 14, scale: 1.12, filter: 'blur(10px)' } : { yPercent: dir * 14, scale: 1.1 },
      soft ? { yPercent: 0, scale: 1, filter: 'blur(0px)', duration: 1.3, ease: 'expo.out', delay: .12, clearProps: 'filter' } : { yPercent: 0, scale: 1, duration: 1.2, ease: 'expo.out', delay: .12 });
    if (old) {
      gsap.killTweensOf(old);
      gsap.to(old, soft ? { scale: .9, opacity: 0, filter: 'blur(8px)', duration: .9, ease: 'power3.inOut', onComplete: function () { old.remove(); } }
                        : { scale: .92, opacity: 0, duration: .8, ease: 'power3.inOut', onComplete: function () { old.remove(); } });
    }
  }

  function openStage() { if (Stage.id && window.Viewer) window.Viewer.open(Stage.id, { screen: screenIndex() }); }

  function hintOnce() {
    if (Stage.hinted || reduce) return;
    Stage.hinted = true;
    var hint = Stage.el.querySelector('.sc-hint'), nudge = (rtl() ? 1 : -1) * 34; // a peek in the "next" drag direction
    gsap.timeline({ delay: .9 })
      .fromTo(hint, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' })
      .to(Stage.cur, { x: nudge, duration: .45, ease: 'power2.inOut' }, '<.2')
      .to(Stage.cur, { x: 0, duration: .8, ease: 'elastic.out(1, .5)' })
      .to(hint, { opacity: 0, y: -8, duration: .5, ease: 'power2.in' }, '+=1.8');
  }

  function bindStage() {
    Stage.el = app.querySelector('.sc-stage');
    Stage.slides = Stage.el.querySelector('.sc-slides');
    Stage.id = null; Stage.cur = null; Stage.hinted = false;
    var prev = Stage.el.querySelector('.sc-prev'), next = Stage.el.querySelector('.sc-next');
    // In RTL "next" sits on the left and points left.
    prev.innerHTML = rtl() ? ICON.right : ICON.left;
    next.innerHTML = rtl() ? ICON.left : ICON.right;
    prev.style.cssText = rtl() ? 'right:14px' : 'left:14px';
    next.style.cssText = rtl() ? 'left:14px' : 'right:14px';
    prev.addEventListener('click', function (e) { e.stopPropagation(); flip(-1); });
    next.addEventListener('click', function (e) { e.stopPropagation(); flip(1); });
    Stage.el.querySelector('.sc-open').addEventListener('click', function (e) { e.stopPropagation(); openStage(); });
    Stage.el.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.sc-nav, .sc-open') || (e.pointerType === 'mouse' && e.button !== 0)) return;
      drag = { x: e.clientX, y: e.clientY, id: e.pointerId, horiz: null, t: Date.now() };
    });
    // A tap opens the project at this screen. Opening on click (not pointerup) keeps the tap's own
    // click from landing on the freshly opened sheet's backdrop and closing it again.
    Stage.el.addEventListener('click', function (e) {
      if (e.target.closest('.sc-nav, .sc-open') || Date.now() - Stage.dragged < 400) return;
      openStage();
    });
    Stage.el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); flip(rtl() ? -1 : 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); flip(rtl() ? 1 : -1); }
      if (e.key === 'Enter') openStage();
    });
    // Two-finger horizontal swipes on a trackpad flip screens too.
    var acc = 0, lock = 0;
    Stage.el.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (Date.now() < lock) return;
      acc += e.deltaX;
      if (Math.abs(acc) > 46) { flip(stepFromDx(-acc)); acc = 0; lock = Date.now() + 520; }
    }, { passive: false });
    if (fine && !reduce) { // subtle depth tilt following the mouse
      var rx = 0, ry = 0;
      Stage.el.addEventListener('pointermove', function (e) {
        if (drag) return;
        var r = Stage.el.getBoundingClientRect(), cv = Stage.cur && Stage.cur.querySelector('.cv');
        if (!cv) return;
        ry = ((e.clientX - r.left) / r.width - .5) * 8; rx = -((e.clientY - r.top) / r.height - .5) * 6;
        gsap.to(cv, { rotationY: ry, rotationX: rx, duration: .8, ease: 'power3.out', overwrite: 'auto' });
      });
      Stage.el.addEventListener('pointerleave', function () { var cv = Stage.cur && Stage.cur.querySelector('.cv'); if (cv) gsap.to(cv, { rotationY: 0, rotationX: 0, duration: .9, ease: 'power3.out' }); });
    }
  }

  // Drag tracking lives on window so a swipe can leave the stage without getting stuck.
  var drag = null;
  window.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id || !Stage.cur) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (drag.horiz === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) drag.horiz = Math.abs(dx) > Math.abs(dy) * 1.1;
    if (!drag.horiz) return;
    var edge = !canGo(stepFromDx(dx));
    gsap.set(Stage.cur, { x: dx * (edge ? .22 : .7), rotationY: dx * .025, opacity: 1 - Math.min(Math.abs(dx) / 900, .3) });
  });
  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    var d = drag, dx = e.clientX - d.x, dt = Math.max(Date.now() - d.t, 1);
    drag = null;
    if (d.horiz === null) return; // a plain tap is handled by the click listener
    Stage.dragged = Date.now();
    if (!d.horiz) return;
    var step = stepFromDx(dx), fast = Math.abs(dx) / dt > .45;
    if ((Math.abs(dx) > 70 || (fast && Math.abs(dx) > 24)) && canGo(step)) flip(step);
    else if (Stage.cur) gsap.to(Stage.cur, { x: 0, rotationY: 0, opacity: 1, duration: .8, ease: 'elastic.out(1, .6)' });
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  /* ---------- UI ---------- */
  function scrollToId(id) {
    var el = id === 'top' ? 0 : document.getElementById(id);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6, offset: id === 'top' ? 0 : -20 });
    else window.scrollTo({ top: el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: reduce ? 'auto' : 'smooth' });
  }
  function setMenu(on) { menuOpen = on; document.documentElement.classList.toggle('menu-open', on); if (lenis) { if (on) lenis.stop(); else lenis.start(); } }
  function setPalette(id, instant) {
    var c = (id && PAL[id]) || BRAND;
    gsap.to(document.documentElement, { '--c1': c[0], '--c2': c[1], '--c3': c[2], duration: instant ? 0 : 1.6, ease: 'power2.inOut', overwrite: 'auto' });
  }

  function bindUI() {
    app.querySelectorAll('[data-scroll]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); setMenu(false); scrollToId(a.getAttribute('data-scroll')); }); });
    app.querySelector('.theme-btn').addEventListener('click', toggleTheme);
    app.querySelector('.lang').addEventListener('click', function () {
      var y = window.scrollY;
      setLang(S.lang() === 'ar' ? 'en' : 'ar');
      mount(false);
      if (window.Viewer) window.Viewer.refresh();
      window.scrollTo(0, y); if (lenis) lenis.scrollTo(y, { immediate: true });
    });
    app.querySelector('.menu-btn').addEventListener('click', function () { setMenu(!menuOpen); });
    app.querySelector('.to-top').addEventListener('click', function () { scrollToId('top'); });
    var clockEl = app.querySelector('.clock');
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Riyadh' });
    clearInterval(clock); var tick = function () { clockEl.textContent = fmt.format(new Date()); }; tick(); clock = setInterval(tick, 15000);
    bindStage();

    if (fine && !reduce) {
      app.querySelectorAll('.spot').forEach(function (el) {
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          el.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
      });
      app.querySelectorAll('[data-tilt]').forEach(function (el) {
        var rx = gsap.quickTo(el, 'rotationX', { duration: .7, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: .7, ease: 'power3' });
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - .5) * 8);
          rx(-((e.clientY - r.top) / r.height - .5) * 8);
        });
        el.addEventListener('pointerleave', function () { rx(0); ry(0); });
      });
      app.querySelectorAll('[data-mag]').forEach(function (el) {
        var xTo = gsap.quickTo(el, 'x', { duration: .7, ease: 'elastic.out(1, .45)' }), yTo = gsap.quickTo(el, 'y', { duration: .7, ease: 'elastic.out(1, .45)' });
        el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .28); yTo((e.clientY - r.top - r.height / 2) * .4); });
        el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
      });
      var movers = gsap.utils.toArray(app.querySelectorAll('.fl')).map(function (f) { return { d: +f.dataset.depth, x: gsap.quickTo(f, 'x', { duration: 1.4, ease: 'power3' }), y: gsap.quickTo(f, 'y', { duration: 1.4, ease: 'power3' }) }; });
      app.querySelector('.hero').addEventListener('pointermove', function (e) {
        var cx = e.clientX / innerWidth - .5, cy = e.clientY / innerHeight - .5;
        movers.forEach(function (m) { m.x(cx * -60 * m.d); m.y(cy * -40 * m.d); });
      });
    }
  }

  /* ---------- motion ---------- */
  function motion(first) {
    var nav = app.querySelector('.nav');
    // On phones the gallery pins to the top, so the nav stays out of its way while it is pinned.
    var pinned = false;
    function navState(down) { nav.classList.toggle('is-hidden', !menuOpen && (pinned || (down && window.scrollY > innerHeight * .7))); }
    ST.create({ start: 0, end: 'max', onUpdate: function (s) { navState(s.direction === 1); } });
    ST.create({ trigger: '.sc-wrap', start: 'top 80px', end: 'bottom 60%', onToggle: function (s) { pinned = s.isActive && isSmall(); navState(s.direction === 1); } });
    ['about', 'work', 'process', 'contact'].forEach(function (id) {
      ST.create({ trigger: '#' + id, start: 'top 50%', end: 'bottom 50%', onToggle: function (s) { if (s.isActive) app.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-scroll') === id); }); } });
    });

    /* showcase: the stage follows the active story */
    var items = gsap.utils.toArray('.sc-item'), dots = gsap.utils.toArray('.sc-dots i'), active = -1;
    function activate(i) {
      if (i === active) return;
      var dir = i > active ? 1 : -1;
      active = i;
      items.forEach(function (it, k) { it.classList.toggle('is-active', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
      stageProject(S.order[i], dir, Stage.id === null);
      setPalette(S.order[i]);
    }
    // The active story is the last one whose top crossed the activation line; recomputed every update so
    // fast flings and jumps never skip a project. On phones the stage pins to the top half, so the line sits lower.
    function pickActive() {
      var line = window.innerHeight * (isSmall() ? 0.74 : 0.55), idx = 0;
      items.forEach(function (it, k) { if (it.getBoundingClientRect().top < line) idx = k; });
      activate(idx);
    }
    ST.create({ trigger: '.sc-list', start: 'top bottom', end: 'bottom top', onUpdate: pickActive, onRefresh: pickActive });
    ST.create({ trigger: '.showcase', start: 'top 60%', end: 'bottom 40%', onEnter: hintOnce, onEnterBack: hintOnce,
      onLeave: function () { setPalette(null); }, onLeaveBack: function () { setPalette(null); } });
    activate(0);
    setPalette(null, true);

    if (reduce) return;

    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .4 } });

    /* intro */
    var tl = gsap.timeline({ delay: first ? introAt : 0, defaults: { ease: 'expo.out' } });
    tl.from('.avail', { y: -16, opacity: 0, duration: 1 })
      .from('.hero-name .w > span', { yPercent: 120, rotation: 4, filter: 'blur(12px)', duration: 1.5, stagger: .14, clearProps: 'filter' }, .1)
      .from('.hero-role, .hero-intro', { y: 26, opacity: 0, filter: 'blur(6px)', duration: 1.2, stagger: .08, clearProps: 'filter' }, .45)
      .from('.hero-cta > *', { y: 24, opacity: 0, duration: 1.1, stagger: .08 }, .6)
      .from('.fl', { opacity: 0, scale: .7, z: -420, duration: 1.8, stagger: { each: .08, from: 'random' } }, .25);

    /* hero on scroll */
    gsap.utils.toArray('.fl').forEach(function (f) {
      var d = +f.dataset.depth;
      gsap.to(f, { yPercent: -120 * d, rotation: (d - .6) * 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    });
    gsap.to('.hero-inner', { y: 120, opacity: 0, scale: .94, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '80% top', scrub: 1 } });

    /* reveals */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el.querySelectorAll('.w > span'), { yPercent: 115, rotation: 3, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .045, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('[data-fade]').forEach(function (el) {
      gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    items.forEach(function (it) {
      var st = { trigger: it, start: 'top 85%' };
      gsap.from(it.querySelectorAll('h3 .w > span'), { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: .06, scrollTrigger: st });
      gsap.from(it.querySelectorAll('.sc-n, .sc-tag, .sc-sub, .sc-desc, .sc-btn'), { y: 26, opacity: 0, duration: 1, ease: 'expo.out', stagger: .06, scrollTrigger: st });
    });
    gsap.utils.toArray('.tile').forEach(function (el) {
      gsap.from(el, { y: 70, rotationX: 20, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%', duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
    });
    gsap.to('.t-statement p .sw', { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.t-statement', start: 'top 80%', end: 'bottom 55%', scrub: true } });
    gsap.from('.sc-stage', { opacity: 0, scale: .94, y: 40, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.sc-wrap', start: 'top 85%' } });

    /* mobile hero deck: fanned screens that spread as you scroll */
    var deck = app.querySelector('.hero-deck');
    if (deck && getComputedStyle(deck).display !== 'none') {
      var d1 = deck.querySelector('.d1'), d2 = deck.querySelector('.d2'), d3 = deck.querySelector('.d3');
      gsap.set([d1, d2, d3], { x: 0, xPercent: -50 });
      var dst = { trigger: deck, start: 'top 85%', end: 'bottom top', scrub: 1 };
      gsap.fromTo(d1, { xPercent: -98, rotation: -9, y: 22 }, { xPercent: -125, rotation: -20, y: 40, ease: 'none', scrollTrigger: dst });
      gsap.fromTo(d3, { xPercent: -2, rotation: 9, y: 22 }, { xPercent: 25, rotation: 20, y: 40, ease: 'none', scrollTrigger: dst });
      gsap.fromTo(d2, { scale: 1, y: 0 }, { scale: 1.08, y: -30, ease: 'none', scrollTrigger: dst });
      gsap.from(deck, { y: 90, opacity: 0, scale: .9, duration: 1.4, delay: .4, ease: 'expo.out' });
      gsap.to(deck, { y: -10, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.9 });
    }
    gsap.utils.toArray('.t-stat b').forEach(function (b) {
      var end = +b.dataset.n, suf = b.dataset.s || '', o = { v: 0 };
      b.textContent = '0' + suf;
      gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: b, start: 'top 92%' }, onUpdate: function () { b.textContent = Math.round(o.v) + suf; } });
    });
    gsap.to('.tools-row', { xPercent: -50, ease: 'none', duration: 32, repeat: -1 });
    gsap.utils.toArray('.step').forEach(function (s, i) {
      gsap.to(s.querySelector('.fg'), { strokeDashoffset: 176 - 176 * (i + 1) / 4, duration: 1.8, ease: 'power3.inOut', scrollTrigger: { trigger: s, start: 'top 85%' } });
      gsap.from(s, { y: 60, rotationX: 18, transformPerspective: 900, opacity: 0, duration: 1.2, delay: (isSmall() ? 0 : i * .08), ease: 'expo.out', scrollTrigger: { trigger: isSmall() ? s : '.steps', start: 'top 88%' } });
    });
    gsap.from('.contact-card', { scale: .9, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.contact-card', start: 'top bottom', end: 'top 35%', scrub: 1 } });
    gsap.from('.sig span', { yPercent: 75, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.sig', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
  }

  /* ---------- custom cursor: a dot plus a trailing ring that labels what a click will do ---------- */
  function initCursor() {
    if (!fine || reduce) return;
    var el = document.createElement('div');
    el.className = 'cursor is-hidden';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<i class="cur-dot"></i><span class="cur-ring"><b></b></span>';
    document.body.appendChild(el);
    document.documentElement.classList.add('has-cursor');
    var dot = el.querySelector('.cur-dot'), ring = el.querySelector('.cur-ring'), lab = ring.querySelector('b'), shown = false, last = '';
    var dx = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power3' }), dy = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power3' });
    var rx = gsap.quickTo(ring, 'x', { duration: .5, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .5, ease: 'power3' });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      if (!shown) { gsap.set([dot, ring], { x: e.clientX, y: e.clientY }); shown = true; }
      el.classList.remove('is-hidden');
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    });
    document.addEventListener('pointerover', function (e) {
      var t = e.target, l = L[S.lang()], label = '', link = false;
      if (!t.closest) return;
      if (t.closest('.sc-nav, .sc-open')) link = true;
      else if (t.closest('.sc-stage')) label = ICON.swipe + esc(l.drag);
      else if (t.closest('.pv-shot')) label = esc(l.zoom);
      else if (t.closest('.sc-item, .fl')) label = esc(l.view);
      else if (t.closest('a, button, [role="button"], label')) link = true;
      if (label !== last) { if (label) lab.innerHTML = label; last = label; }
      el.classList.toggle('is-label', !!label);
      el.classList.toggle('is-link', link);
    });
    document.documentElement.addEventListener('mouseleave', function () { el.classList.add('is-hidden'); });
    window.addEventListener('pointerdown', function () { el.classList.add('is-down'); });
    window.addEventListener('pointerup', function () { el.classList.remove('is-down'); });
  }

  /* ---------- intro curtain (first visit per session) ---------- */
  var introAt = .1;
  function playLoader() {
    var ld = document.querySelector('.loader');
    if (!ld || document.documentElement.classList.contains('no-loader')) { if (ld) ld.remove(); return; }
    try { sessionStorage.setItem('yh-intro', '1'); } catch (e) {}
    if (lenis) lenis.stop();
    var n = ld.querySelector('.ld-n'), o = { v: 0 };
    gsap.timeline({ onComplete: function () { ld.remove(); if (lenis) lenis.start(); } })
      .to(o, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: function () { n.textContent = pad(Math.round(o.v)); } })
      .to(ld.querySelector('.ld-fill'), { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
      .from(ld.querySelector('.ld-mark i'), { scale: .6, opacity: 0, duration: .8, ease: 'expo.out' }, 0)
      .to(ld.querySelectorAll('.ld-mark, .ld-line, .ld-meta'), { y: -18, opacity: 0, duration: .35, ease: 'power2.in', stagger: .04 }, 1.15)
      .to(ld, { clipPath: 'inset(0% 0% 100% 0%)', duration: .9, ease: 'expo.inOut' }, 1.3);
    introAt = 1.65; // the hero starts settling as the curtain lifts
  }

  // The signature wordmark always spans the full content width.
  function fitSig() {
    var box = app.querySelector('.sig'), sp = box && box.querySelector('span');
    if (!sp) return;
    sp.style.fontSize = '100px';
    var w = sp.getBoundingClientRect().width;
    if (w) sp.style.fontSize = Math.min(100 * box.clientWidth / w * .97, 260) + 'px';
  }
  var fitT = null;
  window.addEventListener('resize', function () { clearTimeout(fitT); fitT = setTimeout(fitSig, 150); });

  function mount(first) {
    if (ctx) ctx.revert();
    setMenu(false);
    app.innerHTML = tpl();
    document.title = S.tr().brand + ' — ' + S.tr().role;
    bindUI();
    fitSig();
    ctx = gsap.context(function () { motion(first); }, app);
    ST.refresh();
    window.dispatchEvent(new Event('page:render'));
  }

  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: .085 });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  window.addEventListener('pv:open', function () { if (lenis) lenis.stop(); });
  window.addEventListener('pv:close', function () { if (lenis) lenis.start(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  playLoader();
  initCursor();
  mount(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitSig(); ST.refresh(); });
  window.addEventListener('load', function () { ST.refresh(); });
})();

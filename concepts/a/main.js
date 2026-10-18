/* Concept A — Kinetic Dark */
(function () {
  'use strict';
  var S = window.SITE, gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var app = document.getElementById('app');
  var esc = S.esc;
  var lenis = null, ctx = null, mm = null, clock = null, menuOpen = false;

  var I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>'
  };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var W = function (text, cls) { return S.words(text, cls || 'w'); };

  /* ---------- language ---------- */
  function setLang(l) {
    document.documentElement.lang = l;
    document.documentElement.dir = S.t[l].dir;
    try { localStorage.setItem('yh-lang', l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('yh-lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'ar');

  /* ---------- templates ---------- */
  function loaderTpl() {
    return '<div class="loader"><div class="loader-top mono"><span>YOUSEF HAKEEM</span><span>PORTFOLIO — 2026</span></div>' +
      '<div><div class="loader-count">0</div><div class="loader-bar"><i></i></div></div></div>';
  }

  function tpl() {
    var t = S.tr();
    var navIds = ['about', 'work', 'process', 'contact'];
    var links = navIds.map(function (id) { return '<a href="#' + id + '" data-scroll="' + id + '">' + esc(t.nav[id]) + '</a>'; }).join('');
    var menuLinks = navIds.map(function (id, i) { return '<a href="#' + id + '" data-scroll="' + id + '"><small>' + pad(i + 1) + '</small>' + esc(t.nav[id]) + '</a>'; }).join('');
    var mqA = t.marquee.map(function (m) { return '<span class="mq-item">' + esc(m) + '<i></i></span>'; }).join('');
    var mqB = t.marquee.slice().reverse().map(function (m) { return '<span class="mq-item">' + esc(m) + '<i></i></span>'; }).join('');

    var cards = S.order.map(function (id, i) {
      var p = t.P[id], m = S.meta[id], n = window.MEDIA[id].length;
      return '<article class="card" data-proj="' + id + '" tabindex="0" role="button" aria-label="' + esc(p.title + ' — ' + t.viewCase) + '" style="--i:' + i + ';--c:' + m.accent + '">' +
        '<div class="card-inner">' +
          '<div class="card-info"><div>' +
            '<div class="card-top mono"><span class="card-n">' + pad(i + 1) + ' / ' + pad(S.order.length) + '</span><span>' + (id === 'studybuddy' ? '★ ' + esc(t.featured) : '') + '</span></div>' +
            '<p class="card-tag">' + esc(p.tag) + '</p>' +
            '<h3 class="display">' + esc(p.title) + '</h3><p class="card-sub">' + esc(p.sub) + '</p>' +
            '<p class="card-desc">' + esc(p.desc) + '</p>' +
          '</div><span class="card-cta">' + esc(t.viewCase) + ' <small>' + n + '</small><i>' + I.arrow + '</i></span></div>' +
          '<div class="card-media">' + S.cover(id) + '</div>' +
          '<div class="card-shade"></div>' +
        '</div></article>';
    }).join('');

    var steps = t.process.map(function (s) {
      return '<div class="step" data-fade><div class="step-n">' + s.n + '</div><div><h3>' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p></div></div>';
    }).join('');
    var exp = t.expertise.map(function (g) {
      return '<div class="exp" data-fade><h3>' + esc(g.h) + '</h3><ul>' + g.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
    var tl = t.timeline.map(function (e, i) {
      return '<div class="tl" data-fade><span class="tl-n">' + pad(i + 1) + '</span><div><h3>' + esc(e.title) + '</h3><small>' + esc(e.org) + '</small></div><p>' + esc(e.desc) + '</p></div>';
    }).join('');
    var stats = t.stats.map(function (s) {
      var num = parseInt(s[0], 10), suf = s[0].replace(/^\d+/, '');
      return '<div class="stat" data-fade><b data-n="' + num + '" data-s="' + suf + '">' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>';
    }).join('');
    var facts = t.facts.map(function (f) { return '<li><span>' + esc(f[0]) + '</span><strong>' + esc(f[1]) + '</strong></li>'; }).join('');

    return '' +
      '<div class="grain" aria-hidden="true"></div>' +
      '<div class="progress" aria-hidden="true"></div>' +
      '<header class="nav">' +
        '<a class="nav-logo" href="#top" data-scroll="top" aria-label="' + esc(t.brand) + '">YH<b>.</b></a>' +
        '<nav class="nav-links">' + links + '</nav>' +
        '<div class="nav-actions">' +
          '<button class="chip lang" type="button" aria-label="Language">' + t.langBtn + '</button>' +
          '<a class="chip chip-accent" href="#contact" data-scroll="contact">' + esc(t.nav.contact) + '</a>' +
          '<button class="chip menu-btn" type="button" aria-label="' + esc(t.menu) + '"><i></i><i></i></button>' +
        '</div>' +
      '</header>' +
      '<div class="menu"><nav class="menu-links">' + menuLinks + '</nav><div class="menu-foot">' +
        '<a class="chip" href="mailto:' + S.email + '">' + esc(t.emailLbl) + '</a>' +
        '<a class="chip" href="' + S.whatsapp + '" target="_blank" rel="noopener">' + esc(t.whatsapp) + '</a>' +
        '<a class="chip" href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' PDF</a>' +
      '</div></div>' +

      '<main>' +
      '<section class="hero" id="top" data-fab-hide>' +
        '<div class="hero-glow-wrap" aria-hidden="true"><div class="hero-glow"></div></div>' +
        '<div class="hero-top"><span class="status"><i></i>' + esc(t.available) + '</span><div class="hero-role"><strong>' + esc(t.role) + '</strong>' + esc(t.roleSub) + '</div></div>' +
        '<div class="hero-name-wrap">' +
          '<h1 class="hero-name display" aria-label="' + esc(t.fullName) + '"><span class="line l1"><span>' + esc(t.firstName) + '</span></span><span class="line l2"><span>' + esc(t.lastName) + '</span></span></h1>' +
          '<a class="badge" href="#work" data-scroll="work" aria-label="' + esc(t.ctaWork) + '"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="bc" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"/></defs><text><textPath href="#bc">OPEN TO WORK · UI/UX · HCI · </textPath></text></svg><span>' + I.down + '</span></a>' +
        '</div>' +
        '<div class="hero-foot"><p class="hero-intro">' + esc(t.intro) + '</p><div class="hero-cta">' +
          '<a class="btn btn-solid" data-mag href="#work" data-scroll="work">' + esc(t.ctaWork) + I.down + '</a>' +
          '<a class="btn btn-ghost" data-mag href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' <small>PDF</small></a>' +
        '</div></div>' +
      '</section>' +

      '<section class="marquee" aria-hidden="true"><div class="mq-row">' + mqA + mqA + '</div><div class="mq-row outline">' + mqB + mqB + '</div></section>' +

      '<section class="about" id="about">' +
        '<span class="label"><b>( 01 )</b>' + esc(t.aboutLabel) + '</span>' +
        '<p class="statement">' + W(t.statement, 'sw') + '</p>' +
        '<div class="about-grid"><p data-fade>' + esc(t.aboutP) + '</p><ul class="facts" data-fade>' + facts + '</ul></div>' +
        '<div class="stats">' + stats + '</div>' +
      '</section>' +

      '<section class="work" id="work">' +
        '<div class="work-head"><div><span class="label"><b>( 02 )</b>' + esc(t.workLabel) + '</span><h2 class="h2" data-reveal>' + W(t.workH) + '</h2></div><span class="work-count">' + pad(S.order.length) + '</span></div>' +
        '<div class="stack">' + cards + '</div>' +
      '</section>' +

      '<section class="process" id="process"><div class="process-pin">' +
        '<span class="label"><b>( 03 )</b>' + esc(t.processLabel) + '</span>' +
        '<h2 class="h2" data-reveal>' + W(t.processH) + '</h2>' +
        '<div class="process-track">' + steps + '</div>' +
      '</div></section>' +

      '<section class="expertise" id="expertise">' +
        '<span class="label"><b>( 04 )</b>' + esc(t.expertiseLabel) + '</span>' +
        '<div class="exp-grid">' + exp + '</div>' +
        '<div class="tools" data-fade>' + t.tools.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>' +
        '<div class="timeline"><span class="label"><b>( 05 )</b>' + esc(t.timelineLabel) + '</span><div style="margin-top:28px">' + tl + '</div></div>' +
      '</section>' +

      '<section class="contact" id="contact" data-fab-hide><div>' +
        '<span class="label"><b>( 06 )</b>' + esc(t.contactLabel) + '</span>' +
        '<h2 class="contact-h display" data-reveal>' + W(t.contactH) + '</h2>' +
        '<p class="contact-p" data-fade>' + esc(t.contactP) + '</p>' +
        '<a class="contact-mail" data-mag href="mailto:' + S.email + '">' + S.email + '</a>' +
        '<div class="contact-grid">' +
          '<a class="c-item" data-fade href="tel:' + S.phone + '"><span>' + esc(t.call) + '</span><strong><em>' + S.phoneDisplay + '</em>' + I.ext + '</strong></a>' +
          '<a class="c-item" data-fade href="' + S.whatsapp + '" target="_blank" rel="noopener"><span>' + esc(t.whatsapp) + '</span><strong>' + esc(t.whatsapp) + I.ext + '</strong></a>' +
          '<a class="c-item" data-fade href="' + S.linkedin + '" target="_blank" rel="noopener"><span>' + esc(t.linkedin) + '</span><strong>LinkedIn' + I.ext + '</strong></a>' +
          '<a class="c-item" data-fade href="' + S.url(S.cv) + '" target="_blank" rel="noopener"><span>PDF</span><strong>' + esc(t.ctaCV) + I.ext + '</strong></a>' +
        '</div></div>' +
        '<footer class="footer"><span>' + esc(t.footer) + '</span><span>' + esc(t.localTime) + ' · <span class="clock" dir="ltr">--:--:--</span></span>' +
          '<button type="button" class="to-top">' + esc(t.backTop) + I.up + '</button></footer>' +
      '</section>' +
      '</main>';
  }

  /* ---------- UI bindings ---------- */
  function scrollToId(id) {
    var el = id === 'top' ? 0 : document.getElementById(id);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.5 });
    else window.scrollTo({ top: el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: reduce ? 'auto' : 'smooth' });
  }
  function setMenu(on) {
    menuOpen = on;
    document.documentElement.classList.toggle('menu-open', on);
    if (lenis) { if (on) lenis.stop(); else lenis.start(); }
  }
  function bindUI() {
    app.querySelectorAll('[data-scroll]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        setMenu(false);
        scrollToId(a.getAttribute('data-scroll'));
      });
    });
    app.querySelector('.lang').addEventListener('click', function () {
      var y = window.scrollY;
      setLang(S.lang() === 'ar' ? 'en' : 'ar');
      mount(false);
      if (window.Viewer) window.Viewer.refresh();
      window.scrollTo(0, y);
      if (lenis) lenis.scrollTo(y, { immediate: true });
    });
    app.querySelector('.menu-btn').addEventListener('click', function () { setMenu(!menuOpen); });
    app.querySelector('.to-top').addEventListener('click', function () { scrollToId('top'); });
    if (fine && !reduce) {
      app.querySelectorAll('[data-mag]').forEach(function (el) {
        var xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1, .45)' });
        var yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1, .45)' });
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * .3);
          yTo((e.clientY - r.top - r.height / 2) * .4);
        });
        el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
      });
      var hero = app.querySelector('.hero'), glow = app.querySelector('.hero-glow');
      var gx = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3' }), gy = gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3' });
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        gx((e.clientX - r.left - r.width / 2) * .35);
        gy((e.clientY - r.top - r.height * .4) * .35);
      });
    }
    startClock();
  }

  function startClock() {
    clearInterval(clock);
    var el = app.querySelector('.clock');
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Riyadh' });
    var tick = function () { el.textContent = fmt.format(new Date()); };
    tick();
    clock = setInterval(tick, 1000);
  }

  /* ---------- motion ---------- */
  function motion(first) {
    var rtl = document.documentElement.dir === 'rtl';
    var nav = app.querySelector('.nav');

    ST.create({
      start: 0, end: 'max',
      onUpdate: function (s) {
        var y = s.scroll();
        nav.classList.toggle('is-solid', y > 30);
        nav.classList.toggle('is-hidden', s.direction === 1 && y > window.innerHeight * .7 && !menuOpen);
      }
    });
    ['about', 'work', 'process', 'contact'].forEach(function (id) {
      ST.create({
        trigger: '#' + id, start: 'top 50%', end: 'bottom 50%',
        onToggle: function (s) {
          if (!s.isActive) return;
          app.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-scroll') === id); });
        }
      });
    });

    if (reduce) return;

    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

    /* intro */
    gsap.set('.hero-glow', { xPercent: -50, yPercent: -50 });
    var tl = gsap.timeline();
    if (first) {
      var count = app.querySelector('.loader-count'), o = { v: 0 };
      gsap.set('.loader', { clipPath: 'inset(0% 0% 0% 0%)' });
      tl.to(o, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: function () { count.textContent = Math.round(o.v); } }, 0)
        .to('.loader-bar i', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .to('.loader', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' }, 1.6)
        .set('.loader', { display: 'none' });
    }
    var at = first ? 1.95 : 0;
    tl.from('.hero-name .line > span', { yPercent: 118, duration: 1.4, ease: 'expo.out', stagger: .12 }, at)
      .from('.hero-top > *, .hero-foot > *', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08 }, at + .35)
      .from('.hero-glow', { opacity: 0, duration: 2, ease: 'power2.out' }, at)
      .from('.badge', { scale: 0, rotate: -120, duration: 1.2, ease: 'back.out(1.6)' }, at + .6);

    /* hero on scroll */
    var heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero-name .l1', { xPercent: rtl ? 14 : -14, ease: 'none', scrollTrigger: heroST });
    gsap.to('.hero-name .l2', { xPercent: rtl ? -14 : 14, ease: 'none', scrollTrigger: heroST });
    gsap.to('.hero-top, .hero-foot', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '55% top', scrub: true } });
    gsap.to('.hero-glow-wrap', { yPercent: 35, scale: 1.25, ease: 'none', scrollTrigger: heroST });

    /* velocity marquee */
    var rows = gsap.utils.toArray('.mq-row');
    var loops = rows.map(function (row, i) {
      var tw = i % 2 ? gsap.fromTo(row, { xPercent: -50 }, { xPercent: 0, ease: 'none', duration: 34, repeat: -1 })
                     : gsap.to(row, { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
      tw.totalTime(tw.duration() * 50); // headroom so negative timeScale can play backwards
      return tw;
    });
    var skew = gsap.quickTo(rows, 'skewX', { duration: .5, ease: 'power3' });
    ST.create({
      trigger: '.marquee', start: 'top bottom', end: 'bottom top',
      onUpdate: function (s) {
        var v = s.getVelocity();
        var speed = s.direction * Math.min(1 + Math.abs(v) / 350, 6);
        gsap.to(loops, { timeScale: speed, duration: .2, overwrite: true, onComplete: function () { gsap.to(loops, { timeScale: s.direction, duration: 1.2 }); } });
        skew(gsap.utils.clamp(-8, 8, v / -250));
      },
      onLeave: function () { skew(0); }, onLeaveBack: function () { skew(0); }
    });

    /* statement words light up */
    gsap.to('.statement .sw', { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 82%', end: 'bottom 48%', scrub: true } });

    /* generic reveals */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el.querySelectorAll('.w > span'), { yPercent: 115, duration: 1.15, ease: 'expo.out', stagger: .045, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('[data-fade]').forEach(function (el) {
      gsap.from(el, { y: 44, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
    });

    /* counters */
    gsap.utils.toArray('.stat b').forEach(function (b) {
      var end = +b.dataset.n, suf = b.dataset.s || '', o = { v: 0 };
      b.textContent = '0' + suf;
      gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: b, start: 'top 92%' }, onUpdate: function () { b.textContent = Math.round(o.v) + suf; } });
    });

    /* stacked project cards */
    var cards = gsap.utils.toArray('.card');
    var navH = nav.offsetHeight;
    cards.forEach(function (card, i) {
      var inner = card.querySelector('.card-inner');
      if (i < cards.length - 1) {
        var endTop = navH + 12 + (i + 1) * 14;
        var st = { trigger: cards[i + 1], start: 'top bottom', end: 'top ' + endTop + 'px', scrub: true };
        gsap.to(inner, { scale: .9, ease: 'none', scrollTrigger: st });
        gsap.to(card.querySelector('.card-shade'), { opacity: .6, ease: 'none', scrollTrigger: st });
      }
      gsap.fromTo(card.querySelector('.cv'), { y: 70 }, { y: -40, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from(card.querySelectorAll('.card-info > div > *'), { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: .06, scrollTrigger: { trigger: card, start: 'top 75%' } });
    });

    /* process: horizontal pin on large screens */
    mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', function () {
      var track = app.querySelector('.process-track');
      var dist = function () { return Math.max(0, track.scrollWidth - track.parentElement.clientWidth); };
      gsap.to(track, {
        x: function () { return rtl ? dist() : -dist(); }, ease: 'none',
        scrollTrigger: { trigger: '.process', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true }
      });
    });

    /* contact heading accent on last word */
    var lastW = app.querySelectorAll('.contact-h .w');
    if (lastW.length) lastW[lastW.length - 1].classList.add('accent');
  }

  /* ---------- cursor (once) ---------- */
  function initCursor() {
    if (!fine || reduce) return;
    document.documentElement.classList.add('has-cursor');
    var c = document.createElement('div');
    c.className = 'cursor';
    c.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"><span></span></div>';
    document.body.appendChild(c);
    var dot = c.querySelector('.cursor-dot'), ring = c.querySelector('.cursor-ring'), label = ring.querySelector('span');
    var dx = gsap.quickTo(dot, 'x', { duration: .08 }), dy = gsap.quickTo(dot, 'y', { duration: .08 });
    var rx = gsap.quickTo(ring, 'x', { duration: .5, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .5, ease: 'power3' });
    window.addEventListener('pointermove', function (e) { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); c.style.opacity = '1'; });
    document.documentElement.addEventListener('pointerleave', function () { c.style.opacity = '0'; });
    document.addEventListener('pointerover', function (e) {
      var locked = document.documentElement.classList.contains('pv-lock');
      var v = !locked && e.target.closest('[data-proj]');
      var l = e.target.closest('a, button, [data-mag], .pv-shot');
      c.classList.toggle('is-view', !!v);
      c.classList.toggle('is-link', !v && !!l);
      label.textContent = S.lang() === 'en' ? 'View' : 'عرض';
    });
  }

  /* ---------- mount ---------- */
  function mount(first) {
    if (mm) { mm.revert(); mm = null; }
    if (ctx) ctx.revert();
    setMenu(false);
    app.innerHTML = (first && !reduce ? loaderTpl() : '') + tpl();
    document.title = S.tr().brand + ' — ' + S.tr().role;
    bindUI();
    ctx = gsap.context(function () { motion(first); }, app);
    ST.refresh();
    window.dispatchEvent(new Event('page:render'));
  }

  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: .1 });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  window.addEventListener('pv:open', function () { if (lenis) lenis.stop(); });
  window.addEventListener('pv:close', function () { if (lenis) lenis.start(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  initCursor();
  mount(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
  window.addEventListener('load', function () { ST.refresh(); });
})();

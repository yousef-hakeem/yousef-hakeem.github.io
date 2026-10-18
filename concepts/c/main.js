/* Concept C — Immersive Showcase */
(function () {
  'use strict';
  var S = window.SITE, gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var app = document.getElementById('app');
  var esc = S.esc, W = function (x) { return S.words(x, 'w'); };
  var lenis = null, ctx = null, mm = null, clock = null, menuOpen = false;
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var L = {
    ar: { workH: 'كل مشروع قصة — من المشكلة إلى الشاشة.', aboutH: 'تصميم يبدأ من الإنسان.', processH: 'أربع خطوات، تجربة واحدة واضحة.', expH: 'أدوات ومهارات أعمل بها.' },
    en: { workH: 'Every project is a story — from problem to screen.', aboutH: 'Design that starts with people.', processH: 'Four steps, one clear experience.', expH: 'The tools and skills I work with.' }
  };
  // Aurora palettes per project (c1, c2, c3); default = brand.
  var BRAND = ['#2f8f77', '#4b3bd6', '#0f5bd8'];
  var PAL = {
    studybuddy: ['#6d5bd0', '#3b2fa8', '#2a6bf0'], qurrat: ['#1d6b5f', '#b08a35', '#0f5b4f'],
    nusuk: ['#b08a35', '#3a2d12', '#6b5a2a'], mister: ['#4f6ff0', '#7b5cff', '#2aa8f0'],
    thoby: ['#555b66', '#2b2f36', '#7a808a'], mindwell: ['#1f6b6e', '#2f8f77', '#155a7a']
  };

  function setLang(l) { document.documentElement.lang = l; document.documentElement.dir = S.t[l].dir; try { localStorage.setItem('yh-lang', l); } catch (e) {} }
  var saved = null; try { saved = localStorage.getItem('yh-lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'ar');

  // Floating screens around the hero: [project, image index, left%, top%, width(vw), depth]
  var FLOAT = [
    ['studybuddy', 4, 1.5, 13, 16, .9], ['mister', 6, 84, 9, 8.5, .6], ['qurrat', 2, 75, 70, 17, 1],
    ['mindwell', 2, 4, 62, 7.5, .5], ['nusuk', 2, 85.5, 40, 11.5, .35], ['thoby', 3, 18, 79, 6.5, .3]
  ];

  function tpl() {
    var t = S.tr(), l = L[S.lang()];
    var ids = ['about', 'work', 'process', 'contact'];
    var links = ids.map(function (id) { return '<a href="#' + id + '" data-scroll="' + id + '">' + esc(t.nav[id]) + '</a>'; }).join('');
    var floaters = FLOAT.map(function (f, i) {
      var im = S.img(f[0], f[1]);
      return '<div class="fl" data-proj="' + f[0] + '" data-depth="' + f[5] + '" style="left:' + f[2] + '%;top:' + f[3] + '%;width:' + f[4] + 'vw;aspect-ratio:' + im.w + '/' + im.h + ';filter:brightness(' + (0.5 + f[5] * 0.5).toFixed(2) + ')"><img src="' + S.url(im.sm) + '" alt="" loading="' + (i < 3 ? 'eager' : 'lazy') + '"></div>';
    }).join('');
    var visuals = S.order.map(function (id, i) {
      return '<div class="sc-visual" data-i="' + i + '" style="--c:' + S.meta[id].accent + '">' + S.cover(id) + '</div>';
    }).join('');
    var dots = S.order.map(function () { return '<i></i>'; }).join('');
    var items = S.order.map(function (id, i) {
      var p = t.P[id];
      return '<article class="sc-item" data-proj="' + id + '" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(p.title) + '" style="--c:' + S.meta[id].accent + '">' +
        '<div class="sc-inline">' + S.cover(id) + '</div><div class="sc-body">' +
        '<span class="sc-n">' + pad(i + 1) + ' — ' + pad(S.order.length) + (id === 'studybuddy' ? ' · ★ ' + esc(t.featured) : '') + '</span>' +
        '<p class="sc-tag">' + esc(p.tag) + '</p><h3 class="kufi">' + esc(p.title) + '</h3><p class="sc-sub">' + esc(p.sub) + '</p>' +
        '<p class="sc-desc">' + esc(p.desc) + '</p>' +
        '<span class="sc-btn glass">' + esc(t.viewCase) + ' <small>' + window.MEDIA[id].length + '</small><i>' + ARROW + '</i></span></div></article>';
    }).join('');
    var stats = t.stats.map(function (s) {
      var n = parseInt(s[0], 10), suf = s[0].replace(/^\d+/, '');
      return '<div class="tile t-stat glass spot" data-tilt><b class="grad" data-n="' + n + '" data-s="' + suf + '">' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>';
    });
    var facts = t.facts.map(function (f) { return '<li><span>' + esc(f[0]) + '</span><strong>' + esc(f[1]) + '</strong></li>'; }).join('');
    var tools = t.tools.concat(t.tools).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
    var steps = t.process.map(function (s) {
      return '<div class="step glass spot" data-tilt><div class="step-ring"><svg viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="28"/><circle class="fg" cx="32" cy="32" r="28"/></svg><b>' + s.n + '</b></div>' +
        '<div><h3 class="kufi">' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p></div></div>';
    }).join('');
    var exp = t.expertise.map(function (g) { return '<div class="exp-col glass spot" data-fade><h3 class="kufi">' + esc(g.h) + '</h3><ul>' + g.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>'; }).join('');
    var tl = t.timeline.map(function (e, i) { return '<div class="tl-item"><b>' + pad(i + 1) + '</b><div><h3>' + esc(e.title) + '</h3><small>' + esc(e.org) + '</small></div><p>' + esc(e.desc) + '</p></div>'; }).join('');

    return '' +
      '<div class="aurora" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i><div class="aurora-grid"></div><div class="aurora-vignette"></div></div>' +
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cf2c8"/><stop offset="1" stop-color="#8b7bff"/></linearGradient></defs></svg>' +
      '<header class="nav glass"><a class="logo" href="#top" data-scroll="top"><i>YH</i><span>' + esc(t.brand) + '</span></a><nav class="nav-links">' + links + '</nav>' +
        '<div class="nav-actions"><button class="gbtn lang" type="button" aria-label="Language">' + t.langBtn + '</button><a class="gbtn gbtn-grad" href="#contact" data-scroll="contact">' + esc(t.nav.contact) + '</a>' +
        '<button class="gbtn menu-btn" type="button">' + esc(t.menu) + '</button></div></header>' +
      '<div class="menu"><nav class="menu-links">' + links + '</nav><div class="menu-foot"><a class="gbtn" href="mailto:' + S.email + '">' + esc(t.emailLbl) + '</a>' +
        '<a class="gbtn" href="' + S.whatsapp + '" target="_blank" rel="noopener">' + esc(t.whatsapp) + '</a><a class="gbtn" href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' PDF</a></div></div>' +

      '<main>' +
      '<section class="hero" id="top" data-fab-hide><div class="floaters">' + floaters + '</div>' +
        '<div class="hero-inner"><span class="avail glass"><i></i>' + esc(t.available) + '</span>' +
          '<h1 class="hero-name kufi" aria-label="' + esc(t.fullName) + '"><span class="line"><span>' + esc(t.firstName) + ' <span class="grad">' + esc(t.lastName) + '</span></span></span></h1>' +
          '<p class="hero-role">' + esc(t.role) + ' <span>· ' + esc(t.roleSub) + '</span></p>' +
          '<p class="hero-intro">' + esc(t.intro) + '</p>' +
          '<div class="hero-cta"><a class="cta cta-grad" href="#work" data-scroll="work">' + esc(t.ctaWork) + ARROW.replace('M5 12h14M13 6l6 6-6 6', 'M12 5v14M6 13l6 6 6-6') + '</a>' +
          '<a class="cta glass" href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' <small>PDF</small></a></div></div>' +
        '<span class="scroll-hint" aria-hidden="true"></span>' +
      '</section>' +

      '<section class="showcase" id="work"><div class="sc-head"><span class="eyebrow glass"><b>02</b>' + esc(t.workLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.workH) + '</h2></div>' +
        '<div class="sc-wrap"><div class="sc-sticky"><div class="sc-stage glass">' + visuals + '</div><div class="sc-dots">' + dots + '</div></div>' +
        '<div class="sc-list">' + items + '</div></div></section>' +

      '<section id="about"><div class="sc-head"><span class="eyebrow glass"><b>01</b>' + esc(t.aboutLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.aboutH) + '</h2></div>' +
        '<div class="bento">' +
          '<div class="tile t-statement glass spot" data-tilt><p>' + esc(t.statement) + '</p><small>' + esc(t.aboutP) + '</small></div>' +
          stats[0] + stats[1] +
          '<div class="tile t-facts glass spot" data-tilt><ul>' + facts + '</ul></div>' +
          '<div class="tile t-quote glass spot" data-tilt><p class="kufi">' + esc(t.quote) + '</p></div>' +
          '<div class="tile t-tools glass"><div class="tools-row">' + tools + '</div></div>' +
        '</div></section>' +

      '<section id="process"><div class="sc-head"><span class="eyebrow glass"><b>03</b>' + esc(t.processLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.processH) + '</h2></div>' +
        '<div class="steps">' + steps + '</div></section>' +

      '<section id="expertise"><div class="sc-head"><span class="eyebrow glass"><b>04</b>' + esc(t.expertiseLabel) + '</span><h2 class="h2 kufi" data-reveal>' + W(l.expH) + '</h2></div>' +
        '<div class="exp">' + exp + '</div><div class="tl glass" data-fade>' + tl + '</div></section>' +

      '<section id="contact" data-fab-hide><div class="contact-card glass"><span class="eyebrow glass"><b>05</b>' + esc(t.contactLabel) + '</span>' +
        '<h2 class="contact-h kufi" data-reveal>' + W(t.contactH) + '</h2><p class="contact-p">' + esc(t.contactP) + '</p>' +
        '<a class="mail grad" href="mailto:' + S.email + '">' + S.email + '</a>' +
        '<div class="c-grid">' +
          '<a class="c-item glass" href="tel:' + S.phone + '"><span>' + esc(t.call) + '</span><strong>' + S.phoneDisplay + '</strong></a>' +
          '<a class="c-item glass" href="' + S.whatsapp + '" target="_blank" rel="noopener"><span>' + esc(t.whatsapp) + '</span><strong>WhatsApp ↗</strong></a>' +
          '<a class="c-item glass" href="' + S.linkedin + '" target="_blank" rel="noopener"><span>' + esc(t.linkedin) + '</span><strong>LinkedIn ↗</strong></a>' +
          '<a class="c-item glass" href="' + S.url(S.cv) + '" target="_blank" rel="noopener"><span>PDF</span><strong>' + esc(t.ctaCV) + ' ↓</strong></a>' +
        '</div></div>' +
        '<div class="footer"><span>' + esc(t.footer) + '</span><span>' + esc(t.localTime) + ' · <span class="clock" dir="ltr">--:--</span></span><button type="button" class="to-top">' + esc(t.backTop) + ' ↑</button></div>' +
      '</section>' +
      '</main>';
  }

  function scrollToId(id) {
    var el = id === 'top' ? 0 : document.getElementById(id);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.5, offset: id === 'top' ? 0 : -20 });
    else window.scrollTo({ top: el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: reduce ? 'auto' : 'smooth' });
  }
  function setMenu(on) { menuOpen = on; document.documentElement.classList.toggle('menu-open', on); if (lenis) { if (on) lenis.stop(); else lenis.start(); } }

  function setPalette(id, instant) {
    var c = (id && PAL[id]) || BRAND, r = document.documentElement;
    gsap.to(r, { '--c1': c[0], '--c2': c[1], '--c3': c[2], duration: instant ? 0 : 1.4, ease: 'power2.out', overwrite: 'auto' });
  }

  function bindUI() {
    app.querySelectorAll('[data-scroll]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); setMenu(false); scrollToId(a.getAttribute('data-scroll')); }); });
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

    if (fine && !reduce) {
      // spotlight + tilt on glass tiles
      app.querySelectorAll('.spot').forEach(function (el) {
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          el.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
      });
      app.querySelectorAll('[data-tilt]').forEach(function (el) {
        var rx = gsap.quickTo(el, 'rotationX', { duration: .6, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: .6, ease: 'power3' });
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - .5) * 10);
          rx(-((e.clientY - r.top) / r.height - .5) * 10);
        });
        el.addEventListener('pointerleave', function () { rx(0); ry(0); });
      });
      // floaters react to the cursor by depth
      var fls = gsap.utils.toArray(app.querySelectorAll('.fl'));
      var movers = fls.map(function (f) { return { d: +f.dataset.depth, x: gsap.quickTo(f, 'x', { duration: 1.2, ease: 'power3' }), y: gsap.quickTo(f, 'y', { duration: 1.2, ease: 'power3' }) }; });
      app.querySelector('.hero').addEventListener('pointermove', function (e) {
        var cx = e.clientX / innerWidth - .5, cy = e.clientY / innerHeight - .5;
        movers.forEach(function (m) { m.x(cx * -60 * m.d); m.y(cy * -40 * m.d); });
      });
    }
  }

  function motion(first) {
    var nav = app.querySelector('.nav');
    ST.create({ start: 0, end: 'max', onUpdate: function (s) { nav.classList.toggle('is-hidden', s.direction === 1 && s.scroll() > innerHeight * .7 && !menuOpen); } });
    ['about', 'work', 'process', 'contact'].forEach(function (id) {
      ST.create({ trigger: '#' + id, start: 'top 50%', end: 'bottom 50%', onToggle: function (s) { if (s.isActive) app.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-scroll') === id); }); } });
    });

    /* showcase: sticky visual follows the active story block */
    var items = gsap.utils.toArray('.sc-item'), visuals = gsap.utils.toArray('.sc-visual'), dots = gsap.utils.toArray('.sc-dots i');
    var active = -1;
    function activate(i) {
      if (i === active) return;
      active = i;
      items.forEach(function (it, k) { it.classList.toggle('is-active', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
      visuals.forEach(function (v, k) {
        if (reduce) { gsap.set(v, { autoAlpha: k === i ? 1 : 0 }); return; }
        if (k === i) gsap.fromTo(v, { autoAlpha: 0, scale: .9, rotationX: 8 }, { autoAlpha: 1, scale: 1, rotationX: 0, duration: .9, ease: 'expo.out', overwrite: true });
        else gsap.to(v, { autoAlpha: 0, scale: 1.04, duration: .5, ease: 'power2.out', overwrite: true });
      });
      setPalette(S.order[i]);
    }
    items.forEach(function (it, i) {
      ST.create({ trigger: it, start: 'top 55%', end: 'bottom 45%', onToggle: function (s) { if (s.isActive) activate(i); } });
    });
    ST.create({ trigger: '.showcase', start: 'top 60%', end: 'bottom 40%', onLeave: function () { setPalette(null); }, onLeaveBack: function () { setPalette(null); active = -1; } });
    activate(0);
    setPalette(null, true);

    if (reduce) return;

    /* intro */
    var tl = gsap.timeline({ delay: first ? .15 : 0 });
    tl.from('.avail', { y: 20, opacity: 0, duration: .9, ease: 'power3.out' })
      .from('.hero-name .line > span', { yPercent: 110, duration: 1.3, ease: 'expo.out' }, .1)
      .from('.hero-role, .hero-intro, .hero-cta', { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08 }, .35)
      .from('.fl', { opacity: 0, scale: .6, z: -300, duration: 1.6, ease: 'expo.out', stagger: .07 }, .2);

    /* floaters drift on scroll by depth */
    gsap.utils.toArray('.fl').forEach(function (f) {
      var d = +f.dataset.depth;
      gsap.to(f, { yPercent: -120 * d, rotation: (d - .6) * 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });
    gsap.to('.hero-inner', { y: 120, opacity: 0, scale: .94, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '80% top', scrub: true } });

    /* reveals */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el.querySelectorAll('.w > span'), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .04, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('[data-fade], .tile, .sc-item .sc-body, .sc-item .sc-inline').forEach(function (el) {
      gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    gsap.utils.toArray('.t-stat b').forEach(function (b) {
      var end = +b.dataset.n, suf = b.dataset.s || '', o = { v: 0 };
      b.textContent = '0' + suf;
      gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: b, start: 'top 92%' }, onUpdate: function () { b.textContent = Math.round(o.v) + suf; } });
    });
    var row = app.querySelector('.tools-row');
    var loop = gsap.to(row, { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
    gsap.utils.toArray('.step').forEach(function (s, i) {
      gsap.to(s.querySelector('.fg'), { strokeDashoffset: 176 - 176 * (i + 1) / 4, duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: s, start: 'top 85%' } });
      gsap.from(s, { y: 60, opacity: 0, duration: 1, delay: i * .08, ease: 'power3.out', scrollTrigger: { trigger: '.steps', start: 'top 85%' } });
    });
    gsap.from('.contact-card', { scale: .9, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.contact-card', start: 'top bottom', end: 'top 35%', scrub: true } });
    loop.play();
  }

  function mount(first) {
    if (mm) { mm.revert(); mm = null; }
    if (ctx) ctx.revert();
    setMenu(false);
    app.innerHTML = tpl();
    document.title = S.tr().brand + ' — ' + S.tr().role;
    bindUI();
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

  mount(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
  window.addEventListener('load', function () { ST.refresh(); });
})();

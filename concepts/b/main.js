/* Concept B — Editorial Motion (light) */
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
  var L = {
    ar: { role: 'الدور', status: 'الحالة', uni: 'الجامعة', uniV: 'جامعة أم القرى', hint: 'اضغط أي مشروع لتصفّح شاشاته كاملة.', scroll: 'SCROLL · TO · EXPLORE · ' },
    en: { role: 'Role', status: 'Status', uni: 'University', uniV: 'Umm Al-Qura University', hint: 'Tap any project to browse every screen.', scroll: 'SCROLL · TO · EXPLORE · ' }
  };
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';

  function setLang(l) { document.documentElement.lang = l; document.documentElement.dir = S.t[l].dir; try { localStorage.setItem('yh-lang', l); } catch (e) {} }
  var saved = null; try { saved = localStorage.getItem('yh-lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'ar');

  function coverImg(id, big) {
    var im = S.img(id, S.meta[id].cover[S.lang()][0]);
    return '<img src="' + S.url(big ? im.src : im.sm) + '" width="' + im.w + '" height="' + im.h + '" alt="" loading="lazy" decoding="async">';
  }

  function tpl(first) {
    var t = S.tr(), l = L[S.lang()];
    var ids = ['about', 'work', 'process', 'contact'];
    var links = ids.map(function (id) { return '<a href="#' + id + '" data-scroll="' + id + '">' + esc(t.nav[id]) + '</a>'; }).join('');
    var mlinks = ids.map(function (id, i) { return '<a href="#' + id + '" data-scroll="' + id + '">' + esc(t.nav[id]) + '<small>' + pad(i + 1) + '</small></a>'; }).join('');
    var band = t.marquee.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('');
    var rows = S.order.filter(function (id) { return id !== 'studybuddy'; }).map(function (id, i) {
      var p = t.P[id], im = S.img(id, S.meta[id].cover[S.lang()][0]);
      return '<div class="row" data-proj="' + id + '" data-img="' + S.url(im.sm) + '" tabindex="0" role="button" aria-label="' + esc(p.title) + '">' +
        '<span class="row-n">' + pad(i + 2) + '</span><h3>' + esc(p.title) + '</h3>' +
        '<div class="row-meta"><b>' + esc(p.sub) + '</b>' + esc(p.tag) + '</div>' +
        '<span class="row-go">' + ARROW + '</span>' +
        '<div class="row-img">' + coverImg(id) + '</div></div>';
    }).join('');
    var sb = t.P.studybuddy;
    var steps = t.process.map(function (s) { return '<div class="step"><div class="step-dot">' + s.n + '</div><h3>' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p></div>'; }).join('');
    var acc = t.expertise.map(function (g, i) {
      return '<div class="acc-item' + (i === 0 ? ' is-open' : '') + '"><button type="button" aria-expanded="' + (i === 0) + '">' + esc(g.h) + '<i></i></button>' +
        '<div class="acc-body"' + (i === 0 ? ' style="height:auto"' : '') + '><ul>' + g.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div></div>';
    }).join('');
    var tl = t.timeline.map(function (e) { return '<div class="tl-item" data-fade><div><h3>' + esc(e.title) + '</h3><small>' + esc(e.org) + '</small></div><p>' + esc(e.desc) + '</p></div>'; }).join('');
    var facts = t.facts.map(function (f) { return '<div><span>' + esc(f[0]) + '</span><strong>' + esc(f[1]) + '</strong></div>'; }).join('');

    return '' +
      (first && !reduce ? '<div class="curtain" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="curtain-mark" aria-hidden="true">' + esc(t.brand) + '</div>' : '') +
      '<header class="nav"><a class="logo" href="#top" data-scroll="top"><i>YH</i><span>' + esc(t.brand) + '</span></a>' +
        '<nav class="nav-links">' + links + '</nav>' +
        '<div class="nav-actions"><button class="pill lang" type="button" aria-label="Language">' + t.langBtn + '</button>' +
        '<a class="pill pill-solid" href="#contact" data-scroll="contact">' + esc(t.nav.contact) + '</a>' +
        '<button class="pill menu-btn" type="button">' + esc(t.menu) + '</button></div></header>' +
      '<div class="menu"><nav class="menu-links">' + mlinks + '</nav><div class="menu-foot">' +
        '<a class="pill" href="mailto:' + S.email + '">' + esc(t.emailLbl) + '</a><a class="pill" href="' + S.whatsapp + '" target="_blank" rel="noopener">' + esc(t.whatsapp) + '</a>' +
        '<a class="pill" href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' PDF</a></div></div>' +
      '<div class="preview" aria-hidden="true"><img alt=""></div>' +

      '<main>' +
      '<section class="hero" id="top" data-fab-hide>' +
        '<div class="hero-meta"><div><span>' + esc(l.role) + '</span>' + esc(t.role) + '</div><div><span>' + esc(l.status) + '</span><i class="dot"></i>' + esc(t.available) + '</div><div><span>' + esc(l.uni) + '</span>' + esc(l.uniV) + '</div></div>' +
        '<div class="rule"></div>' +
        '<h1 class="hero-name display" aria-label="' + esc(t.fullName) + '"><span class="line"><span>' + esc(t.firstName) + ' <em>' + esc(t.lastName) + '</em></span></span></h1>' +
        '<div class="rule"></div>' +
        '<div class="hero-grid"><div class="hero-text"><p>' + esc(t.intro) + '</p><p class="sub">' + esc(t.roleSub) + '</p>' +
          '<div class="hero-cta"><a class="btn btn-ink" href="#work" data-scroll="work">' + esc(t.ctaWork) + DOWN + '</a>' +
          '<a class="btn" href="' + S.url(S.cv) + '" target="_blank" rel="noopener">' + esc(t.ctaCV) + ' <small>PDF</small></a></div></div>' +
          '<figure class="hero-figure" data-proj="studybuddy">' + coverImg('studybuddy', true) + '<figcaption><i>' + ARROW + '</i>' + esc(sb.title) + ' — ' + esc(t.featured) + '</figcaption></figure></div>' +
        '<div class="scroll-ind" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><path id="sc" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs><text><textPath href="#sc">' + l.scroll + '</textPath></text></svg></div>' +
      '</section>' +

      '<section class="band" aria-hidden="true"><div class="band-row">' + band + band + band + '</div></section>' +

      '<section class="about" id="about"><div class="about-side"><span class="kicker"><b>01</b>' + esc(t.aboutLabel) + '</span></div><div>' +
        '<p class="statement" data-reveal>' + W(t.statement) + '</p>' +
        '<p class="about-p" data-fade>' + esc(t.aboutP) + '</p>' +
        '<blockquote class="quote" data-fade><mark>' + esc(t.quote) + '</mark></blockquote>' +
        '<div class="facts" data-fade>' + facts + '</div>' +
      '</div></section>' +

      '<section class="work" id="work">' +
        '<div class="work-head"><div><span class="kicker"><b>02</b>' + esc(t.workLabel) + '</span><h2 class="h2" data-reveal>' + W(t.workH) + '</h2></div><p data-fade>' + esc(l.hint) + '</p></div>' +
        '<div class="feature" data-proj="studybuddy" tabindex="0" role="button" aria-label="' + esc(sb.title) + '"><div class="feature-img">' + coverImg('studybuddy', true) + '</div>' +
          '<div class="feature-info"><div><small>★ ' + esc(t.featured) + ' · 01</small><h3>' + esc(sb.title) + '</h3><p>' + esc(sb.sub) + ' — ' + window.MEDIA.studybuddy.length + ' ' + esc(t.screens) + '</p></div><span class="round">' + ARROW + '</span></div></div>' +
        '<div class="index">' + rows + '</div>' +
      '</section>' +

      '<section class="process" id="process"><span class="kicker"><b>03</b>' + esc(t.processLabel) + '</span><h2 class="h2" data-reveal>' + W(t.processH) + '</h2>' +
        '<div class="steps"><div class="steps-line"><i></i></div>' + steps + '</div></section>' +

      '<section class="expertise"><div class="exp-wrap"><div><span class="kicker"><b>04</b>' + esc(t.expertiseLabel) + '</span></div><div>' +
        '<div class="acc">' + acc + '</div>' +
        '<div class="tools" data-fade>' + t.tools.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>' +
        '<div class="tl"><span class="kicker"><b>05</b>' + esc(t.timelineLabel) + '</span><div style="margin-top:24px">' + tl + '</div></div>' +
      '</div></div></section>' +

      '<section class="contact" id="contact" data-fab-hide><span class="kicker"><b>06</b>' + esc(t.contactLabel) + '</span>' +
        '<h2 class="contact-h display" data-reveal>' + W(t.contactH) + '</h2><p class="contact-p">' + esc(t.contactP) + '</p>' +
        '<a class="mail" href="mailto:' + S.email + '">' + S.email + '</a>' +
        '<div class="links">' +
          '<a href="tel:' + S.phone + '"><span>' + esc(t.call) + '</span><em>' + S.phoneDisplay + '</em>' + ARROW + '</a>' +
          '<a href="' + S.whatsapp + '" target="_blank" rel="noopener"><span>' + esc(t.whatsapp) + '</span><em>wa.me/966590700541</em>' + ARROW + '</a>' +
          '<a href="' + S.linkedin + '" target="_blank" rel="noopener"><span>' + esc(t.linkedin) + '</span><em>LinkedIn</em>' + ARROW + '</a>' +
          '<a href="' + S.url(S.cv) + '" target="_blank" rel="noopener"><span>PDF</span><em>' + esc(t.ctaCV) + '</em>' + ARROW + '</a>' +
        '</div>' +
        '<div class="footer"><span>' + esc(t.footer) + '</span><span>' + esc(t.localTime) + ' · <span class="clock" dir="ltr">--:--</span></span><button type="button" class="to-top">' + esc(t.backTop) + ' ↑</button></div>' +
        '<div class="giant" aria-hidden="true">' + esc(t.brand) + '</div>' +
      '</section>' +
      '</main>';
  }

  function scrollToId(id) {
    var el = id === 'top' ? 0 : document.getElementById(id);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.5, offset: id === 'top' ? 0 : -10 });
    else window.scrollTo({ top: el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY, behavior: reduce ? 'auto' : 'smooth' });
  }
  function setMenu(on) { menuOpen = on; document.documentElement.classList.toggle('menu-open', on); if (lenis) { if (on) lenis.stop(); else lenis.start(); } }

  function bindUI() {
    app.querySelectorAll('[data-scroll]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); setMenu(false); scrollToId(a.getAttribute('data-scroll')); });
    });
    app.querySelector('.lang').addEventListener('click', function () {
      var y = window.scrollY;
      setLang(S.lang() === 'ar' ? 'en' : 'ar');
      mount(false);
      if (window.Viewer) window.Viewer.refresh();
      window.scrollTo(0, y); if (lenis) lenis.scrollTo(y, { immediate: true });
    });
    app.querySelector('.menu-btn').addEventListener('click', function () { setMenu(!menuOpen); });
    app.querySelector('.to-top').addEventListener('click', function () { scrollToId('top'); });
    app.querySelectorAll('.acc-item button').forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.parentElement, body = item.querySelector('.acc-body'), open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open);
        b.setAttribute('aria-expanded', open);
        if (reduce) { body.style.height = open ? 'auto' : '0'; return; }
        gsap.fromTo(body, { height: body.offsetHeight }, { height: open ? 'auto' : 0, duration: .6, ease: 'power3.inOut', onComplete: function () { ST.refresh(); } });
      });
    });
    var clockEl = app.querySelector('.clock');
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Riyadh' });
    clearInterval(clock);
    var tick = function () { clockEl.textContent = fmt.format(new Date()); };
    tick(); clock = setInterval(tick, 15000);

    if (fine && !reduce) {
      var pv = app.querySelector('.preview'), pimg = pv.querySelector('img');
      var px = gsap.quickTo(pv, 'x', { duration: .6, ease: 'power3' }), py = gsap.quickTo(pv, 'y', { duration: .6, ease: 'power3' });
      var lastX = 0;
      var rot = gsap.quickTo(pv, 'rotation', { duration: .6, ease: 'power3' });
      window.addEventListener('pointermove', function (e) { px(e.clientX); py(e.clientY); rot(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * .6)); lastX = e.clientX; });
      app.querySelectorAll('.row').forEach(function (r) {
        r.addEventListener('pointerenter', function () { pimg.src = r.dataset.img; gsap.to(pv, { opacity: 1, scale: 1, duration: .45, ease: 'power3.out', overwrite: 'auto' }); });
        r.addEventListener('pointerleave', function () { gsap.to(pv, { opacity: 0, scale: .6, duration: .35, ease: 'power3.in', overwrite: 'auto' }); });
      });
    }
  }

  function motion(first) {
    var rtl = document.documentElement.dir === 'rtl';
    var nav = app.querySelector('.nav');
    ST.create({ start: 0, end: 'max', onUpdate: function (s) { var y = s.scroll(); nav.classList.toggle('is-solid', y > 20); nav.classList.toggle('is-hidden', s.direction === 1 && y > innerHeight * .7 && !menuOpen); } });
    ['about', 'work', 'process', 'contact'].forEach(function (id) {
      ST.create({ trigger: '#' + id, start: 'top 50%', end: 'bottom 50%', onToggle: function (s) { if (s.isActive) app.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-scroll') === id); }); } });
    });
    if (reduce) return;

    var tl = gsap.timeline();
    if (first) {
      tl.from('.curtain-mark', { opacity: 0, y: 20, duration: .6, ease: 'power3.out' })
        .to('.curtain-mark', { opacity: 0, y: -20, duration: .5, ease: 'power3.in' }, '+=.35')
        .to('.curtain i', { scaleY: 0, duration: 1, ease: 'expo.inOut', stagger: .07 }, '-=.15')
        .set('.curtain, .curtain-mark', { display: 'none' });
    }
    var at = first ? 1.25 : 0;
    tl.from('.rule', { scaleX: 0, duration: 1.4, ease: 'expo.inOut', stagger: .1 }, at)
      .from('.hero-name .line > span', { yPercent: 115, duration: 1.3, ease: 'expo.out' }, at + .15)
      .from('.hero-meta > div', { y: 20, opacity: 0, duration: .9, ease: 'power3.out', stagger: .08 }, at + .3)
      .from('.hero-text > *', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08 }, at + .45)
      .fromTo('.hero-figure', { clipPath: 'inset(100% 0% 0% 0% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.4, ease: 'expo.inOut' }, at + .3)
      .from('.hero-figure img', { scale: 1.35, duration: 1.8, ease: 'expo.out' }, at + .5)
      .from('.hero-figure figcaption', { y: 20, opacity: 0, duration: .8, ease: 'power3.out' }, at + 1.3);

    gsap.to('.hero-figure img', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero-figure', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.to('.hero-name', { yPercent: 30, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    /* band */
    var row = app.querySelector('.band-row');
    var loop = gsap.to(row, { xPercent: -33.333, ease: 'none', duration: 26, repeat: -1 });
    loop.totalTime(loop.duration() * 50);
    ST.create({ trigger: '.band', start: 'top bottom', end: 'bottom top', onUpdate: function (s) {
      gsap.to(loop, { timeScale: s.direction * Math.min(1 + Math.abs(s.getVelocity()) / 400, 5), duration: .2, overwrite: true, onComplete: function () { gsap.to(loop, { timeScale: s.direction, duration: 1 }); } });
    } });

    /* text reveals */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el.querySelectorAll('.w > span'), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .025, scrollTrigger: { trigger: el, start: 'top 86%' } });
    });
    gsap.utils.toArray('[data-fade]').forEach(function (el) {
      gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    gsap.to('.quote mark', { backgroundSize: '100% 100%', ease: 'none', scrollTrigger: { trigger: '.quote', start: 'top 80%', end: 'bottom 55%', scrub: true } });

    /* feature + rows */
    gsap.fromTo('.feature', { clipPath: 'inset(8% 6% 8% 6% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', scrollTrigger: { trigger: '.feature', start: 'top bottom', end: 'top 25%', scrub: true } });
    gsap.fromTo('.feature-img img', { yPercent: -14 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.feature', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.utils.toArray('.row').forEach(function (r) {
      gsap.from(r.querySelectorAll('.row-n, h3, .row-meta, .row-go'), { y: 40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .05, scrollTrigger: { trigger: r, start: 'top 90%' } });
      var ri = r.querySelector('.row-img');
      if (getComputedStyle(ri).display !== 'none') {
        gsap.fromTo(ri, { clipPath: 'inset(0% 0% 100% 0% round 16px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: ri, start: 'top 88%' } });
        gsap.from(ri.querySelector('img'), { scale: 1.3, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: ri, start: 'top 88%' } });
      }
    });

    /* process line */
    var stepEls = gsap.utils.toArray('.step');
    gsap.to('.steps-line i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 60%', scrub: true,
      onUpdate: function (s) { stepEls.forEach(function (el, i) { el.classList.toggle('is-on', s.progress >= i / stepEls.length); }); } } });
    stepEls.forEach(function (el, i) {
      gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: (i % 4) * .06, scrollTrigger: { trigger: el, start: 'top 88%', onEnter: function () { el.classList.add('is-on'); } } });
    });

    /* contact block grows in */
    gsap.from('.contact', { scale: .92, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 30%', scrub: true } });
    gsap.from('.giant', { yPercent: 60, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.giant', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }

  function mount(first) {
    if (mm) { mm.revert(); mm = null; }
    if (ctx) ctx.revert();
    setMenu(false);
    app.innerHTML = tpl(first);
    document.title = S.tr().brand + ' — ' + S.tr().role;
    bindUI();
    ctx = gsap.context(function () { motion(first); }, app);
    ST.refresh();
    window.dispatchEvent(new Event('page:render'));
  }

  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: .09 });
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

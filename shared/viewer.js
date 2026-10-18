/* Project viewer + zoom. Any element with [data-proj="<id>"] opens that project.
   - Screens stack vertically (single column on phones), fade in as they enter.
   - Tap a screen: full-screen zoom with pinch, drag, double-tap, wheel, arrows and swipe.
   - Browser/phone Back closes zoom, then the project (history entries), deep links via #id.
   Emits window events "pv:open" / "pv:close" so pages can pause smooth scroll, hide the FAB, etc. */
(function () {
  var S = window.SITE;
  var ICON = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
  };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var esc = S.esc;
  var rtl = function () { return document.documentElement.dir === 'rtl'; };

  /* ---------------- Viewer ---------------- */
  var root, scroller, crumb, closeBtn, head, list, nextBtn, io;
  var current = null, lastFocus = null;

  function nextId(id) { var o = S.order; return o[(o.indexOf(id) + 1) % o.length]; }

  function build() {
    root = document.createElement('div');
    root.className = 'pv';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-hidden', 'true');
    root.setAttribute('data-lenis-prevent', ''); // let the sheet scroll natively under smooth-scroll libs
    root.innerHTML =
      '<div class="pv-backdrop"></div>' +
      '<div class="pv-sheet"><div class="pv-scroll" tabindex="-1">' +
        '<div class="pv-top"><div class="pv-crumb"></div><button class="pv-close" type="button">' + ICON.close + '<span></span></button></div>' +
        '<header class="pv-head"></header><div class="pv-list"></div><button class="pv-next" type="button"></button>' +
      '</div></div>';
    document.body.appendChild(root);
    scroller = root.querySelector('.pv-scroll');
    crumb = root.querySelector('.pv-crumb');
    closeBtn = root.querySelector('.pv-close');
    head = root.querySelector('.pv-head');
    list = root.querySelector('.pv-list');
    nextBtn = root.querySelector('.pv-next');

    closeBtn.addEventListener('click', requestClose);
    root.querySelector('.pv-backdrop').addEventListener('click', requestClose);
    nextBtn.addEventListener('click', function () {
      var n = nextId(current);
      render(n);
      history.replaceState({ pv: n }, '', '#' + n);
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    });
    list.addEventListener('click', function (e) {
      var f = e.target.closest('.pv-shot');
      if (f) Zoom.open(current, +f.dataset.i);
    });
  }

  function render(id) {
    current = id;
    var t = S.tr(), p = t.P[id], m = S.meta[id], imgs = window.MEDIA[id];
    var sizes = m.kind === 'web' ? '(max-width: 700px) 100vw, 1100px' : m.kind === 'watch' ? '(max-width: 700px) 100vw, 560px' : '(max-width: 700px) 100vw, 360px';
    crumb.innerHTML = '<b>' + pad(S.order.indexOf(id) + 1) + '</b> / ' + pad(S.order.length) + ' — ' + esc(p.title);
    closeBtn.querySelector('span').textContent = t.close;
    head.innerHTML =
      '<div class="pv-tag">' + esc(p.tag) + '</div>' +
      '<h2 class="pv-title">' + esc(p.title) + '</h2>' +
      '<p class="pv-sub">' + esc(p.sub) + '</p>' +
      '<p class="pv-desc">' + esc(p.desc) + '</p>' +
      '<span class="pv-count">' + imgs.length + ' ' + esc(t.screens) + '</span>';
    list.dataset.kind = m.kind;
    list.innerHTML = imgs.map(function (im, i) {
      // Tall (phone) screens inside a web project sit three to a row instead of filling the width.
      var tall = m.kind === 'web' && im.h > im.w * 1.1;
      return '<figure class="pv-shot' + (tall ? ' is-tall' : '') + '" data-i="' + i + '">' +
        '<img src="' + S.url(im.sm) + '" srcset="' + S.url(im.sm) + ' 760w, ' + S.url(im.src) + ' 1800w" sizes="' + (tall ? '(max-width: 700px) 100vw, 360px' : sizes) + '"' +
        ' width="' + im.w + '" height="' + im.h + '" alt="' + esc(p.title) + ' — ' + (i + 1) + '" loading="lazy" decoding="async">' +
        '<figcaption>' + pad(i + 1) + ' / ' + pad(imgs.length) + '</figcaption></figure>';
    }).join('');
    var n = nextId(id);
    nextBtn.innerHTML = '<span>' + esc(t.nextProject) + '</span><strong>' + esc(t.P[n].title) + ICON.arrow + '</strong>';
    observe();
  }

  function observe() {
    if (io) io.disconnect();
    var shots = list.querySelectorAll('.pv-shot');
    if (!('IntersectionObserver' in window)) { shots.forEach(function (s) { s.classList.add('in'); }); return; }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { root: scroller, rootMargin: '0px 0px -6% 0px' });
    shots.forEach(function (s) { io.observe(s); });
  }

  function open(id, fromHistory, opts) {
    if (!S.meta[id]) return;
    if (!root) build();
    lastFocus = document.activeElement;
    render(id);
    scroller.scrollTop = 0;
    if (opts && opts.screen > 0) {
      // Opened from a specific screen: land on it.
      var f = list.querySelector('.pv-shot[data-i="' + opts.screen + '"]');
      if (f) {
        f.classList.add('in');
        requestAnimationFrame(function () {
          scroller.scrollTop += f.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 84;
        });
      }
    }
    root.setAttribute('aria-hidden', 'false');
    root.classList.add('is-open');
    document.documentElement.classList.add('pv-lock');
    if (!fromHistory) history.pushState({ pv: id }, '', '#' + id);
    window.dispatchEvent(new CustomEvent('pv:open', { detail: { id: id } }));
    setTimeout(function () { if (current) closeBtn.focus({ preventScroll: true }); }, 450);
  }

  function requestClose() {
    if (history.state && history.state.pv) history.back(); else closeNow();
  }

  function closeNow() {
    if (!current) return;
    current = null;
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('pv-lock');
    window.dispatchEvent(new CustomEvent('pv:close'));
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  /* ---------------- Zoom ---------------- */
  var Zoom = (function () {
    var ov, img, cnt, hint, prevB, nextB, pid, idx = 0, isOpen = false;
    var vw, vh, fitW = 0, maxW = 0, ratio = 1;
    var pointers = new Map(), lastDist = 0, lastTap = 0;
    var downTarget = null, moved = false, sx = 0, sy = 0, pType = 'mouse';

    function build() {
      ov = document.createElement('div');
      ov.className = 'pz';
      ov.setAttribute('data-lenis-prevent', '');
      ov.innerHTML = '<img alt="">' +
        '<button class="pz-btn pz-close" type="button" aria-label="close">' + ICON.close + '</button>' +
        '<button class="pz-btn pz-prev" type="button" aria-label="previous"></button>' +
        '<button class="pz-btn pz-next" type="button" aria-label="next"></button>' +
        '<div class="pz-count"></div><div class="pz-hint"></div>';
      document.body.appendChild(ov);
      img = ov.querySelector('img');
      cnt = ov.querySelector('.pz-count');
      hint = ov.querySelector('.pz-hint');
      prevB = ov.querySelector('.pz-prev');
      nextB = ov.querySelector('.pz-next');
      ov.querySelector('.pz-close').addEventListener('click', requestClose);
      prevB.addEventListener('click', function () { go(-1); });
      nextB.addEventListener('click', function () { go(1); });
      img.addEventListener('load', layout);
      window.addEventListener('resize', function () { if (isOpen) layout(); });
      ov.addEventListener('wheel', function (e) {
        e.preventDefault();
        setWidth(img.offsetWidth * (e.deltaY < 0 ? 1.18 : 1 / 1.18), e.clientX, e.clientY);
      }, { passive: false });
      ov.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      ov.addEventListener('click', function (e) {
        if (pType === 'mouse' && e.target === ov && downTarget === ov && !moved) requestClose();
      });
    }

    function clampPos() {
      var w = img.offsetWidth, h = img.offsetHeight;
      var left = parseFloat(img.style.left) || 0, top = parseFloat(img.style.top) || 0;
      left = w <= vw ? (vw - w) / 2 : Math.min(0, Math.max(vw - w, left));
      top = h <= vh ? (vh - h) / 2 : Math.min(0, Math.max(vh - h, top));
      img.style.left = left + 'px';
      img.style.top = top + 'px';
    }
    function zoomed() { return img.offsetWidth > fitW + 1; }
    function setWidth(w, fx, fy) {
      var r = img.getBoundingClientRect();
      var nw = Math.max(fitW, Math.min(maxW, w));
      var px = r.width ? (fx - r.left) / r.width : 0.5;
      var py = r.height ? (fy - r.top) / r.height : 0.5;
      img.style.width = nw + 'px';
      img.style.left = (fx - px * nw) + 'px';
      img.style.top = (fy - py * (nw / ratio)) + 'px';
      clampPos();
      img.style.cursor = zoomed() ? 'grab' : 'zoom-in';
    }
    function fit() { img.style.width = fitW + 'px'; img.style.height = 'auto'; clampPos(); img.style.cursor = 'zoom-in'; }
    function layout() {
      vw = window.innerWidth; vh = window.innerHeight;
      var nw = img.naturalWidth || 1200, nh = img.naturalHeight || 800;
      ratio = nw / nh;
      var s = Math.min((vw * 0.94) / nw, (vh * 0.86) / nh);
      fitW = nw * s;
      maxW = Math.max(fitW * 5, nw * 1.6);
      fit();
    }
    function show() {
      var list = window.MEDIA[pid], im = list[idx];
      img.style.width = '0px';
      img.src = S.url(im.src);
      if (img.complete && img.naturalWidth) layout();
      cnt.textContent = pad(idx + 1) + ' / ' + pad(list.length);
    }
    function go(d) {
      var n = window.MEDIA[pid].length;
      idx = (idx + d + n) % n;
      show();
    }
    function placeArrows() {
      // In RTL "next" sits on the left and points left.
      var r = rtl();
      prevB.innerHTML = r ? ICON.right : ICON.left;
      nextB.innerHTML = r ? ICON.left : ICON.right;
      prevB.style.left = r ? 'auto' : '14px'; prevB.style.right = r ? '14px' : 'auto';
      nextB.style.left = r ? '14px' : 'auto'; nextB.style.right = r ? 'auto' : '14px';
    }

    function onDown(e) {
      if (e.target.closest('.pz-btn')) return;
      downTarget = e.target; moved = false; sx = e.clientX; sy = e.clientY; pType = e.pointerType;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        var a = Array.from(pointers.values());
        lastDist = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      } else if (pointers.size === 1) {
        var now = Date.now();
        if (now - lastTap < 300) {
          if (zoomed()) fit(); else setWidth(fitW * 2.4, e.clientX, e.clientY);
          lastTap = 0;
        } else lastTap = now;
      }
    }
    function onMove(e) {
      if (!isOpen) return;
      var p = pointers.get(e.pointerId);
      if (!p) return;
      var px = p.x, py = p.y;
      p.x = e.clientX; p.y = e.clientY;
      if (Math.hypot(e.clientX - sx, e.clientY - sy) > 6) moved = true;
      if (pointers.size === 2) {
        var a = Array.from(pointers.values());
        var d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
        if (lastDist) setWidth(img.offsetWidth * (d / lastDist), (a[0].x + a[1].x) / 2, (a[0].y + a[1].y) / 2);
        lastDist = d;
      } else if (pointers.size === 1 && zoomed()) {
        img.style.left = (parseFloat(img.style.left) + (p.x - px)) + 'px';
        img.style.top = (parseFloat(img.style.top) + (p.y - py)) + 'px';
        clampPos();
      }
    }
    function onUp(e) {
      if (!pointers.has(e.pointerId)) return;
      var wasSingle = pointers.size === 1;
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastDist = 0;
      // Swipe between screens when not zoomed in.
      if (isOpen && wasSingle && !zoomed()) {
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go((dx < 0) !== rtl() ? 1 : -1);
      }
    }

    function open(id, i) {
      if (!ov) build();
      pid = id; idx = i; isOpen = true;
      placeArrows();
      ov.classList.add('is-open');
      show();
      history.pushState({ pv: id, z: 1 }, '', '#' + id);
      hint.textContent = S.tr().zoomHint;
      hint.style.opacity = '1';
      clearTimeout(open.t);
      open.t = setTimeout(function () { hint.style.opacity = '0'; }, 2600);
    }
    function requestClose() {
      if (history.state && history.state.z) history.back(); else closeNow();
    }
    function closeNow() {
      if (!isOpen) return;
      isOpen = false;
      ov.classList.remove('is-open');
      img.removeAttribute('src');
      pointers.clear();
    }
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') requestClose();
      if (e.key === 'ArrowRight') go(rtl() ? -1 : 1);
      if (e.key === 'ArrowLeft') go(rtl() ? 1 : -1);
    });
    return { open: open, closeNow: closeNow, isOpen: function () { return isOpen; } };
  })();

  /* ---------------- Wiring ---------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-proj]');
    if (!el) return;
    e.preventDefault();
    open(el.getAttribute('data-proj'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && current && !Zoom.isOpen()) requestClose();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-proj]:not(a):not(button)')) {
      e.preventDefault();
      open(e.target.getAttribute('data-proj'));
    }
  });
  window.addEventListener('popstate', function (e) {
    var st = e.state || {};
    if (Zoom.isOpen() && !st.z) Zoom.closeNow();
    if (current && !st.pv) closeNow();
    else if (!current && st.pv) open(st.pv, true);
  });
  window.addEventListener('load', function () {
    var h = location.hash.slice(1);
    if (h && S.meta[h]) {
      history.replaceState(null, '', location.pathname + location.search);
      open(h);
    }
  });

  window.Viewer = {
    open: function (id, opts) { open(id, false, opts); },
    close: requestClose,
    isOpen: function () { return !!current; },
    refresh: function () { if (current) render(current); }
  };
})();

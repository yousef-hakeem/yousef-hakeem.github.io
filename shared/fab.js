/* Floating contact button: call + WhatsApp. Follows the page direction and hides while a project is open. */
(function () {
  var S = window.SITE;
  var PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  var X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var WA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.8c2.17 0 4.2.84 5.74 2.38a8.06 8.06 0 0 1 2.38 5.73c0 4.48-3.65 8.12-8.13 8.12a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.24-4.29c0-4.47 3.65-8.12 8.13-8.12zm4.6 10.14c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24a7.6 7.6 0 0 1-1.4-1.74c-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.78 2.72 4.3 3.81.6.26 1.07.42 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29z"/></svg>';

  var el = document.createElement('div');
  el.className = 'fab';
  el.innerHTML =
    '<div class="fab-panel" role="dialog">' +
      '<div class="fab-title"></div>' +
      '<a class="fab-num" href="tel:' + S.phone + '" dir="ltr">' + S.phoneDisplay + '</a>' +
      '<div class="fab-actions">' +
        '<a class="fab-call" href="tel:' + S.phone + '">' + PHONE + '<span data-k="call"></span></a>' +
        '<a class="fab-wa" href="' + S.whatsapp + '" target="_blank" rel="noopener">' + WA + '<span data-k="whatsapp"></span></a>' +
      '</div>' +
    '</div>' +
    '<button class="fab-btn" type="button" aria-expanded="false"><span class="i-phone">' + PHONE + '</span><span class="i-x">' + X + '</span></button>';
  document.body.appendChild(el);
  var btn = el.querySelector('.fab-btn');

  function sync() {
    var t = S.tr(), r = document.documentElement.dir === 'rtl';
    el.classList.toggle('is-right', r);
    el.classList.toggle('is-left', !r);
    el.querySelector('.fab-title').textContent = t.fabTitle;
    el.querySelectorAll('[data-k]').forEach(function (s) { s.textContent = t[s.getAttribute('data-k')]; });
    btn.setAttribute('aria-label', t.fabTitle);
  }
  function setOpen(on) { el.classList.toggle('is-open', on); btn.setAttribute('aria-expanded', on ? 'true' : 'false'); }

  btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!el.classList.contains('is-open')); });
  document.addEventListener('click', function (e) { if (!el.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('pv:open', function () { setOpen(false); el.classList.add('is-hidden'); });
  window.addEventListener('pv:close', function () { el.classList.remove('is-hidden'); });
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['dir', 'lang'] });
  sync();

  // Pages mark sections that already show contact details (hero CTAs, contact block) with
  // [data-fab-hide]; the button steps aside while one of them crosses the middle of the screen.
  var io = null, inZone = new Set();
  function watch() {
    if (!('IntersectionObserver' in window)) return;
    if (io) io.disconnect();
    inZone.clear();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) inZone.add(e.target); else inZone.delete(e.target); });
      el.classList.toggle('is-away', inZone.size > 0);
      if (inZone.size) setOpen(false);
    }, { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll('[data-fab-hide]').forEach(function (n) { io.observe(n); });
  }
  window.addEventListener('page:render', watch);
  watch();
})();

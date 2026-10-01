/* Antarshanti shared script: attribution, analytics events, WhatsApp tagging,
   floating WhatsApp button, click-to-load video facade.

   FILL THESE IN (leave '' to switch a tool off — nothing loads until you do):  */
var AS_CONFIG = {
  plausibleDomain: '',   // e.g. 'antarshanti.co.in'  (Plausible, privacy-light)
  ga4Id:           '',   // e.g. 'G-XXXXXXXXXX'       (Google Analytics 4 / Google Ads)
  metaPixelId:     '',   // e.g. '1234567890'         (Meta Pixel, for Instagram/Facebook ads)
  waNumber:        '919985133161'
};

(function () {
  'use strict';
  var C = AS_CONFIG;
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];

  function store(k, v) { try { sessionStorage.setItem(k, v); localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return sessionStorage.getItem(k) || localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function page() { return (location.pathname.replace(/\.html$/, '').replace(/^\/+/, '') || 'home'); }

  /* ---------- 1. Attribution: first-touch UTM capture ---------- */
  (function capture() {
    var q = new URLSearchParams(location.search), fresh = false, i;
    for (i = 0; i < KEYS.length; i++) if (q.get(KEYS[i])) fresh = true;
    if (fresh && !read('as_first_touch')) {
      KEYS.forEach(function (k) { if (q.get(k)) store('as_' + k, q.get(k).slice(0, 120)); });
      store('as_first_touch', '1');
    } else if (fresh) {
      // a later campaign click replaces last-touch values but not the landing page
      KEYS.forEach(function (k) { if (q.get(k)) store('as_' + k, q.get(k).slice(0, 120)); });
    }
    if (!read('as_landing')) store('as_landing', page());
    if (!read('as_referrer') && document.referrer) {
      try { store('as_referrer', new URL(document.referrer).hostname); } catch (e) {}
    }
  })();

  function attribution() {
    var a = { landing_page: read('as_landing'), referrer: read('as_referrer') };
    KEYS.forEach(function (k) { a[k] = read('as_' + k); });
    return a;
  }

  /* ---------- 2. Analytics loaders (only when an ID is configured) ---------- */
  function addScript(src, attrs) {
    var s = document.createElement('script'); s.async = true; s.src = src;
    for (var k in (attrs || {})) s.setAttribute(k, attrs[k]);
    document.head.appendChild(s);
  }
  if (C.plausibleDomain) {
    window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
    addScript('https://plausible.io/js/script.tagged-events.js', { defer: '', 'data-domain': C.plausibleDomain });
  }
  if (C.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date()); window.gtag('config', C.ga4Id);
    addScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(C.ga4Id));
  }
  if (C.metaPixelId) {
    /* standard Meta Pixel bootstrap */
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', C.metaPixelId); window.fbq('track', 'PageView');
  }

  /* ---------- 3. Event API: AS.track(name, props) ---------- */
  // Ad-platform "conversion" mapping. `lead` = someone raised a hand; `purchase` = paid.
  var META = { whatsapp_click: 'Contact', checkin_saved: 'Lead', pay_click: 'InitiateCheckout', payment_success: 'Purchase', slot_selected: 'Schedule' };
  var GA = { checkin_saved: 'generate_lead', payment_success: 'purchase' };

  function track(name, props) {
    props = props || {};
    props.page = props.page || page();
    var at = attribution();
    if (at.utm_source) props.source = at.utm_source;
    if (at.utm_campaign) props.campaign = at.utm_campaign;
    try { if (window.plausible) window.plausible(name, { props: props }); } catch (e) {}
    try { if (window.gtag) window.gtag('event', GA[name] || name, props); } catch (e) {}
    try {
      if (window.fbq) {
        var m = META[name], extra = {};
        if (props.value) { extra.value = props.value; extra.currency = 'INR'; }
        if (m) window.fbq('track', m, extra); else window.fbq('trackCustom', name, props);
      }
    } catch (e) {}
  }

  /* ---------- 4. WhatsApp links carry the source so chats can be attributed ---------- */
  function tagWhatsApp(a) {
    if (a.getAttribute('data-wa-tagged')) return;
    var u;
    try { u = new URL(a.href); } catch (e) { return; }
    if (u.hostname !== 'wa.me') return;
    var at = attribution(), src = at.utm_source ? at.utm_source + (at.utm_campaign ? '/' + at.utm_campaign : '') : (at.referrer || 'direct');
    var text = u.searchParams.get('text') || 'Namaste Srikanth, I would like to know more.';
    u.searchParams.set('text', text + ' [ref: ' + src + ' | ' + page() + ']');
    a.href = u.toString().replace(/\+/g, '%20');
    a.setAttribute('data-wa-tagged', '1');
  }
  function tagAll() { [].slice.call(document.querySelectorAll('a[href*="wa.me/"]')).forEach(tagWhatsApp); }

  /* ---------- 5. Click tracking (delegated; fires before navigation) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '', label = (a.getAttribute('data-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    if (href.indexOf('wa.me/') > -1) { tagWhatsApp(a); track('whatsapp_click', { label: label }); }
    else if (href.indexOf('upi://') === 0) track('upi_click', { label: label });
    else if (href.indexOf('checkin') > -1) track('checkin_click', { label: label });
    else if (a.classList.contains('btn')) track('cta_click', { label: label });
  }, true);

  /* ---------- 6. Floating WhatsApp button (desktop; phones use the sticky bar) ---------- */
  function floatingWA() {
    if (document.querySelector('.wa-float')) return;
    var a = document.createElement('a');
    a.className = 'wa-float'; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', 'Chat with Srikanth on WhatsApp');
    a.href = 'https://wa.me/' + C.waNumber + '?text=' + encodeURIComponent('Namaste Srikanth, I have a question.');
    a.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.3 8.7 3.3 15.7c0 2.4.7 4.6 1.8 6.5L3 29l7-1.8c1.8 1 3.8 1.5 6 1.5 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-1.9 0-3.700-.5-5.200-1.400l-.4-.2-4.100 1.100 1.100-4-.3-.4a10.400 10.400 0 1 1 8.900 4.900zm5.700-7.800c-.3-.2-1.800-.9-2.100-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-.9 1.200-.2.200-.3.200-.6.100-.3-.2-1.300-.5-2.400-1.500-.9-.8-1.500-1.800-1.700-2.100-.2-.3 0-.5.100-.6l.5-.5c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1.100 1.100-1.100 2.600s1.100 3 1.300 3.200c.2.200 2.200 3.300 5.300 4.600.7.300 1.300.5 1.800.6.7.2 1.400.2 2 .1.600-.1 1.800-.7 2.100-1.500.3-.7.300-1.300.2-1.500-.1-.1-.3-.2-.6-.4z"/></svg>';
    document.body.appendChild(a);
  }

  /* ---------- 7. Video facade: <div class="vid" data-yt="ID" data-title="…" [data-wide]> ---------- */
  function initVideos() {
    [].slice.call(document.querySelectorAll('.vid[data-yt]')).forEach(function (el) {
      var id = el.getAttribute('data-yt'), title = el.getAttribute('data-title') || 'Video';
      var short = !el.hasAttribute('data-wide');
      el.innerHTML =
        '<div class="vid-frame"><img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy" width="480" height="360" onerror="this.style.display=\'none\'">' +
        '<button class="vid-play" type="button" aria-label="Play: ' + title.replace(/"/g, '&quot;') + '"><span></span></button></div>' +
        '<div class="vid-cap">' + title + '<a href="https://www.youtube.com/' + (short ? 'shorts/' : 'watch?v=') + id + '" target="_blank" rel="noopener">Open on YouTube ↗</a></div>';
      el.querySelector('.vid-play').addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
        f.title = title; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
        el.querySelector('.vid-frame').innerHTML = ''; el.querySelector('.vid-frame').appendChild(f);
        track('video_play', { label: title });
      });
    });
  }

  window.AS = { track: track, attribution: attribution, page: page };
  function ready() { tagAll(); floatingWA(); initVideos(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();

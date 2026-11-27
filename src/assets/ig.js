/* Home: the short hello from Srikanth (an Instagram post). The photo in the About section is the play button, so he
   appears once: pressing it swaps the photo for the player in the same place. Nothing is loaded from Instagram until then,
   so the page stays fast and nothing tracks anyone. A "Watch on Instagram" link is always there in case the post
   cannot be embedded. The player sizes itself from the height Instagram reports (its own embed script does the same). */
(function () {
  var current = null;   // the player that is on the page, if any
  window.addEventListener('message', function (e) {
    var f = current; if (!f || e.origin !== 'https://www.instagram.com' || e.source !== f.contentWindow) return;
    try { var d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; var h = d && d.type === 'MEASURE' && d.details && d.details.height; if (h > 200 && h < 1400) f.style.height = Math.round(h) + 'px'; } catch (x) {}
  });
  [].forEach.call(document.querySelectorAll('[data-ig]'), function (box) {
    var code = box.getAttribute('data-ig'), btn = box.querySelector('.ig-photo'); if (!code || !btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.instagram.com/p/' + encodeURIComponent(code) + '/embed/';
      f.title = box.getAttribute('data-title') || 'Instagram'; f.className = 'ig-frame'; f.loading = 'lazy'; f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.tabIndex = -1;
      current = f; btn.replaceWith(f); f.focus();   // the pressed button disappears, so focus moves to the player instead of falling to the page
      var cap = box.querySelector('.ig-cap'); if (cap) cap.hidden = true;
      try { if (window.AS && window.AS.track) window.AS.track('video_play', { label: 'instagram_hello' }); } catch (x) {}
    });
  });
})();

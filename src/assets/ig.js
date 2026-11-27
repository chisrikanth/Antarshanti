/* Home: the short hello from Srikanth (an Instagram post). Nothing is loaded from Instagram until the visitor
   presses play: before that it is only a photo and words, so the page stays fast and nothing tracks anyone.
   A "Watch on Instagram" link is always there in case the post cannot be embedded. */
(function () {
  [].forEach.call(document.querySelectorAll('[data-ig]'), function (box) {
    var code = box.getAttribute('data-ig'), btn = box.querySelector('.ig-play'); if (!code || !btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.instagram.com/p/' + encodeURIComponent(code) + '/embed/';
      f.title = box.getAttribute('data-title') || 'Instagram'; f.className = 'ig-frame'; f.loading = 'lazy';
      f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.setAttribute('scrolling', 'no');
      btn.replaceWith(f);
      try { if (window.AS && window.AS.track) window.AS.track('video_play', { label: 'instagram_hello' }); } catch (e) {}
    });
  });
})();

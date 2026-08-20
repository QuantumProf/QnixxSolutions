// ============================================================
// Shared site behaviour — used by both index.html and portfolio.html
// Every block below checks that its target elements exist before
// running, so this one file works safely on either page.
// ============================================================

// --- Reveal-on-scroll animation (homepage sections) ---
(function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }
})();

// --- Contact form (homepage) ---
(function initContactForm(){
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const btn = form.querySelector('.btn-primary');
    if (btn) btn.textContent = 'Message sent';
  });
})();

// --- Portfolio media placeholders ---
// If a photo or video file hasn't been added yet at the expected
// path, this hides the broken image/video and reveals the
// dimension-labelled placeholder box behind it instead.
(function initMediaFallbacks(){
  const mediaEls = document.querySelectorAll('.media-img, .media-video');
  if (!mediaEls.length) return;

  mediaEls.forEach((el) => {
    el.addEventListener('error', () => el.classList.add('media-error'));
  });
})();

// --- Dark mode toggle ---
// The initial theme (saved choice, or system preference as a fallback)
// is already applied by a tiny inline script in <head> before this file
// even loads, so there's no flash of the wrong theme on page load.
// This block only handles what happens when the button is clicked.
(function initThemeToggle(){
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('volta-theme', next);
  });
})();

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.year-card img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img));
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Floating background petals/diyas — skipped entirely if the visitor prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  const bgParticles = document.getElementById('bgParticles');
  const symbols = ['🌸', '🪔', '🌼', '✨'];
  const MAX_PARTICLES = 14;

  function spawnPetal() {
    if (bgParticles.childElementCount >= MAX_PARTICLES) return;
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const duration = 12 + Math.random() * 10;
    const driftX = (Math.random() * 120 - 60).toFixed(0) + 'px';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (1 + Math.random() * 1.2).toFixed(2) + 'rem';
    petal.style.setProperty('--drift-x', driftX);
    petal.style.animationDuration = duration + 's';
    petal.addEventListener('animationiteration', () => {
      petal.style.left = Math.random() * 100 + 'vw';
    });
    bgParticles.appendChild(petal);
  }

  for (let i = 0; i < 8; i++) spawnPetal();
  setInterval(spawnPetal, 2500);
}

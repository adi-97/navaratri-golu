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
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGallery = null;
let currentIndex = -1;

function showInLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
}

function openLightbox(img, gallery) {
  if (gallery) {
    currentGallery = gallery;
    currentIndex = gallery.indexOf(img);
    lightbox.classList.add('has-nav');
  } else {
    currentGallery = null;
    currentIndex = -1;
    lightbox.classList.remove('has-nav');
  }
  showInLightbox(img);
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function stepLightbox(delta) {
  if (!currentGallery) return;
  currentIndex = (currentIndex + delta + currentGallery.length) % currentGallery.length;
  showInLightbox(currentGallery[currentIndex]);
}

// Only the "Last Year's Golu" gallery gets prev/next navigation in the zoomed view
const goluGallery = Array.from(document.querySelectorAll('[data-gallery="last-year-golu"] img'));

document.querySelectorAll('.year-card img').forEach(img => {
  const gallery = goluGallery.includes(img) ? goluGallery : null;
  img.addEventListener('click', () => openLightbox(img, gallery));
});
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => stepLightbox(-1));
lightboxNext.addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
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

// Año dinámico en el footer
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// ===== Menú móvil =====
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  // Cerrar al hacer click en un link
  mobileNav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.add('hidden'));
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') mobileNav.classList.add('hidden');
  });

  // Cerrar si clic afuera
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileNav.classList.add('hidden');
    }
  });
}

// ===== Smooth scroll con offset (fallback para navegadores sin scroll-behavior) =====
const header = document.querySelector('header');
const headerHeight = () => (header ? header.offsetHeight : 0);

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    // Evita el jump y hace scroll con offset
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', id);
  });
});

// ===== Scrollspy (resalta el link activo en el nav) =====
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
const linkById = new Map(
  navLinks.map(a => [a.getAttribute('href').slice(1), a])
);

function onScrollSpy() {
  const scrollPos = window.scrollY + headerHeight() + 16;

  let currentId = sections[0]?.id || null;
  for (const sec of sections) {
    const top = sec.offsetTop;
    if (scrollPos >= top) currentId = sec.id;
    else break;
  }

  navLinks.forEach(a => a.classList.remove('active'));
  if (currentId && linkById.has(currentId)) {
    linkById.get(currentId).classList.add('active');
  }
}

// Throttle simple
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScrollSpy();
      ticking = false;
    });
    ticking = true;
  }
});
window.addEventListener('resize', onScrollSpy);
window.addEventListener('load', onScrollSpy);

// ===== Aparición de títulos/elementos al hacer scroll (IntersectionObserver) =====

// 1) Auto-inject de .reveal en elementos comunes (opcional: ahorra editar HTML)
const autoRevealSelectors = [
  'h1', '.section-title', '#bio .prose p', '#film-tv .prose p',
  '#podcast .prose p', '.press-quote', '.sc-embed'
];
autoRevealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
});

// 2) Observador que añade .revealed al entrar en viewport
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  },
  { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
);

// Observar todos los .reveal
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

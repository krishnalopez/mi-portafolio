/* ==========================================================
   Krishna López · Portafolio personal
   ========================================================== */

/* ---------- Tema ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function setTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeBtn.setAttribute(
    'aria-label',
    t === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'
  );
}

setTheme(root.getAttribute('data-theme') || 'dark');

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

/* ---------- Menú móvil ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Abrir menú');
}

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ---------- Nav scroll + botón top ---------- */
const nav = document.getElementById('nav');
const totop = document.getElementById('totop');

function onScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 10);
  totop.classList.toggle('show', window.scrollY > 600);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

totop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Animación de aparición ---------- */
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Texto tipeado en el hero ---------- */
const typedEl = document.getElementById('typed');
const phrases = [
  '> desarrollo front-end',
  '> aprendiendo python + flask',
  '> interesada en accesibilidad',
  '> construyendo cosas para la web',
];

if (typedEl) {
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    const speed = deleting ? 38 : 68;

    typedEl.textContent = current.slice(0, charIdx);

    if (!deleting && charIdx < current.length) {
      charIdx++;
      setTimeout(tick, speed);
    } else if (!deleting && charIdx === current.length) {
      setTimeout(() => { deleting = true; tick(); }, 1600);
    } else if (deleting && charIdx > 0) {
      charIdx--;
      setTimeout(tick, speed);
    } else {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(tick, 400);
    }
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    typedEl.textContent = phrases[0];
  } else {
    setTimeout(tick, 600);
  }
}

/* ---------- Copiar correo ---------- */
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const original = btn.textContent;

    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = '¡copiado!';
    } catch {
      btn.textContent = 'no se pudo copiar';
    }

    setTimeout(() => { btn.textContent = original; }, 2000);
  });
});

/* ---------- Año del footer ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
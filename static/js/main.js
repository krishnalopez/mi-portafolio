/* ============================================================
   script.js
   ============================================================ */

/* ---------- Tema claro / oscuro ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function setTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeBtn.setAttribute('aria-label', t === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');
}

setTheme(root.getAttribute('data-theme') || 'light');

themeBtn.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------- Menú móvil ---------- */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

function closeMenu() {
  menu.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Abrir menú');
}

burger.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ---------- Nav con sombra al hacer scroll ---------- */
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
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Acordeón de proyectos ---------- */
const accList = document.getElementById('accList');

if (accList) {
  const items = Array.from(accList.querySelectorAll('.acc'));

  items.forEach(item => {
    const head = item.querySelector('.acc__head');

    head.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');

      items.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.acc__head').setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Copiar correo ---------- */
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const original = btn.textContent;

    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = '¡Copiado!';
    } catch {
      btn.textContent = 'No se pudo copiar';
    }

    setTimeout(() => { btn.textContent = original; }, 2000);
  });
});

/* ---------- Año del footer ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
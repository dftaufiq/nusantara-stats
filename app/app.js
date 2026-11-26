// Nusantara Stats — router. Hash routes (#/population, #/economy, …) render
// one page each into #view; every nav link is a real route, and the mobile
// menu button opens and closes the same nav. No network, no framework.
import { ROUTES, ROUTE_TITLES, bindControls } from './views.js';

const view = document.getElementById('view');
const nav = document.getElementById('main-nav');
const menuBtn = document.getElementById('menu-btn');

function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#\/?/, '').split('?')[0].split('/')[0];
  return ROUTES[path] ? path : '';
}

function render() {
  const route = currentRoute();
  view.innerHTML = ROUTES[route]();
  document.querySelectorAll('#main-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
    if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.title = route === '' ? 'Nusantara Stats — Statistik Indonesia 2015–2024' : `Nusantara Stats — ${ROUTE_TITLES[route]}`;
  bindControls(route);
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', render);
render();

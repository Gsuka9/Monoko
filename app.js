'use strict';

/* ═══════════════════════════════════════════
   MONOKO — app.js
   All interactive functionality
═══════════════════════════════════════════ */

/* ── Page Loader ────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader')?.classList.add('hidden');
  }, 1300);
});

/* ── Navbar: scroll shrink + active highlight ─ */
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

function syncNav() {
  const scrolled = window.scrollY > 60;
  nav.classList.toggle('scrolled', scrolled);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', syncNav, { passive: true });
syncNav();

/* ── Mobile Menu ────────────────────────────── */
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

function toggleMobileMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger?.addEventListener('click', () => toggleMobileMenu(!hamburger.classList.contains('open')));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMobileMenu(false)));

/* ── Parallax Hero Background ───────────────── */
const heroBg = document.querySelector('.hero__bg');
window.addEventListener('scroll', () => {
  if (!heroBg || window.scrollY > window.innerHeight) return;
  heroBg.style.transform = `scale(1.12) translateY(${window.scrollY * 0.28}px)`;
}, { passive: true });

/* ── Scroll Reveal via IntersectionObserver ─── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Animated Stat Counters ─────────────────── */
function runCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 2200;
  const t0 = performance.now();
  const frame = now => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { runCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ── Menu Tabs ──────────────────────────────── */
function initTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}
initTabs();

/* ── Testimonial Carousel ───────────────────── */
function initTestimonials() {
  const track = document.querySelector('.testimonials__track');
  const dots = document.querySelectorAll('.testi-dot');
  const prevBtn = document.querySelector('.testi-btn--prev');
  const nextBtn = document.querySelector('.testi-btn--next');
  if (!track || !dots.length) return;

  let current = 0;
  const total = dots.length;

  function goTo(idx) {
    current = (idx + total) % total;
    // On mobile: 1 card; on medium: 2; on desktop: 3
    const perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const gap = 24; // 1.5rem in px
    const cardW = (track.parentElement.offsetWidth - gap * (perView - 1)) / perView;
    track.style.transform = `translateX(-${current * (cardW + gap)}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Auto-advance
  let autoTimer = setInterval(() => goTo(current + 1), 5000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  });
  window.addEventListener('resize', () => goTo(current));
  goTo(0);
}
initTestimonials();

/* ═══════════════════════════════════════════
   CART SYSTEM
═══════════════════════════════════════════ */
let cart = [];

const cartOverlay  = document.querySelector('.cart-overlay');
const cartSidebar  = document.querySelector('.cart-sidebar');
const cartBodyEl   = document.querySelector('.cart-body');
const cartTotalEl  = document.querySelector('.cart-footer__total');
const cartCountEl  = document.querySelector('.nav__cart-count');
const cartCloseBtn = document.querySelector('.cart-close');
const checkoutBtn  = document.querySelector('[data-cart-checkout]');
const clearBtn     = document.querySelector('.cart-footer__clear');

function openCart() {
  cartOverlay?.classList.add('open');
  cartSidebar?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartOverlay?.classList.remove('open');
  cartSidebar?.classList.remove('open');
  document.body.style.overflow = '';
}

// Open triggers
document.querySelectorAll('[data-cart-open]').forEach(btn => btn.addEventListener('click', openCart));
cartCloseBtn?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);

function renderCart() {
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Badge
  if (cartCountEl) {
    cartCountEl.textContent = itemCount;
    cartCountEl.classList.toggle('visible', itemCount > 0);
  }
  if (cartTotalEl) cartTotalEl.textContent = `TSh ${total.toLocaleString()}`;

  if (!cartBodyEl) return;

  if (cart.length === 0) {
    cartBodyEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🍽️</div>
        <p class="cart-empty__title">Your order is empty</p>
        <p class="cart-empty__sub">Browse our menu and add delicious dishes!</p>
      </div>`;
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  cartBodyEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price-each">TSh ${item.price.toLocaleString()} each</div>
      </div>
      <div class="cart-item__qty">
        <button class="cart-item__qty-btn" onclick="changeQty(${idx}, -1)">−</button>
        <span class="cart-item__qty-num">${item.qty}</span>
        <button class="cart-item__qty-btn" onclick="changeQty(${idx}, 1)">+</button>
      </div>
      <div class="cart-item__line-total">TSh ${(item.price * item.qty).toLocaleString()}</div>
      <button class="cart-item__del" onclick="removeItem(${idx})" title="Remove">✕</button>
    </div>`).join('');

  if (checkoutBtn) checkoutBtn.disabled = false;
}

window.changeQty = (idx, delta) => {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  renderCart();
};
window.removeItem = idx => { cart.splice(idx, 1); renderCart(); };

clearBtn?.addEventListener('click', () => {
  if (cart.length > 0 && confirm('Clear your entire order?')) { cart = []; renderCart(); }
});

// Add to cart buttons
document.addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;
  e.preventDefault();

  const name = btn.dataset.item;
  const price = parseInt(btn.dataset.price, 10);
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; } else { cart.push({ name, price, qty: 1 }); }

  renderCart();
  openCart();

  // Button feedback animation
  const orig = btn.innerHTML;
  btn.innerHTML = '✓ Added!';
  btn.style.setProperty('background', 'linear-gradient(135deg,#22c35e,#16A34A)', 'important');
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.removeProperty('background');
    btn.style.removeProperty('color');
  }, 1600);
});

// WhatsApp Checkout
checkoutBtn?.addEventListener('click', () => {
  if (!cart.length) return;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let msg = `🍛 *ORDER – MONOKO FOOD & CATERING*\n\n*Items Ordered:*\n`;
  cart.forEach(item => {
    msg += `• ${item.name} × ${item.qty} = TSh ${(item.price * item.qty).toLocaleString()}\n`;
  });
  msg += `\n*ORDER TOTAL: TSh ${total.toLocaleString()}*\n\n`;
  msg += `*Your Details:*\n• Name:\n• Phone:\n• Delivery Address:\n• Preferred Time:\n\nThank you for choosing MONOKO! 🎉`;
  window.open(`https://wa.me/255769506654?text=${encodeURIComponent(msg)}`, '_blank');
});

renderCart();

/* ── Smooth Scroll for anchor links ─────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

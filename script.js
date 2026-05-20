const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});


// ── ACTIVE NAV LINK ON SCROLL ───────────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');

function updateActiveNav() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (scrollY >= top && scrollY < bottom) {
      link.style.color = 'var(--text)';
    } else {
      link.style.color = '';
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });


// ── SCROLL REVEAL ───────────────────────────────────────────────────
// Add .reveal class to elements we want to animate in
const revealTargets = [
  '.section-title', '.section-sub',
  '.about-text', '.about-visual',
  '.stat', '.skill-card', '.project-card',
  '.contact-form', '.filter-bar'
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.07}s`;
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── SKILL BAR ANIMATION ─────────────────────────────────────────────
// Animate the bars when they scroll into view
const skillBars = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const width = bar.dataset.width;
        bar.style.width = width + '%';
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach(bar => barObserver.observe(bar));


// ── PROJECT FILTER ──────────────────────────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
        // Re-trigger hover animation after un-hiding
        card.style.animation = 'none';
        requestAnimationFrame(() => { card.style.animation = ''; });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ── CONTACT FORM VALIDATION ─────────────────────────────────────────
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const btnText    = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const formSuccess = document.getElementById('formSuccess');

function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add('error');
  error.textContent = message;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove('error');
  error.textContent = '';
}

// Live validation — clear errors as user types
['name', 'email', 'message'].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('input', () => {
    clearError(id, id + 'Error');
  });
});

function validateForm() {
  let valid = true;
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    showError('name', 'nameError', 'Name is required.');
    valid = false;
  }
  if (!email) {
    showError('email', 'emailError', 'Email is required.');
    valid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'emailError', 'Please enter a valid email.');
    valid = false;
  }
  if (!message) {
    showError('message', 'messageError', 'Message cannot be empty.');
    valid = false;
  }
  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous errors
  ['name', 'email', 'message'].forEach(id => clearError(id, id + 'Error'));
  formSuccess.hidden = true;

  if (!validateForm()) return;

  // Simulate async send
  btnText.hidden = true;
  btnLoading.hidden = false;
  submitBtn.disabled = true;

  setTimeout(() => {
    btnText.hidden = false;
    btnLoading.hidden = true;
    submitBtn.disabled = false;
    formSuccess.hidden = false;
    form.reset();

    // Scroll success into view
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Hide success after 5s
    setTimeout(() => { formSuccess.hidden = true; }, 5000);
  }, 1800);
});

const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(8,8,16,0.97)';
  } else {
    nav.style.background = 'rgba(8,8,16,0.85)';
  }
}, { passive: true });

const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace('2025', new Date().getFullYear());
}
// Init scroll animations
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

// 3D tilt on project cards
window.addEventListener('load', () => {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
      max: 7,
      speed: 500,
      glare: true,
      'max-glare': 0.08,
      scale: 1.02,
    });
  }
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀';
} else {
  themeToggle.textContent = '☽';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.textContent = isLight ? '☀' : '☽';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  navbar.style.background = isLight ? 'rgba(240, 244, 248, 0.88)' : 'rgba(15, 12, 22, 0.82)';
});

// Darken pill nav on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const isLight = document.body.classList.contains('light');
  if (isLight) {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(240, 244, 248, 0.97)'
      : 'rgba(240, 244, 248, 0.88)';
  } else {
    navbar.style.background = window.scrollY > 50
      ? 'rgba(15, 12, 22, 0.95)'
      : 'rgba(15, 12, 22, 0.82)';
  }
});

// Mobile hamburger menu
const navToggle = document.getElementById('nav-toggle');
const navLinksList = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinksList.classList.toggle('open');
    navToggle.textContent = isOpen ? '✕' : '☰';
  });
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinksList.classList.remove('open');
      navToggle.textContent = '☰';
    }
  });
}

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Read more toggle for project descriptions
window.addEventListener('load', () => {
  document.querySelectorAll('.project-desc').forEach(desc => {
    if (desc.scrollHeight <= desc.clientHeight + 4) return;
    const btn = document.createElement('button');
    btn.className = 'read-more-btn';
    btn.textContent = 'Read more';
    desc.after(btn);
    btn.addEventListener('click', () => {
      desc.classList.toggle('expanded');
      btn.textContent = desc.classList.contains('expanded') ? 'Show less' : 'Read more';
    });
  });
});

// LinkedIn-style tenure ("2 yrs 5 mos"), counting start and end months inclusively
function formatTenure(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end === 'present'
    ? [now.getFullYear(), now.getMonth() + 1]
    : end.split('-').map(Number);
  const total = (ey * 12 + em) - (sy * 12 + sm) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts = [];
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`);
  if (mos) parts.push(`${mos} mo${mos > 1 ? 's' : ''}`);
  return parts.join(' ');
}

document.querySelectorAll('.duration, .timeline-company-span').forEach(el => {
  const tenure = formatTenure(el.dataset.start, el.dataset.end);
  el.textContent = el.classList.contains('duration') ? `  ·  ${tenure}` : tenure;
});

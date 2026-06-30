// Init scroll animations
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent.trim();
  subtitle.textContent = '';
  let i = 0;
  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        subtitle.textContent += text[i++];
        setTimeout(type, 22);
      }
    };
    type();
  }, 750);
}

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

// Shrink navbar on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(10, 14, 23, 0.97)'
    : 'rgba(10, 14, 23, 0.85)';
});

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

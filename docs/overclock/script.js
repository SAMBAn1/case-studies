const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });

document.querySelectorAll('.avx-card, .log-entry').forEach(el => revealObserver.observe(el));

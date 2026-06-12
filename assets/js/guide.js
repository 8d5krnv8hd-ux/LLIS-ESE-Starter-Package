/* Tab switching */
  function showTab(id, btn) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  }

  /* Scroll-reveal: .reveal + .bac-card */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      /* Stagger children if grid */
      if (el.classList.contains('bac-grid')) {
        el.querySelectorAll('.bac-card').forEach(c => c.classList.add('in'));
      } else if (el.classList.contains('reveal')) {
        el.classList.add('in');
      }
      io.unobserve(el);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .bac-grid').forEach(el => io.observe(el));

  /* Nav active link on scroll */
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const scrollSpy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active-nav'));
        const link = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (link) link.classList.add('active-nav');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => scrollSpy.observe(s));
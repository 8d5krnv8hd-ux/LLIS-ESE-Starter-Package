// ── ACCORDION ─────────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded','false');
    });

    // Open clicked if was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded','true');
      // smooth scroll if needed
      setTimeout(() => {
        const rect = item.getBoundingClientRect();
        if (rect.top < 140) {
          item.scrollIntoView({behavior:'smooth', block:'nearest'});
        }
      }, 320);
    }
  });
});

// ── SEARCH ────────────────────────────────────────────────────
const searchInput   = document.getElementById('faq-search');
const visibleCount  = document.getElementById('visible-count');
const emptyState    = document.getElementById('empty-state');
const allItems      = document.querySelectorAll('.faq-item');
const allGroups     = document.querySelectorAll('.faq-group');
let activeFilter    = 'all';

function updateVisibility() {
  const q = searchInput.value.toLowerCase().trim();
  let shown = 0;

  allItems.forEach(item => {
    const cat  = item.dataset.cat;
    const text = item.innerText.toLowerCase();
    const matchCat  = activeFilter === 'all' || cat === activeFilter;
    const matchText = !q || text.includes(q);

    if (matchCat && matchText) {
      item.classList.remove('faq-hidden');
      shown++;
    } else {
      item.classList.add('faq-hidden');
      if (item.classList.contains('open')) {
        item.classList.remove('open');
        item.querySelector('.faq-q').setAttribute('aria-expanded','false');
      }
    }
  });

  // Hide empty groups
  allGroups.forEach(group => {
    const hasVisible = [...group.querySelectorAll('.faq-item')].some(i => !i.classList.contains('faq-hidden'));
    group.style.display = hasVisible ? '' : 'none';
  });

  visibleCount.textContent = shown;
  emptyState.classList.toggle('show', shown === 0);
}

searchInput.addEventListener('input', updateVisibility);

// ── FILTER PILLS ──────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    updateVisibility();
  });
});

function clearSearch() {
  searchInput.value = '';
  activeFilter = 'all';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-cat="all"]').classList.add('active');
  updateVisibility();
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.1});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── TOC HIGHLIGHT ─────────────────────────────────────────────
const tocLinks = document.querySelectorAll('.toc-list a');
const groups   = document.querySelectorAll('.faq-group[id]');
const tocSpy   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      tocLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector('.toc-list a[href="#' + e.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, {rootMargin: '-20% 0px -65% 0px'});

groups.forEach(g => tocSpy.observe(g));
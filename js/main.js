// ============================================
// NAV SCROLL EFFECT
// ============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ============================================
// TABS
// ============================================
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ============================================
// SCROLL-TRIGGERED BAR ANIMATIONS
// ============================================
const barGroups = document.querySelectorAll('.metric-bar-group[data-animate]');

const animateBar = (group) => {
  group.classList.add('visible');
  const fills = group.querySelectorAll('.bar-fill');
  fills.forEach((fill, i) => {
    setTimeout(() => {
      fill.classList.add('animate');
    }, i * 150);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        animateBar(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

barGroups.forEach(group => observer.observe(group));

// ============================================
// SVG CURVE ANIMATION (draw-on-scroll)
// ============================================
const svgLines = document.querySelectorAll('.curve-train, .curve-val, .curve-reward, .curve-dpo');

svgLines.forEach(line => {
  const length = line.getTotalLength ? line.getTotalLength() : 600;
  line.style.strokeDasharray = length;
  line.style.strokeDashoffset = length;
  line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)';
});

const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll('.curve-train, .curve-val, .curve-reward, .curve-dpo');
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.style.strokeDashoffset = '0';
          }, i * 200);
        });
        chartObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.curve-chart').forEach(chart => chartObserver.observe(chart));

// ============================================
// SMOOTH ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// ============================================
// STAGGER REVEAL FOR CARDS
// ============================================
const revealEls = document.querySelectorAll('.ov-card, .eff-card, .pipe-step, .metric-pill');
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 80 * (Array.from(entry.target.parentElement?.children || []).indexOf(entry.target)));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach(el => revealObserver.observe(el));

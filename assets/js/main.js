// header // 
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  document.getElementById('icon-moon').classList.toggle('hidden', isLight);
  document.getElementById('icon-sun').classList.toggle('hidden', !isLight);
}
// On page load, sync the icon to match the saved theme
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.getElementById('icon-moon').classList.add('hidden');
    document.getElementById('icon-sun').classList.remove('hidden');
  }
})();

function toggleLang() {
  const currentPath = window.location.pathname;
  const isAr = currentPath.startsWith('/ar');

  if (isAr) {
    // Strip the /ar prefix to go to English equivalent
    const enPath = currentPath.replace(/^\/ar/, '') || '/';
    window.location.href = enPath;
  } else {
    // Add /ar prefix to go to Arabic equivalent
    window.location.href = '/ar' + currentPath;
  }
}
/////////

//projects page//
document.querySelectorAll('.project-card').forEach(card => {
  const track = card.querySelector('.gallery-track');
  if (!track) return;

  const slides = track.children;
  const total = slides.length;
  if (total <= 1) return;

  const dots = card.querySelectorAll('.gallery-dot');
  const slideWidth = slides[0].offsetWidth;
  let current = 0;

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    dots.forEach((d, i) => {
      if (i === current) {
        d.style.background = 'rgba(255,255,255,0.95)';
        d.style.width = '8px';
      } else {
        d.style.background = 'rgba(255,255,255,0.35)';
        d.style.width = '5px';
      }
    });
  }

  card.querySelector('.gallery-prev').addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation(); goTo(current - 1);
  });
  card.querySelector('.gallery-next').addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation(); goTo(current + 1);
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      goTo(parseInt(dot.dataset.index));
    });
  });
});

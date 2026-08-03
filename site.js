(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const topNav = document.querySelector('.topnav');

  if (header && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    topNav?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('[data-type]');
  const galleryCount = document.querySelector('[data-gallery-count]');

  const updateGallery = (filter) => {
    let visible = 0;
    galleryItems.forEach((item) => {
      const matches = filter === 'all' || item.dataset.type === filter;
      item.classList.toggle('is-hidden', !matches);
      if (matches) visible += 1;
    });
    if (galleryCount) galleryCount.textContent = `${visible} ${visible === 1 ? 'story' : 'stories'} on display`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      updateGallery(button.dataset.filter);
    });
  });

  const matchTabs = document.querySelectorAll('[data-match-tab]');
  const matchStatus = document.querySelector('[data-match-status]');
  const matchCopy = {
    live: 'Live signal verified across 3 data sources.',
    pulse: 'Momentum update: Spain are controlling the final third.',
    recap: 'Post-match package ready for every platform.'
  };

  matchTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      matchTabs.forEach((item) => item.classList.remove('is-active'));
      tab.classList.add('is-active');
      matchTabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      if (matchStatus) matchStatus.textContent = matchCopy[tab.dataset.matchTab] || matchCopy.live;
    });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 520);
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    toggleBackToTop();
  }
})();

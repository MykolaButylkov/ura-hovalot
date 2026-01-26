  const header = document.querySelector('header');
  const burger = document.querySelector('.burger');

  burger.addEventListener('click', () => {
    const opened = header.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  // закрывать меню при клике на ссылку
  document.querySelectorAll('.nav_link').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // закрывать при клике вне header
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      header.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

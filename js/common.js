const mainHead = document.querySelector('.main__head'),
      menu = document.querySelector('.menu'),
      sandwich = menu.querySelector('.sandwich'),
      menuTop = document.querySelector('.menu__top'),
      menuTopItems = menuTop.querySelectorAll('a'),
      loader = document.querySelector('.loader'),
      loaderInner = document.querySelector('.loader_inner');

mainHead.style.minHeight = `${window.screen.height}px`;

sandwich.addEventListener('click', () => {
  menuTop.classList.contains('active') ? fadeOut(menuTop, 400) : fadeIn(menuTop, 400);
  sandwich.classList.toggle('active');
  menuTop.classList.toggle('active');
  menuTopItems.forEach(item => {
    item.classList.add('animate__fadeInDown', 'animate__animated');
});
});

window.onload = () => {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);

  fadeOut(loaderInner, 600);
  fadeOut(loader, 600);
};

menuTopItems.forEach(item => {
  item.addEventListener('click', () => {
    fadeOut(menuTop, 400);
    sandwich.classList.remove('active');
    menuTop.classList.remove('active');
  });
});

const fadeIn = (el, timeout) => {
  el.style.opacity = 0;
  el.style.display = 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
};

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
  }, timeout);
};

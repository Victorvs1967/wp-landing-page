const mainHead = document.querySelector('.main__head'),
      overflow = document.querySelector('.overflow'),
      menu = document.querySelector('.menu'),
      sandwich = menu.querySelector('.sandwich'),
      menuTop = document.querySelector('.menu__top'),
      menuTopItems = menuTop.querySelectorAll('a'),
      loader = document.querySelector('.loader'),
      loaderInner = document.querySelector('.loader_inner'),
      titleWrapper = document.querySelector('.title-wrapper'),
      portfolioLis = document.querySelectorAll('.portfolio li'),
      containerEl = document.querySelector('.portfolio .container'),
      portfolioItems = document.querySelectorAll('.portfolio__item'),
      parallax = document.querySelector('.parallax'), // parallax
      parallaxBg = parallax.querySelector('.parallax-bg'); // parallax


const mixer = mixitup(containerEl);

mainHead.style.minHeight = `${window.screen.height}px`;

// animate on scroll with AOS library
AOS.init({
  duration: 1000,
  delay: 100,
});

// animated burger button w/o jQuery
sandwich.addEventListener('click', () => {
  menuTop.classList.contains('active') ? fadeOut(menuTop, 400) : fadeIn(menuTop, 400);
  sandwich.classList.toggle('active');
  menuTop.classList.toggle('active');
  menuTopItems.forEach(item => {
    item.classList.add('animate__fadeInDown', 'animate__animated');
  });
});

window.onload = () => {

  // animated loader w/o jQuery
  document.body.classList.add('loaded_hiding');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);

  fadeOut(loaderInner, 600);
  fadeOut(loader, 600);

  // parallax with scroll
  if (parallax) {
    let thresholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) {
      thresholdSets.push(i);
    }
    const callback = (entries, observer) => {
      const scrollTopPercent = window.pageYOffset / parallax.offsetHeight * 100;
      setParallaxItemsStyle(scrollTopPercent);
    };
    const observer = new IntersectionObserver(callback, { threshold: thresholdSets });   
    observer.observe(document.querySelector('section'));    
    const setParallaxItemsStyle = scrollTopPercent => parallaxBg.parentElement.style.cssText = `transform: translate(0%, -${scrollTopPercent / 6}%);`;
  }
};

portfolioLis.forEach(li => li.addEventListener('click', () => {
  portfolioLis.forEach(li => li.classList.remove('active'));
  li.classList.add('active');
}));

portfolioItems.forEach(item => {
  item.querySelector('a').addEventListener('click', event => {
    fadeIn(overflow, 600);
    const description = document.querySelector(event.target.hash);
    description.classList.remove('hidden');
    overflow.addEventListener('click', () => {
      description.classList.add('hidden');
      fadeOut(overflow, 600);
    });
  });
});

// animate menu w/o jQuiery
menuTopItems.forEach(item => {
  item.addEventListener('click', () => {
    fadeOut(menuTop, 400);
    sandwich.classList.remove('active');
    menuTop.classList.remove('active');
  });
});

// fadeIn/fadeOut effect w/o jQuiery
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


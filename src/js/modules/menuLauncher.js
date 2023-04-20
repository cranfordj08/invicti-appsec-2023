import { fadeIn, fadeOut } from './fade.js';

const init = () => {
  const isMobile = () => {
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return windowWidth < 980;
  };

  // show mobile menu & transparent menu back on menu button click
  const launcher = document.querySelectorAll('.js-menu-launcher');

  Array.from(launcher).forEach((element) => {
    element.addEventListener('click', function () {
      if (isMobile()) {
        new fadeIn(document.querySelector('.js-menu-back'));
        document.querySelector('.js-menu').classList.add('navigation--open');
        document
          .querySelector('.js-menu-launcher')
          .classList.add('header__toggle-icon--open');
      }
    });
  });

  // Hide mobile menu & transparent menu back on close button, nav item, or menu back click
  const closer = document.querySelectorAll(
    '.js-menu-closer, .js-menu-back, .js-menu li'
  );

  Array.from(closer).forEach((element) => {
    element.addEventListener('click', function () {
      if (isMobile()) {
        new fadeOut(document.querySelector('.js-menu-back'));
        document.querySelector('.js-menu').classList.remove('navigation--open');
        document
          .querySelector('.js-menu-launcher')
          .classList.remove('header__toggle-icon--open');
      }
    });
  });
};

export { init };

(function() {
  'use strict';

  const pageFooter = document.querySelector('footer > .footer');
  pageFooter.classList.remove('footer--nojs');

  const footerButtons = document.querySelectorAll('.footer__button--togle-js');
  const toggleMenuState = (buttonElement) => {
    if (buttonElement.classList.contains('button--close')) {
      buttonElement.classList.remove('button--close');
      buttonElement.classList.add('button--open');
    } else {
      buttonElement.classList.add('button--close');
      buttonElement.classList.remove('button--open');
    }
  }

  footerButtons.forEach((element) => {
    element.addEventListener('click', () => {
      toggleMenuState(element);
    });
  });
})();

(function() {
  'use strict';

  const pageFooter = document.querySelector('body > .footer');
  if (pageFooter) {
    pageFooter.classList.remove('footer--nojs');
  }

  const footerButtons = document.querySelectorAll('.footer__button--togle-js');
  const replaceClass = (element, firstClass, secondClass) => {
    if (element.classList.contains(firstClass)) {
      element.classList.remove(firstClass);
      element.classList.add(secondClass);
    } else {
      element.classList.add(firstClass);
      element.classList.remove(secondClass);
    }
  }

  footerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      replaceClass(button, 'button--close', 'button--open');
    });
  });
})();

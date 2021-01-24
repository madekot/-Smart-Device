(function() {
  'use strict';

  const pageFooter = document.querySelector('body > .footer');
  const footerButtons = document.querySelectorAll('.footer__button--togle-js');

  const closeTab = (button) => {
    button.classList.remove('button--close');
    button.classList.add('button--open');
  };

  const closeAllTabs = (elements) => {
    elements.forEach((button) => {
      closeTab(button);
    });
  };

  const openTab = (button) => {
    button.classList.remove('button--open');
    button.classList.add('button--close');
  };

  const changeTabsStates = (button) => {
    if (button.classList.contains('button--close')) {
      closeTab(button)
    } else {
      closeAllTabs(footerButtons)
      openTab(button)
    }
  }

  if (pageFooter) {
    pageFooter.classList.remove('footer--nojs');
  }

  if (footerButtons) {
    footerButtons.forEach((button) => {
      button.addEventListener('click', () => {
        changeTabsStates(button);
      });
    });
  }

})();

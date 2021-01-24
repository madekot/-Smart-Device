'use strict';
(function () {
  var pageFooter = document.querySelector('body > .footer');
  var footerButtons = document.querySelectorAll('.footer__button--togle-js');

  var closeTab = function (button) {
    button.classList.remove('button--close');
    button.classList.add('button--open');
  };

  var closeAllTabs = function (elements) {
    elements.forEach(function (button) {
      closeTab(button);
    });
  };

  var openTab = function (button) {
    button.classList.remove('button--open');
    button.classList.add('button--close');
  };

  var changeTabsStates = function (button) {
    if (button.classList.contains('button--close')) {
      closeTab(button);
    } else {
      closeAllTabs(footerButtons);
      openTab(button);
    }
  };

  if (pageFooter) {
    pageFooter.classList.remove('footer--nojs');
  }

  if (footerButtons) {
    footerButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        changeTabsStates(button);
      });
    });
  }

})();

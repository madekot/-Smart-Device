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

  // START: открывает / закрывает модалку по клику или с клавиатуры
  var ESCCAPE_KEYCODE = 27;
  var BACKSPACE_KEYCODE = 8;
  var DELETE_KEYCODE = 46;
  // var ARROW_LEFT = 37;
  // var ARROW_RIGHT = 39;
  var REMOVE_ANIMATION_MILLISECOND = 1000;


  var callBackButtonElement = document.querySelector('.header__button--js');
  var popupElement = document.querySelector('.popup');
  var bodyElement = document.querySelector('body');
  var popupContentElement = popupElement.querySelector('.popup__content');
  var closePopupButtonElement = popupElement.querySelector('.popup__close');
  var submitPopupButtonElement = popupElement.querySelector('.popup__submit-button');
  var inputNamePopupElement = popupElement.querySelector('.popup__name-field--name-js input');
  var inputPhonePopupElement = popupElement.querySelector('.popup__form-field--phone-js input');
  var textareaQuestionPopupElement = popupElement.querySelector('.popup__form-field--question-js textarea');
  var inputCheckboxQuestionPopupElement = popupElement.querySelector('.popup__checkbox-field--js input');


  submitPopupButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!inputNamePopupElement.value || !inputPhonePopupElement.value || !textareaQuestionPopupElement.value || !inputCheckboxQuestionPopupElement.checked) {
      popupContentElement.classList.add('popup__content--error');
      setTimeout(function(){
        popupContentElement.classList.remove('popup__content--error');
      }, REMOVE_ANIMATION_MILLISECOND)
    } else {
      writeStorage(isStorageSupport);
    }
  });

  var openPopup = function (evt) {
    evt.preventDefault();
    popupElement.classList.remove('popup--hide');
    blockScrolling();
    readStorage(isStorageSupport);
  };

  var closePopup = function (evt) {
    evt.preventDefault();
    popupElement.classList.add('popup--hide');
    unblockScrolling();
    document.removeEventListener('keydown', onPopupEscKeyDown);
    popupElement.removeEventListener('click', onPopupClick);
  };

  callBackButtonElement.addEventListener('click', function (evt) {
    openPopup(evt);
    document.addEventListener('keydown', onPopupEscKeyDown);
    popupElement.addEventListener('click', onPopupClick);
  });

  closePopupButtonElement.addEventListener('click', function (evt) {
    closePopup(evt);
  });

  var onPopupEscKeyDown = function (evt) {
    if (evt.keyCode === ESCCAPE_KEYCODE) {
      closePopup(evt);
    }
  };

  var onPopupClick = function (evt) {
    if (evt.target === popupElement) {
      closePopup(evt);
    }
  }

  var blockScrolling = function () {
    bodyElement.style.overflow = 'hidden';
  }

  var unblockScrolling = function () {
    bodyElement.style.overflow = 'auto';
  }
  // END: открывает / закрывает модалку по клику или с клавиатуры

  // START: реализует хранение данных в localStorage
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';
  var storageMessage = '';

  try {
    storageName = localStorage.getItem('name');
    storagePhone = localStorage.getItem('phone');
    storageMessage = localStorage.getItem('message');
  } catch (err) {
    isStorageSupport = false;
  }

  var readStorage = function (isStorageSupport) {
    if (isStorageSupport) {
      inputNamePopupElement.value = storageName;
      inputPhonePopupElement.value = storagePhone;
      textareaQuestionPopupElement.value = storageMessage;
    } else {
      inputNamePopupElement.focus();
    }
  };

  var writeStorage = function (isStorageSupport) {
    if (isStorageSupport) {
      localStorage.setItem("name", inputNamePopupElement.value);
      localStorage.setItem("phone", inputPhonePopupElement.value);
      localStorage.setItem("message", textareaQuestionPopupElement.value);
    }
  };
  // END: реализует хранение данных в localStorage

  // START: реализует валидацию поля телефона

  var isKeyNumber = function (key) {
    return !isNaN(parseInt(key))
  };

  var isDeleteKey = function (keyCode) {
    return !(keyCode !== BACKSPACE_KEYCODE &&
    keyCode !== DELETE_KEYCODE)
  };


  // START: реализует валидацию поля телефона при помощи плагина IMask + при фокусе +7
  var phoneMask = IMask(
    inputPhonePopupElement, {
    mask: '+{7}(000)000-00-00'
  });

  inputPhonePopupElement.addEventListener('focus', function() {
    if (inputPhonePopupElement.value.length < 3) {
      inputPhonePopupElement.value = '+7('
    }
  });

  inputPhonePopupElement.addEventListener('blur', function () {
    if (inputPhonePopupElement.value === '+7(' || inputPhonePopupElement.value.length <= 3) {
      inputPhonePopupElement.value = ''
    }
  });
  // END: реализует валидацию поля телефона при помощи плагина IMask + при фокусе +7
})();

'use strict';
(function () {
  // START: открывает / закрывает аккардион в подвале
  var pageFooter = document.querySelector('body > .footer');
  var footerButtons = document.querySelectorAll('.footer__button--togle-js');
  var footerTabs = pageFooter.querySelectorAll('.footer__sections--js, .footer__contacts--js');

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

  if (footerTabs) {
    footerTabs.forEach(function (Tab, index) {
      Tab.addEventListener('click', function () {
        changeTabsStates(footerButtons[index]);
      });
    });
  }
  // END: открывает / закрывает аккардион в подвале

  // START: открывает / закрывает модалку по клику или с клавиатуры
  var ESCCAPE_KEYCODE = 27;
  var MIN_LENGTH_PHONE = 3;

  var callBackButtonElement = document.querySelector('.header__button--js');
  var popupElement = document.querySelector('.popup');
  var bodyElement = document.querySelector('body');
  var popupFormElement = popupElement.querySelector('.popup__form');
  var closePopupButtonElement = popupElement.querySelector('.popup__close');
  var inputNamePopupElement = popupElement.querySelector('.popup__name-field--name-js input');
  var inputPhonePopupElement = popupElement.querySelector('.popup__form-field--phone-js input');
  var textareaQuestionPopupElement = popupElement.querySelector('.popup__form-field--question-js textarea');
  var inputCheckboxQuestionPopupElement = popupElement.querySelector('.popup__checkbox-field--js input');

  var callbackForm = document.querySelector('.callback__form');
  var inputNameFormElement = document.querySelector('.callback__name-field--js input');
  var inputPhoneFormElement = document.querySelector('.callback__phone-field--phone-js input');
  var textareaQuestionFormElement = document.querySelector('.callback__question-field--js textarea');

  document.addEventListener('DOMContentLoaded', function () {
    readStorage(isStorageSupport);
    // localStorage.clear();
  });

  popupFormElement.addEventListener('submit', function () {
    writeStorage(isStorageSupport, popupFormElement);
    selectFieldFocus();
  });

  callbackForm.addEventListener('submit', function () {
    writeStorage(isStorageSupport, callbackForm);
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

  var selectFieldFocus = function () {
    if (!inputCheckboxQuestionPopupElement.checked) {
      inputCheckboxQuestionPopupElement.focus();
    }

    if (!textareaQuestionPopupElement.value) {
      textareaQuestionPopupElement.focus();
    }

    if (!inputNamePopupElement.value) {
      inputNamePopupElement.focus();
    }
  };

  callBackButtonElement.addEventListener('click', function (evt) {
    openPopup(evt);
    selectFieldFocus();
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
  };

  var blockScrolling = function () {
    bodyElement.style.overflow = 'hidden';
  };

  var unblockScrolling = function () {
    bodyElement.style.overflow = 'auto';
  };
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

   var readStorage = function (storageSupport) {
    if (storageSupport) {
      inputNamePopupElement.value = storageName;
      inputNameFormElement.value = storageName;

      inputPhonePopupElement.value = storagePhone;
      inputPhoneFormElement.value = storagePhone;

      textareaQuestionFormElement.value = storageMessage;
      textareaQuestionPopupElement.value = storageMessage;
    }
  };

  var writeStorage = function (storageSupport, formElement) {
    if (storageSupport) {
      if (formElement === popupFormElement) {
        localStorage.setItem('name', inputNamePopupElement.value);
        localStorage.setItem('phone', inputPhonePopupElement.value);
        localStorage.setItem('message', textareaQuestionPopupElement.value);
      }

      if (formElement === callbackForm) {
        localStorage.setItem('name', inputNameFormElement.value);
        localStorage.setItem('phone', inputPhoneFormElement.value);
        localStorage.setItem('message', textareaQuestionFormElement.value);
      }
    }
  };
  // END: реализует хранение данных в localStorage

  // START: реализует валидацию поля телефона при помощи плагина IMask + при фокусе +7
  var addValuePhoneField = function (fieldElement) {
    fieldElement.addEventListener('focus', function () {
      if (fieldElement.value.length < MIN_LENGTH_PHONE) {
        fieldElement.value = '+7 (';
      }
    });

    fieldElement.addEventListener('blur', function () {
      if (fieldElement.value === '+7 (' || fieldElement.value.length <= MIN_LENGTH_PHONE) {
        fieldElement.value = '';
      }
    });
  }

  // eslint-disable-next-line
  window.IMask(inputPhonePopupElement, {mask: '+{7} (000) 000-00-00'}); //используется плагин
  addValuePhoneField(inputPhonePopupElement);

  // eslint-disable-next-line
  window.IMask(inputPhoneFormElement, {mask: '+{7} (000) 000-00-00'}); //используется плагин
  addValuePhoneField(inputPhoneFormElement);
  // END: реализует валидацию поля телефона при помощи плагина IMask + при фокусе на поле телефона появляется +7

  // START: плавная прокрутка по клику на ссылки
  var mainScreenButton = document.querySelector('.main-screen__button');
  var mainWrapperForm = document.querySelector('.main__wrapper-form');
  mainScreenButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    mainWrapperForm.scrollIntoView({
      behavior: 'smooth',
    });
  });

  var mainScreenLink = document.querySelector('.main-screen__link');
  var mainWrapper = document.querySelector('.main__wrapper');
  mainScreenLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    mainWrapper.scrollIntoView({
      behavior: 'smooth',
    });
  });
  // END: плавная прокрутка по клику на ссылки
})();

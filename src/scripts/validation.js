
export const arrayEnableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Добавление сообщения валидации
const showInputError = (formElement, inputElement, arrayEnableValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(arrayEnableValidation.inputErrorClass);
  errorElement.classList.add(arrayEnableValidation.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};
// Удаление сообщения валидации
const hideInputError = (formElement, inputElement, arrayEnableValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(arrayEnableValidation.inputErrorClass);
  errorElement.classList.remove(arrayEnableValidation.errorClass);
  errorElement.textContent = "";
};

// Проверка на валидность
const checkInputValidity = (formElement, inputElement, arrayEnableValidation) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, arrayEnableValidation);
  } else {
    hideInputError(formElement, inputElement, arrayEnableValidation);
  }
};

// Проверерка, есть ли не валидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
}

// Активация и деактивация кнопки
const toggleButtonState = (inputList, arrayEnableValidation, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(arrayEnableValidation.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(arrayEnableValidation.inactiveButtonClass);
  }
};

// Включение валидации
const setEventListeners = (formElement, arrayEnableValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(arrayEnableValidation.inputSelector));
  const buttonElement = formElement.querySelector(arrayEnableValidation.submitButtonSelector);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
          checkInputValidity(formElement, inputElement, arrayEnableValidation);
          toggleButtonState(inputList, arrayEnableValidation, buttonElement);
      });
  });
};

// Добавление обработчиков всем формам
const enableValidation = (arrayEnableValidation) => {
  const formList = Array.from(document.querySelectorAll(arrayEnableValidation.formSelector));

  formList.forEach((formElement) => {
      setEventListeners(formElement, arrayEnableValidation);
  })
}

// Очистка поля
function clearValidation(formElement, arrayEnableValidation) {
  const inputList = Array.from(formElement.querySelectorAll(arrayEnableValidation.inputSelector));
  const buttonElementReturn = formElement.querySelector(arrayEnableValidation.submitButtonSelector);

  inputList.forEach((inputElement) => hideInputError(formElement, inputElement, arrayEnableValidation));
  toggleButtonState(inputList, arrayEnableValidation, buttonElementReturn);
}

export { enableValidation, clearValidation };
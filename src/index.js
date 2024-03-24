import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { creatingCard, deleteCard, likeCard } from "./scripts/card.js";
import { arrayEnableValidation, clearValidation, enableValidation } from "./scripts/validation.js";

//______________________________________________________________________________


enableValidation(arrayEnableValidation);

//______________________________________________________________________________

// список карточек
const placesList = document.querySelector(".places__list");

// кнопки
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// попап профиль
const popupEditProfile = document.querySelector(".popup_type_edit");
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements["name"];
const jobInput = formElement.elements["description"];

const userName = document.querySelector(".profile__title");
const jobName = document.querySelector(".profile__description");

// попап добавления карточки
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardForm = document.forms["new-place"];
const popupAddCardNameInput = popupAddCardForm.elements["place-name"];
const popupAddCardLinkInput = popupAddCardForm.elements["link"];

// попап карточка
const popupOpenCard = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const cardName = document.querySelector(".popup__caption");

//____________________________________________________________________________

// Вывод карточки на страницу

initialCards.forEach(function (element) {
  placesList.append(
    creatingCard(element.name, element.link, deleteCard, likeCard, openPopupImg)
  );
});

//_______________________________________________________________________________

// попап редактирования профиля

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = jobName.textContent;
  clearValidation(formElement, arrayEnableValidation);
  openModal(popupEditProfile);
});

// Обработчик «отправки» формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  closeModal(popupEditProfile);
}

//слушатель клика по кнопке сохранения формы редактирования профиля
formElement.addEventListener("submit", handleEditProfileFormSubmit);

//_________________________________________________________________________________

// попап добавления карточки

buttonAddCard.addEventListener("click", () => {
  clearValidation(popupAddCardForm, arrayEnableValidation);
  openModal(popupAddCard);
});

// Обработчик «отправки» формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = popupAddCardNameInput.value;
  const linkValue = popupAddCardLinkInput.value;

  const addCard = creatingCard(
    nameValue,
    linkValue,
    deleteCard,
    likeCard,
    openPopupImg
  );

  placesList.prepend(addCard);
  popupAddCardForm.reset();
  closeModal(popupAddCard);
}

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

//_________________________________________________________________________________

// попапа карточка

function openPopupImg(evt) {
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  cardName.textContent = evt.target.alt;

  openModal(popupOpenCard);
}
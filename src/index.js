import "./pages/index.css";
// import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { creatingCard, deleteCard, likeCard } from "./scripts/card.js";
import {
  arrayEnableValidation,
  clearValidation,
  enableValidation,
} from "./scripts/validation.js";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  postCard,
  // cardDelete,
  updateAvatar,
} from "./scripts/api.js";

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

// попап аватар

const editAvatarPopup = document.querySelector(".popup_type_edit_avatar");
const popupEditAvatarForm = document.forms["new-avatar"];
const popupEditAvatarLinkInput = popupEditAvatarForm.elements["link"];

const profileImg = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__image_button");

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

// информация о пользователе
let userId = "";

function showUserInfo(userData) {
  userName.textContent = userData.name;
  jobName.textContent = userData.about;
  profileImg.setAttribute("style", `background-image:url(${userData.avatar})`);
  userId = userData._id;
  console.log(userId);
}

// Вывод карточeк на страницу

function showCards(cards, deleteCard, likeCard, openPopupImg, userId) {
  const cardElement = creatingCard(
    cards,
    deleteCard,
    likeCard,
    openPopupImg,
    userId
  );
  placesList.append(cardElement);
}

// Промис получения информации о пользователе и карточках

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    showUserInfo(user);
    cards.forEach((card) => {
      showCards(card, deleteCard, likeCard, openPopupImg, userId);
    });
  })
  .catch((err) => {
    console.log("Произошла ошибка при получении данных:", err);
  });

//_____________________________________________________________________________________

//открытие попапа изменения аватара
profileEditButton.addEventListener("click", function () {
  openModal(editAvatarPopup);
});

//Функция для изменения аватара
function updateAvatarImg(evt) {
  evt.preventDefault();
  popupEditAvatarForm.querySelector(".popup__button").textContent =
    "Сохранение...";
  updateAvatar(popupEditAvatarLinkInput)
    .then((res) => {
      profileImg.setAttribute("style", `background-image:url(${res.avatar})`);
    })
    .catch((err) => {
      console.log(`Произошла ошибка при отправке информации на сервер: ${err}`);
    })
    .finally(() => {
      popupEditAvatarForm.querySelector(".popup__button").textContent =
        "Сохранить";
    });
  closeModal(editAvatarPopup);
}

//слушатель клика по кнопке сохранения формы редактирования профиля
popupEditAvatarForm.addEventListener("submit", updateAvatarImg);

//_____________________________________________________________________________________

// открытие попап редактирование информации о пользователе

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = jobName.textContent;
  openModal(popupEditProfile);
});

// Обработчик «отправки» формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  formElement.querySelector(".popup__button").textContent = "Сохранение...";
  const newName = nameInput.value;
  const newJob = jobInput.value;
  updateUserInfo(newName, newJob)
    .then((userData) => {
      showUserInfo(userData);
    })
    .catch((err) => {
      console.log(`Произошла ошибка при отправке информации на сервер: ${err}`);
    })
    .finally(() => {
      formElement.querySelector(".popup__button").textContent = "Сохранить";
    });
  closeModal(popupEditProfile);
}

//слушатель клика по кнопке сохранения формы редактирования профиля
formElement.addEventListener("submit", handleEditProfileFormSubmit);

//_________________________________________________________________________________

// Открытие попап добавления карточки

buttonAddCard.addEventListener("click", () => {
  clearValidation(popupAddCardForm, arrayEnableValidation);
  openModal(popupAddCard);
});

// Обработчик «отправки» формы добавления карточки

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  popupAddCardForm.querySelector(".popup__button").textContent =
    "Сохранение...";
  const nameValue = popupAddCardNameInput.value;
  const linkValue = popupAddCardLinkInput.value;
  postCard(nameValue, linkValue)
    .then((card) => {
      const addCard = creatingCard(
        card,
        deleteCard,
        likeCard,
        openPopupImg,
        userId
      );
      placesList.prepend(addCard);
      popupAddCardForm.reset();
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(`Произошла ошибка при отправке информации на сервер: ${err}`);
    })
    .finally(() => {
      popupAddCardForm.querySelector(".popup__button").textContent =
        "Сохранить";
    });
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

//____________________________________________________________________________________

import { cardDelete, addLikeCard, deleteLikeCard } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function creatingCard(cards, deleteCard, likeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.textContent = cards.name;
  cardLikeNumber.textContent = cards.likes.length;

  // Скрытие кнопки удаления карточки если пользователь не является владельцем

  if (userId !== cards.owner._id) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.style.display = "block";
  }

  // Проверка наличия лайка пользователя в массиве likes

  const myLike = cards.likes.some((like) => like._id === userId);
  if (myLike) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  cardDeleteButton.addEventListener("click", () =>
    deleteCard(cardElement, cards._id)
  );
  buttonLike.addEventListener("click", () =>
    likeCard(buttonLike, cardLikeNumber, cards._id)
  );
  cardImage.addEventListener("click", openImage);

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(cardElement, cardId) {
  cardDelete(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Произошла ошибка отправки запроса:", err);
    });
}

// Функция подсчета лайков
export function likeCard(buttonLike, cardLikeNumber, id) {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(id)
      .then((res) => {
        buttonLike.classList.toggle("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log("Произошла ошибка отправки запроса:", err);
      });
  } else {
    addLikeCard(id)
      .then((res) => {
        buttonLike.classList.toggle("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log("Произошла ошибка отправки запроса:", err);
      });
  }
}

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function creatingCard(name, link, deleteCard, likeCard, openImage, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  // cardLikeNumber.textContent = likes.length;

// // Слушатель удаления карточки если пользователь является владельцем
//   if (userId !== cards.owner._id) {
//     cardDeleteButton.style.display = "none";
//     } else {
//       cardDeleteButton.addEventListener("click", () => {
//       const cardId = cards._id;
//       deleteCardCallback(cardElement , cardId);
//     });
//   }

  cardDeleteButton.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", likeCard);
  cardImage.addEventListener('click', openImage);

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(evt) {
  const deleteButtons = evt.target.closest(".card");
  deleteButtons.remove();
}

// Функция лайка
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

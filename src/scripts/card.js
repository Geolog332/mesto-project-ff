// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function creatingCard(name, link, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

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
  evt.target.classList.add("card__like-button_is-active");
}

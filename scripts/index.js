// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCards(name, link, cardDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => cardDelete(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = function (cardElement) {
  cardElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (Element) {
  placesList.append(addCards(Element.name, Element.link, deleteCard));
});



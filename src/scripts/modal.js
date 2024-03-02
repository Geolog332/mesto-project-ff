const closeEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

const closeOverlay = (evt) => {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

const closeCross = (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

export const openModal = (popup) => {
  popup.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
  popup.addEventListener("click", closeOverlay);
  document.addEventListener("click", closeCross);
};

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
  popup.addEventListener("click", closeOverlay);
  document.removeEventListener("click", closeCross);
};

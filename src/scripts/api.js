const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "5cd43e5f-02ef-4a47-9faf-3e1f49eaee29",
    "Content-Type": "application/json",
  },
};

// Функция для проверки данных

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция для отправки запроса
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Загрузка карточек с сервера

export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
};

// Загрузка информации о пользователе с сервера

export const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
};

// Отправка запроса на измененние информации пользователя

export const updateUserInfo = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  })
};

// Отправка новой карточки на сервер

export const postCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  })
};

// Запрос на удаление карточки

export const cardDelete = (id) => {
  return request(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
};

// Отправка запроса на изменения аватара

export const updateAvatar = (imageInput) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: imageInput.value }),
  })
};

//Отправка запроса на добавления лайка
export const addLikeCard = (id) => {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
};

//Отправка запроса на удаление лайка
export const deleteLikeCard = (id) => {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
};

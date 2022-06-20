
class Api {
  constructor({ baseUrl, token }) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _handleResponse(res) {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject('Ошибка')
  }
  //информация о пользователе
  getInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: { authorization: this.token }
    })
      .then(this._handleResponse);
  }
  //получение массива с карточками
  getItems() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: { authorization: this.token }
    })
    .then(this._handleResponse);
  }
  //ожидание исполнения двух промисов - с данными о пользователе и карточками
  getAllNeededData() {
    return Promise.all([this.getInfo(), this.getItems()]);
  }
  //редактирование профиля
  editProfile(formData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.job
      })
    })
    .then(this._handleResponse);
  }
  addCard(formData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._handleResponse);
  }
  addLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._handleResponse);
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._handleResponse);
  }

  changeLikeStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id)
    } else {
      return this.deleteLike(id)
    }
  }

  changeAvatar(formData) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: formData.avatar_link,
      })
    })
    .then(this._handleResponse);
  }
}


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  token: 'd9ecc7ea-74d4-4434-a19f-32ba4a822294'
})

export default api;
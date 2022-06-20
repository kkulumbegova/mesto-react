
import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {
  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false);
  const handleEditAvatarClick = () => {
    setEditAvatarState(true);
  }
  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false);
  const handleEditProfileClick = () => {
    setEditProfileState(true);
  }
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false);
  const handleAddPlaceClick = () => {
    setAddPlaceState(true);
  }

  const closeAllPopups = () => {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setSelectedCard({ name: '', likes: '', id: '', src: '' });
  }

  const [selectedCard, setSelectedCard] = React.useState({ name: '', likes: '', id: '', src: '' });
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }


  return (
    <>
      <div className="page__container">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer />
      </div>

      <PopupWithForm name='edit' title='Редактировать профиль' button='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input
          type="text"
          id="name"
          name="name"
          className="form__input form__input_type_name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          required
        />
        <span id="name-error" className="form__input-error"></span>

        <input
          type="text"
          id="job"
          name="job"
          className="form__input form__input_type_job"
          minLength="2"
          maxLength="200"
          placeholder="Род занятий"
          required
        />
        <span id="job-error" className="form__input-error"></span>
      </PopupWithForm>
      <PopupWithForm name='add' title='Добавить новое место' button='Сохранить' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input
          type="text"
          id="name-card"
          name="name"
          className="form__input form__input_type_card-name"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          required
        />
        <span id="name-card-error" className="form__input-error"></span>
        <input
          type="url"
          id="link"
          name="link"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="link-error" className="form__input-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm name='confirm' title='Вы уверены?' button='Да'>
      </PopupWithForm>
      <PopupWithForm name='avatar' title='Обновить аватар' button='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input
          type="url"
          id="avatar_link"
          name="avatar_link"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="avatar_link-error" className="form__input-error"></span>
      </PopupWithForm>
    </>
  );
}

export default App;

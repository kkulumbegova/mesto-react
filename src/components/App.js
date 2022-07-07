import { useEffect, useState } from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js'
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from "./AddPlacePopup.js"

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInfo().then((res) => {
      setCurrentUser(res);
    })
      .catch((err) => { console.log(err); })
  }, [])

  useEffect(() => {
    api.getItems().then((res) => {
      setCards(
        res.map(item => ({
          name: item.name,
          likes: item.likes,
          id: item._id,
          src: item.link,
          owner: item.owner._id,
        }))
      )
    })
      .catch((err) => { console.log(err); })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((el) => { return el._id === currentUser._id }
    );
    api.changeLikeStatus(card.id, !isLiked).then((newCard) => {
      setCards((state) => {
        return state.map((c) => c.id === card.id ?
          {
            name: newCard.name,
            likes: newCard.likes,
            id: newCard._id,
            src: newCard.link,
            owner: newCard.owner._id,
          } : c)
      }
      );
    })
      .catch((err) => { console.log(err); });
  }
  function handleDeleteCard(card) {
    api.deleteCard(card.id).then(() => {
      setCards(state => {
        return state.filter((el) => el.id !== card.id)
      })
    })
      .catch((err) => { console.log(err); })
  }

  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const handleEditAvatarClick = () => {
    setEditAvatarState(true);
  }
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const handleEditProfileClick = () => {
    setEditProfileState(true);
  }
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const handleAddPlaceClick = () => {
    setAddPlaceState(true);
  }

  const closeAllPopups = () => {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setSelectedCard({ name: '', likes: '', id: '', src: '' });
  }

  const [selectedCard, setSelectedCard] = useState({ name: '', likes: '', id: '', src: '' });
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const handleUpdateUser = (formData) => {
    api.editProfile(formData).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => { console.log(err); })
  }

  const handleUpdateAvatar = (formData) => {
    api.changeAvatar(formData).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => { console.log(err); })
  }

  const handleAddPlaceSubmit = (formData) => {
    api.addCard(formData).then((res) => {
      const newCard = {
        name: res.name,
        likes: res.likes,
        id: res._id,
        src: res.link,
        owner: res.owner._id,
      };
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => { console.log(err); })
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header />
          <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
            cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteCard} />
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm name='confirm' title='Вы уверены?' button='Да'>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

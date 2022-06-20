import React, { useEffect } from 'react';
import api from '../utils/api.js'
import Card from './Card.js';


export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api.getInfo().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    })
      .catch((err) => { console.log(err); })
  }, [])

  useEffect(() => {
    api.getItems().then((res) => {
      setCards(
        res.map(item => ({
          name: item.name,
          likes: item.likes.length,
          id: item._id,
          src: item.link
        }))
      )
    })
      .catch((err) => { console.log(err); })
  }, [])

  return (
    <div className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}></div>
        <h1 className="profile__name">{userName}</h1>
        <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
        <h2 className="profile__description">{userDescription}</h2>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) =>
            <Card name={card.name} likes={card.likes} key={card.id} src={card.src} onCardClick={onCardClick}></Card>
          )}
        </ul>
      </section>
    </div>
  )
}


import React from "react";
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {api} from "../utils/Api";



export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) 
{
  const errShow = (err) => console.log(err)
  const [cards, setCards] =React.useState([])
  const {name, about, avatar} = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    api.getInitialCards()
    .then((value) => {
      setCards(value)
    })
    .catch(errShow);
  }, []);
  const handleCardLike = (id, isLiked) => {
    const likeShow = newCard => {
      const newCards =   cards.map(card => card._id === newCard._id ? newCard : card);
      setCards(newCards)
    }
    if (isLiked) {
      api.deleteLike(id).then(likeShow).catch(errShow);
    } else {
      api.setLike(id).then(likeShow).catch(errShow);
    }
  }

  const handleCardDelete = (id) => {
    api.deleteCard(id).then(() => {
      const newCards =   cards.filter(card => card._id !== id);
      setCards(newCards)
    })
    
  }
  return (
    <main>
      <section className="profile">
        <div className="profile__inner-wrapper profile__inner-wrapper_place_profile">
          <img alt="Аватар" className="profile__avatar" src={avatar} />
          <button
            className="profile__avatar-overlay"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="profile__inner-wrapper profile__inner-wrapper_place_name">
              <h1 className="profile__name">{name}</h1>
              <button
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="card__container">
        {cards.map((item) => {
          return (
            <Card
              onCardClick={onCardClick}
              likes = {item.likes}
              ownerId={item.owner._id}
              key={item._id}
              title={item.name}
              url={item.link}
              cardId={item._id}
              onCardLike= {handleCardLike
              }
              onCardDelete= {handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

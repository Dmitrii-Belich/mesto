import React from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";

export default function Main (props) {
  const [cards, setCards] = React.useState([]);
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [userId, setUserId] = React.useState("");

React.useEffect(() =>  {
    api.getInitialCards().then((value) => {
      setCards(value);
    });
    api.getUserInformation().then((value) => {
        setAvatarUrl(value.avatar);
        setName(value.name);
        setAbout(value.about);
        setUserId(value._id);
    })
  })
    return (
      <main>
        <section className="profile">
          <div className="profile__inner-wrapper profile__inner-wrapper_place_profile">
            <img
              alt="Аватар"
              className="profile__avatar"
              src={avatarUrl}
            />
            <button
              className="profile__avatar-overlay"
              onClick={props.onEditAvatar}
            ></button>
            <div className="profile__info">
              <div className="profile__inner-wrapper profile__inner-wrapper_place_name">
                <h1 className="profile__name">{name}</h1>
                <button
                  className="profile__edit-button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__subtitle">{about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="card__container">
          {cards.map((item) => {
            return (
              <Card
                userId={userId}
                onCardClick={props.onCardClick}
                isLiked={item.likes.some((item) => {
                  return item._id === userId;
                })}
                ownerId={item.owner._id}
                key={item._id}
                title={item.name}
                url={item.link}
                likeCount={item.likes.length}
                cardId = {item._id}
                onDelete = {props.onDelete}
              />
            );
          })}
        </section>
      </main>
    );
  
}

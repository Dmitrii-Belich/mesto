import React from "react";

import Card from "./Card.js";

export default function Main(props) {
  return (
    <main>
      <section className="profile">
        <div className="profile__inner-wrapper profile__inner-wrapper_place_profile">
          <img alt="Аватар" className="profile__avatar" src={props.avatarUrl} />
          <button
            className="profile__avatar-overlay"
            onClick={props.onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="profile__inner-wrapper profile__inner-wrapper_place_name">
              <h1 className="profile__name">{props.name}</h1>
              <button
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{props.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="card__container">
        {props.cards.map((item) => {
          return (
            <Card
              userId={props.userId}
              onCardClick={props.onCardClick}
              isLiked={item.likes.some((item) => {
                return item._id === props.userId;
              })}
              ownerId={item.owner._id}
              key={item._id}
              title={item.name}
              url={item.link}
              likeCount={item.likes.length}
              cardId={item._id}
              onDelete={props.onDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

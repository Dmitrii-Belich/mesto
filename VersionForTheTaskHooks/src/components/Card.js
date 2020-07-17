import React from "react";

export default function Card (props) {
    return (
      <div className="card">
        <img
          alt="Изображение карточки"
          className="card__image"
          onClick={() => {
            props.onCardClick({
              url: props.url,
              title: props.title,
            });
          }}
          src={props.url}
        />
        <h2 className="card__title">{props.title}</h2>
        <button
          className={`card__like ${
            props.isLiked ? "card__like_mode_active" : ""
          }`}
        ></button>
        <p className="card__like-count">{props.likeCount}</p>
        {props.ownerId === props.userId ? (
          <button className="card__delete"></button>
        ) : ("")}
      </div>
    );
  
}

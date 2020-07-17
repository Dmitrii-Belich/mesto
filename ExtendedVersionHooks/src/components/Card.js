import React from "react";
import { api } from "../utils/Api.js";

export default function Card (props) {
    const [isLiked, setIsLiked] = React.useState(props.isLiked)
    const [likeCount, setLikeCount] = React.useState(props.likeCount)
    const [cardExist, setCardExist] = React.useState(true)
    const likeButtonHandler = () => {
      let action;
      if (isLiked) {
        action = api.deleteLike(props.cardId);
      } else {
        action = api.setLike(props.cardId);
      }
      return action
        .then((data) => {
            setIsLiked( !isLiked)
            setLikeCount(data.likes.length)
        })
        .catch((err) => {
          console.log(err);
        });
    };
 const cardDelete =  async () =>{
   console.log('Удаляю')
    let isSucssesful = false;
    await api
      .deleteCard(props.cardId)
      .then(() => {
        setCardExist(false);
        isSucssesful = true;
      })
      .catch((err) => {
        console.log(err);
      });
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  }

    if (cardExist) {
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
            onClick={likeButtonHandler}
            className={`card__like ${
              isLiked ? "card__like_mode_active" : ""
            }`}
          ></button>
          <p className="card__like-count">{likeCount}</p>
          {props.ownerId === props.userId ? (
            <button
              className="card__delete"
              onClick={() => {
                props.onDelete(cardDelete);

              }}
            ></button>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return "";
    }
  
}

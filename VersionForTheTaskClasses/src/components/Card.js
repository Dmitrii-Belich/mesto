import React from "react";
import { api } from "../utils/Api.js";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.isLiked,
      likeCount: this.props.likeCount,
      cardExist: true,
    };

    this.likeButtonHandler = () => {
      let action;
      if (this.state.isLiked) {
        action = api.deleteLike(this.props.cardId);
      } else {
        action = api.setLike(this.props.cardId);
      }
      return action
        .then((data) => {
          this.setState({
            isLiked: !this.state.isLiked,
            likeCount: data.likes.length,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
  async cardDelete() {
    let isSucssesful = false;
    await api
      .deleteCard(this.props.cardId)
      .then(() => {
        this.setState({ cardExist: false });
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
  render() {
    if (this.state.cardExist) {
      return (
        <div className="card">
          <img
            alt="Изображение карточки"
            className="card__image"
            onClick={() => {
              this.props.onCardClick({
                url: this.props.url,
                title: this.props.title,
              });
            }}
            src={this.props.url}
          />
          <h2 className="card__title">{this.props.title}</h2>
          <button
            onClick={this.likeButtonHandler}
            className={`card__like ${
              this.state.isLiked ? "card__like_mode_active" : ""
            }`}
          ></button>
          <p className="card__like-count">{this.state.likeCount}</p>
          {this.props.ownerId === this.props.userId ? (
            <button
              className="card__delete"
              onClick={() => {
                this.props.onDelete(this);
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
}

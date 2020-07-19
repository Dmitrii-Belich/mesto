import React from "react";

export default class Card extends React.Component {
  render() {
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
          className={`card__like ${
            this.props.isLiked && "card__like_mode_active"
          }`}
        ></button>
        <p className="card__like-count">{this.props.likeCount}</p>
        {this.props.ownerId === this.props.userId && (
          <button className="card__delete"></button>
        )}
      </div>
    );
  }
}

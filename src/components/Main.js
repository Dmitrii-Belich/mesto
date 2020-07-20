import React from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      avatarUrl: "",
      name: "",
      about: "",
      userId: "",
    };
  }

  componentDidMount() {
    Promise.all([api.getInitialCards(), api.getUserInformation()])
      .then((values) => {
        const cards = values[0];
        const userInfo = values[1];
        this.setState({
          avatarUrl: userInfo.avatar,
          name: userInfo.name,
          about: userInfo.about,
          userId: userInfo._id,
          cards: cards,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <main>
        <section className="profile">
          <div className="profile__inner-wrapper profile__inner-wrapper_place_profile">
            <img
              alt="Аватар"
              className="profile__avatar"
              src={this.state.avatarUrl}
            />
            <button
              className="profile__avatar-overlay"
              onClick={this.props.onEditAvatar}
            ></button>
            <div className="profile__info">
              <div className="profile__inner-wrapper profile__inner-wrapper_place_name">
                <h1 className="profile__name">{this.state.name}</h1>
                <button
                  className="profile__edit-button"
                  onClick={this.props.onEditProfile}
                ></button>
              </div>
              <p className="profile__subtitle">{this.state.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            onClick={this.props.onAddPlace}
          ></button>
        </section>

        <section className="card__container">
          {this.state.cards.map((item) => {
            return (
              <Card
                userId={this.state.userId}
                onCardClick={this.props.onCardClick}
                isLiked={item.likes.some((item) => {
                  return item._id === this.state.userId;
                })}
                ownerId={item.owner._id}
                key={item._id}
                title={item.name}
                url={item.link}
                likeCount={item.likes.length}
                cardId={item._id}
                onDelete={this.props.onDelete}
              />
            );
          })}
        </section>
      </main>
    );
  }
}

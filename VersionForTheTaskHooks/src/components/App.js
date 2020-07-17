import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { popupsInfo } from "../utils/constants.js";
import { api } from "../utils/Api.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      editPopupState: false,
      addPopupState: false,
      avatarPopupState: false,
      deletePopupState: false,
      imgPopupState: false,
      selectedCard: "",
      userId: "",
      cards: [],
      avatarUrl: "",
      name: "",
      about: "",
    };
    this.closeAllPopups = () => {
      this.setState({
        editPopupState: false,
        addPopupState: false,
        avatarPopupState: false,
        deletePopupState: false,
        imgPopupState: false,
        selectedCard: "",
      });
    };
    this.isEditProfilePopupOpen = () => {
      this.setState({ editPopupState: true });
    };
    this.isAddPlacePopupOpen = () => {
      this.setState({ addPopupState: true });
    };
    this.isEditAvatarPopupOpen = () => {
      this.setState({ avatarPopupState: true });
    };
    this.handleCardClick = (card) => {
      this.setState({ selectedCard: card, imgPopupState: true });
    };
    this.handleDeleteClick = (card) => {
      this.setState({ deletePopupState: true, selectedCard: card });
      console.log(card);
    };
    this.deletePopupSubmitHandler = async () => {
      let isSucssesful = false;
      await this.state.selectedCard.cardDelete().then(() => {
        isSucssesful = true;
        this.closeAllPopups();
      });
      if (isSucssesful) {
        return Promise.resolve();
      }
      return Promise.reject();
    };
    this.avatarPopupSubmitHandler = async (inputs) => {
      let isSucssesful = false;
      console.log(inputs.avatar);
      await api.setUserAvatar(inputs).then((data) => {
        this.setState({ avatarUrl: data.avatar });
        isSucssesful = true;
        this.closeAllPopups();
      });
      if (isSucssesful) {
        return Promise.resolve();
      }
      return Promise.reject();
    };
    this.addPopupSubmitHandler = async (inputs) => {
      let isSucssesful = false;
      await api
        .createCard({ name: inputs.title, link: inputs.url })
        .then((card) => {
          console.log(card);
          this.setState({ cards: [card, ...this.state.cards] });
          console.log(this.state.cards);
          isSucssesful = true;
          this.closeAllPopups();
        });
      if (isSucssesful) {
        return Promise.resolve();
      }
      return Promise.reject();
    };
    this.editPopupSubmitHandler = async (inputs) => {
      let isSucssesful = false;
      await api
        .setUserInfo({
          name: inputs.forename,
          about: inputs.job,
        })
        .then((data) => {
          this.setState({
            name: data.name,
            about: data.about,
          });

          isSucssesful = true;
          this.closeAllPopups();
        });
      if (isSucssesful) {
        return Promise.resolve();
      }
      return Promise.reject();
    };
  }

  componentDidMount() {
    api.getInitialCards().then((value) => {
      this.setState({ cards: value });
    });
    api.getUserInformation().then((value) => {
      console.log(value._id);
      this.setState({
        avatarUrl: value.avatar,
        name: value.name,
        about: value.about,
        userId: value._id,
      });
    });
  }

  render() {
    return (
      <>
        <Header />
        <Main
          onEditAvatar={this.isEditAvatarPopupOpen}
          onEditProfile={this.isEditProfilePopupOpen}
          onAddPlace={this.isAddPlacePopupOpen}
          onCardClick={this.handleCardClick}
          onDelete={this.handleDeleteClick}
          cards={this.state.cards}
          avatarUrl={this.state.avatarUrl}
          name={this.state.name}
          about={this.state.about}
          userId={this.state.userId}
        />
        <Footer />
        <PopupWithImage
          onClose={this.closeAllPopups}
          card={this.state.selectedCard}
          isOpen={this.state.imgPopupState}
        />
        {popupsInfo.map((item) => {
          return (
            <PopupWithForm
              key={item.name}
              isOpen={this.state[`${item.name}PopupState`]}
              onSubmitForm={this[`${item.name}PopupSubmitHandler`]}
              settings={item}
              onClose={this.closeAllPopups}
              forename={this.state.name}
              job= {this.state.about}
            />
          );
        })}
      </>
    );
  }
}

export default App;

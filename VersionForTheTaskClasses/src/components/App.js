import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { popupsInfo } from "../utils/constants.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      editPopupState: false,
      addPopupState: false,
      avatarPopupState: false,
      deletePopupState: false,
      imgPopupState: false,
      selectedCard: {},
    };
    this.closeAllPopups = () => {
      this.setState({
        editPopupState: false,
        addPopupState: false,
        avatarPopupState: false,
        deletePopupState: false,
        imgPopupState: false,
        selectedCard: {},
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
              settings={item}
              onClose={this.closeAllPopups}
            />
          );
        })}
      </>
    );
  }
}

export default App;

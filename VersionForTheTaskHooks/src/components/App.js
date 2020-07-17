import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { popupsInfo } from "../utils/constants.js";

export default function App() {

  const [editPopupState, setEditPopupState] = React.useState(false);
  const [addPopupState, setAddPopupState] = React.useState(false);
  const [avatarPopupState, setAvatarPopupState] = React.useState(false);
  const [deletePopupState, setDeletePopupState] = React.useState(false);
  const [imgPopupState, setImgPopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const popupsState = {
    editPopupState,
    addPopupState,
    avatarPopupState,
    deletePopupState,
    imgPopupState,
    selectedCard,
  };

  const closeAllPopups = () => {
    setEditPopupState(false);
    setAddPopupState(false);
    setAvatarPopupState(false);
    setDeletePopupState(false);
    setImgPopupState(false);
    setSelectedCard({});
  };

  const isEditProfilePopupOpen = () => {
    setEditPopupState(true);
  };

  const isAddPlacePopupOpen = () => {
    setAddPopupState(true);
  };

  const isEditAvatarPopupOpen = () => {
    setAvatarPopupState(true);
  };
  
  const handleCardClick = (card) => {
    setImgPopupState(true);
    setSelectedCard(card);
  };

  return (
    <>
      <Header />
      <Main
        onEditAvatar={isEditAvatarPopupOpen}
        onEditProfile={isEditProfilePopupOpen}
        onAddPlace={isAddPlacePopupOpen}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithImage
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={imgPopupState}
      />
      {popupsInfo.map((item) => {
        return (
          <PopupWithForm
            key={item.name}
            isOpen={popupsState[`${item.name}PopupState`]}
            settings={item}
            onClose={closeAllPopups}
          >
            {item.children}{" "}
          </PopupWithForm>
        );
      })}
    </>
  );
}

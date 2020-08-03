import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithImage from "./PopupWithImage";
import EditProfilePopup from "./EditProfilePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';



export default function App() {

  const [editPopupState, setEditPopupState] = React.useState(false);
  const [addPopupState, setAddPopupState] = React.useState(false);
  const [avatarPopupState, setAvatarPopupState] = React.useState(false);
  const [deletePopupState, setDeletePopupState] = React.useState(false);
  const [imgPopupState, setImgPopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({})
  

  React.useEffect(() => {
    api.getUserInformation()
    .then((value) => {
      setCurrentUser(value)
    })
    .catch((err) => console.log(err));
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
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
      <EditProfilePopup 
      isOpen={editPopupState}
      onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider>
  );
}

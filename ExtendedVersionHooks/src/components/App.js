import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { popupsInfo } from "../utils/constants.js";
import { api } from "../utils/Api.js";

export default function App() {
  const [editPopupState, setEditPopupState] = React.useState(false);
  const [addPopupState, setAddPopupState] = React.useState(false);
  const [avatarPopupState, setAvatarPopupState] = React.useState(false);
  const [deletePopupState, setDeletePopupState] = React.useState(false);
  const [imgPopupState, setImgPopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [userId, setUserId] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [deleteCardFunction, setDeleteCardFunction] = React.useState({})
  const closeAllPopups = () => {
    setEditPopupState(false);
    setAddPopupState(false);
    setAvatarPopupState(false);
    setDeletePopupState(false);
    setImgPopupState(false);
    setSelectedCard({});
    setDeleteCardFunction({})
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
    setSelectedCard(card);
    setImgPopupState(true);
  };
  const handleDeleteClick = (deleteCard) => {
    setDeletePopupState(true);
    setDeleteCardFunction({deleteCard});
  };
  const deletePopupSubmitHandler = async () => {
    console.log(deleteCardFunction)
    let isSucssesful = false;
    await deleteCardFunction.deleteCard().then(() => {
      isSucssesful = true;
      closeAllPopups();
    });
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const avatarPopupSubmitHandler = async (inputs) => {
    let isSucssesful = false;
    await api.setUserAvatar(inputs).then((data) => {
      setAvatarUrl(data.avatar);
      isSucssesful = true;
      closeAllPopups();
    });
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const addPopupSubmitHandler = async (inputs) => {
    let isSucssesful = false;
    await api
      .createCard({ name: inputs.title, link: inputs.url })
      .then((card) => {
        setCards([card, ...cards]);
        isSucssesful = true;
        closeAllPopups();
      });
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const editPopupSubmitHandler = async (inputs) => {
    let isSucssesful = false;
    await api
      .setUserInfo({
        name: inputs.forename,
        about: inputs.job,
      })
      .then((data) => {
        setName(data.name);
        setAbout(data.about);
        isSucssesful = true;
        closeAllPopups();
      });
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  const PopupsData = {
    editPopupState,
  addPopupState,
  avatarPopupState, 
  deletePopupState,
  deletePopupSubmitHandler,
  avatarPopupSubmitHandler,
  addPopupSubmitHandler,
  editPopupSubmitHandler,
  }
  React.useEffect(() =>  {
    api.getInitialCards().then((value) => {
      setCards(value);
    });
    api.getUserInformation().then((value) => {
        setAvatarUrl(value.avatar);
        setName(value.name);
        setAbout(value.about);
        setUserId(value._id);
    })
  })
  return (
    <>
      <Header />
      <Main
        onEditAvatar={isEditAvatarPopupOpen}
        onEditProfile={isEditProfilePopupOpen}
        onAddPlace={isAddPlacePopupOpen}
        onCardClick={handleCardClick}
        onDelete={handleDeleteClick}
        cards={cards}
        avatarUrl={avatarUrl}
        name={name}
        about={about}
        userId={userId}
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
            isOpen={PopupsData[`${item.name}PopupState`]}
            onSubmitForm={PopupsData[`${item.name}PopupSubmitHandler`]}
            settings={item}
            onClose={closeAllPopups}
            forename={name}
            job={about}
          />
        );
      })}
    </>
  );
}

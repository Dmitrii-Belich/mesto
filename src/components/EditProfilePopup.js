import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Input from './ui/Input'

import Popup from "./Popup"

export default function EditProfilePopup({ isOpen, onClose}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [buttonText, setButtonText] =React.useState('Сохранить');
    const [name, setName] = React.useState('');
    const [desctiption, setDescription] = React.useState('')
    const inputChangers = {
        name: setName,
        description: setDescription
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]);

      const inputHandler = (value, name) => {
        inputChangers[name](value)
      }
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className="popup__container" name='edit' noValidate>
        <h2 className="popup__title">Редактировать профиль</h2>
        <Input
          type="text"
          className="popup__input"
          name="name"
          required
          minLength="2"
          maxLength="40"
          pattern="[ёЁА-Яа-яA-Za-z -]{1,}"
          value={name}
          update={isOpen}
          onChange={inputHandler}
        />
        <Input
          type="text"
          className="popup__input"
          name="description"
          required
          minLength="2"
          maxLength="200"
          update={isOpen}
          value={desctiption}
          onChange={inputHandler}
        />
        <button type="submit" className="popup__save">{buttonText}
        </button>
        <button
          type="button"
          className="popup__exit-button"
          onClick={onClose}
        ></button>
      </form>
    </Popup>
  );
}

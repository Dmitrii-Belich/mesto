import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Input from './ui/Input'

import PopupWithForm from "./PopupWithForm"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [buttonText, setButtonText] =React.useState('Сохранить');
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about)
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
      const handleSubmit = (evt) => {
        evt.preventDefault()
        setButtonText('Сохранение...')
        onUpdateUser({
          name,
          about: description,
        }).then(() => {
          setButtonText('Сохранить')
        }).catch(() => {
          setButtonText('Ошибка')
        });
      }
  return (
    <PopupWithForm  isOpen={isOpen} onClose={onClose} title="Редактировать профиль" name="edit" buttonText={buttonText} onSubmit={handleSubmit}>
        <Input
          type="text"
          className="popup__input"
          name="name"
          required
          minLength="2"
          maxLength="40"
          pattern="[ёЁА-Яа-яA-Za-z -]{1,}"
          value={name || ''}
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
          value={description || ''}
          onChange={inputHandler}
        /> 
    </PopupWithForm >
  );
}

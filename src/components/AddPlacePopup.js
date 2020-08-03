import React from "react";
import Input from "./ui/Input";

import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [buttonText, setButtonText] = React.useState("Создать");
  const [title, setTitle] = React.useState('')
  const [url, setUrl] = React.useState('');
 const inputChangers = {
     title: setTitle,
     url: setUrl
 }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText("Создание...");

    onAddPlace({ name: title, link: url})
      .then(() => {
        setButtonText("Создать");
      })
      .catch(() => {
        setButtonText("Ошибка");
      });
  };
  const inputHandler = (value, name) => {
    inputChangers[name](value)
   }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="add"
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
              <Input
          type="text"
          className="popup__input"
          name="title"
          required
          placeholder="Название"
          minLength="1"
          maxLength="30"
          value={title || ''}
          update={isOpen}
          onChange={inputHandler}
        />
         <Input
          type="url"
          className="popup__input"
          pattern=".+\.(jpg|png)"
          name="url"
          required
          placeholder="Ссылка на картинку"
          update={isOpen}
          value={url || ''}
          onChange={inputHandler}
        /> 
    </PopupWithForm>
  );
}

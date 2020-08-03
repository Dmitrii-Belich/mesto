import React from "react";
import Input from "./ui/Input";

import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonText, setButtonText] = React.useState("Сохранить");
 //  const inputRef = React.useRef() если использовать ref
  const [url, setUrl] = React.useState('');
  const inputHandler = (value) => {
    setUrl(value)
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText("Сохранение...");
    // onUpdateAvatar(inputRef.current.value) если использовать ref
    onUpdateAvatar (url)
      .then(() => {
        setButtonText("Сохранить");
      })
      .catch(() => {
        setButtonText("Ошибка");
      });
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <Input
  //     ref={inputRef} если использовать ref, и использовать обычный input
        type="url"
        className="popup__input"
        pattern=".+\.(jpg|png)"
        name="avatar"
        required
        placeholder="Введите ссылку"
        value={url}
        update={isOpen} 
        onChange={inputHandler}
      />
    </PopupWithForm>
  );
}

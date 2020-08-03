import React from "react";

import Popup from "./Popup"

export default function EditProfilePopup({ isOpen, onClose, onSubmit, title, buttonText, children, name}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className="popup__container" name={name} noValidate onSubmit={onSubmit}>
        <h2 className="popup__title">{title}</h2>
        {children}
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
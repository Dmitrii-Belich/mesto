import React from "react";

export default function PopupWithForm({settings, isOpen, children, onClose}) {
  return (
    <div
      className={`popup popup_target_${settings.name} ${
        isOpen && "popup_display_opened"
      }`}
    >
      <form className="popup__container" name={settings.name} noValidate>
        <h2 className="popup__title">{settings.title}</h2>
        {children}
        <button type="submit" className="popup__save">
          {settings.buttonTitle}
        </button>
        <button
          type="button"
          className="popup__exit-button"
          onClick={onClose}
        ></button>
      </form>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  );
}

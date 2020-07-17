import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_target_${props.settings.name} ${
        props.isOpen && "popup_display_opened"
      }`}
    >
      <form className="popup__container" name={props.settings.name} noValidate>
        <h2 className="popup__title">{props.settings.title}</h2>
        {props.children}
        <button type="submit" className="popup__save">
          {props.settings.buttonTitle}
        </button>
        <button
          type="button"
          className="popup__exit-button"
          onClick={props.onClose}
        ></button>
      </form>
      <div className="popup__overlay" onClick={props.onClose}></div>
    </div>
  );
}

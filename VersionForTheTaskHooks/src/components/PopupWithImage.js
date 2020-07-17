import React from "react";

export default function PopupWithImage (props) {
    return (
      <div
        className={`popup popup_target_img ${
          props.isOpen ? "popup_display_opened" : ""
        }`}
      >
        <div className="popup__image-container">
          <img
            alt={props.card.title}
            className="popup__image"
            src={props.card.url}
          />
          <h2 className="popup__image-title">{props.card.title}</h2>
          <button
            className="popup__exit-button"
            onClick={props.onClose}
          ></button>
        </div>
        <div className="popup__overlay" onClick={props.onClose}></div>
      </div>
    );
  
}

import React from "react";

export default function PopupWithImage ({isOpen, card, onClose}){
    return (
      <div
        className={`popup popup_target_img ${
          isOpen && "popup_display_opened"
        }`}
      >
        <div className="popup__image-container">
          <img
            alt={card.title}
            className="popup__image"
            src={card.url}
          />
          <h2 className="popup__image-title">{card.title}</h2>
          <button
            className="popup__exit-button"
            onClick={onClose}
          ></button>
        </div>
        <div className="popup__overlay" onClick={onClose}></div>
      </div>
    );
  
}

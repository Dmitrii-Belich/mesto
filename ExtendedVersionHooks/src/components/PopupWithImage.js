import React from "react";
import Popup from "./Popup.js";
export default function PopupWithImage(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <div className="popup__image-container">
        <img
          alt={props.card.title}
          className="popup__image"
          src={props.card.url}
        />
        <h2 className="popup__image-title">{props.card.title}</h2>
        <button className="popup__exit-button" onClick={props.onClose}></button>
      </div>
    </Popup>
  );
}

import React from "react";
import Popup from "./Popup.js";
export default class PopupWithImage extends React.Component {
  render() {
    return (
      <Popup isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <div className="popup__image-container">
          <img
            alt={this.props.card.title}
            className="popup__image"
            src={this.props.card.url}
          />
          <h2 className="popup__image-title">{this.props.card.title}</h2>
          <button
            className="popup__exit-button"
            onClick={this.props.onClose}
          ></button>
        </div>
      </Popup>
    );
  }
}

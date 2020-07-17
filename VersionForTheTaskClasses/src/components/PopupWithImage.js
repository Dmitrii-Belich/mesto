import React from "react";

export default class PopupWithImage extends React.Component {
  render() {
    return (
      <div
        className={`popup popup_target_img ${
          this.props.isOpen && "popup_display_opened"
        }`}
      >
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
        <div className="popup__overlay" onClick={this.props.onClose}></div>
      </div>
    );
  }
}

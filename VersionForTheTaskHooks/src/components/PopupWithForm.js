import React from "react";

export default class PopupWithForm extends React.Component {
  render() {
    return (
      <div
        className={`popup popup_target_${this.props.settings.name} ${
          this.props.isOpen ? "popup_display_opened" : ""
        }`}
      >
        <form
          className="popup__container"        
          name={this.props.settings.name}
          noValidate
        >
          <h2 className="popup__title">{this.props.settings.title}</h2>
          {this.props.settings.children}
          <button
            type="submit"
            className="popup__save"
          >
            {this.props.settings.buttonTitle}
          </button>
          <button
            type="button"
            className="popup__exit-button"
            onClick={this.props.onClose}
          ></button>
        </form>
        <div
          className="popup__overlay"
          onClick={this.props.onClose}
        ></div>
      </div>
    );
  }
}

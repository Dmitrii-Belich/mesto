import React from "react";

export default class Popup extends React.Component {
  render() {
    return (
      <div
        className={`popup popup_target_img ${
          this.props.isOpen && "popup_display_opened"
        }`}
      >
        {this.props.children}

        <div className="popup__overlay" onClick={this.props.onClose}></div>
      </div>
    );
  }
}

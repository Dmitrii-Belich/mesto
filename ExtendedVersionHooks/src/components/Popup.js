import React from "react";

export default function Popup(props) {
  return (
    <div
      className={`popup popup_target_img ${
        props.isOpen ? "popup_display_opened" : ""
      }`}>
      {props.children}
      <div className="popup__overlay" onClick={props.onClose}></div>
    </div>
  );
}

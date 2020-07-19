import React from "react";
import logo from "../images/logo.svg";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
      </header>
    );
  }
}

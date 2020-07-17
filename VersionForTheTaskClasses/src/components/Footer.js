import React from "react";

export default class Footer extends React.Component {
  componentDidMount() {
    this.year = new Date().getFullYear();
}
  render() {
    return (
      <footer className="footer">
        <p className="footer__copyright">&copy; {this.year} Mesto Russia</p>
      </footer>
    );
  }
}

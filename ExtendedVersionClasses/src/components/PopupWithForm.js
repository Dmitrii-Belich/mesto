import React from "react";
import Popup from "./Popup.js";
import Input from "./ui/Input.js";

export default class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialInputs = {};
    this.initialValidity = {};
    if (this.props.settings.name === "avatar") {
      this.initialInputs = { avatar: "" };
      this.initialValidity = { avatar: false };
    }
    if (this.props.settings.name === "edit") {
      this.initialInputs = {
        forename: this.props.forename,
        job: this.props.job,
      };

      this.initialValidity = { forename: true, job: true };
    }
    if (this.props.settings.name === "add") {
      this.initialInputs = { title: "", url: "" };
      this.initialValidity = { title: false, url: false };
    }
    this.state = {
      buttonText: this.props.settings.buttonTitle,
      inputs: this.initialInputs,
      validity: this.initialValidity,
    };
    this.inputOnChange = (value, name, validity) => {
      const newInputs = { ...this.state.inputs };
      newInputs[name] = value;
      const newValidity = { ...this.state.validity };
      newValidity[name] = validity;
      this.setState({ validity: newValidity, inputs: newInputs });
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.settings.name === "edit" &&
      (this.props.forename !== prevProps.forename ||
        this.props.job !== prevProps.job)
    ) {
      this.setState({
        inputs: { forename: this.props.forename, job: this.props.job },
      });
    }
  }
  isFormValid() {
    if (this.state.validity) {
      if (!Object.values(this.state.validity).length) {
        return true;
      }
      return Object.values(this.state.validity).reduce(
        (previousValue, currentItem) => {
          return previousValue && currentItem;
        }
      );
    }
  }
  _clearInputs() {
    if (this.props.settings.name === "edit") {
      this.setState({
        inputs: { forename: this.props.forename, job: this.props.job },
        validity: this.initialValidity,
      });
    } else {
      this.setState({
        inputs: this.initialInputs,
        validity: this.initialValidity,
      });
    }
  }
  _submitProcess() {
    this.setState({ buttonText: this.props.settings.buttonLoadingTitle });
  }
  _submitError() {
    this.setState({ buttonText: "Ошибка" });
  }
  _submitSuccessfully() {
    this.setState({ buttonText: this.props.settings.buttonTitle });
  }
  render() {
    return (
      <Popup isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <form
          className="popup__container"
          onSubmit={(evt) => {
            evt.preventDefault();
            this._submitProcess();
            this.props
              .onSubmitForm(this.state.inputs)
              .then(() => {
                this._submitSuccessfully();
                this._clearInputs();
              })
              .catch(() => {
                this._submitError();
              });
          }}
          name={this.props.settings.name}
          noValidate
        >
          <h2 className="popup__title">{this.props.settings.title}</h2>
          {this.props.settings.name === "avatar" && (
            <Input
              type="url"
              className="popup__input"
              pattern=".+\.(jpg|png)"
              name="avatar"
              required
              placeholder="Введите ссылку"
              onChange={this.inputOnChange}
              value={this.state.inputs.avatar}
              update={!this.props.isOpen}
            />
          )}
          {this.props.settings.name === "edit" && (
            <>
              <Input
                type="text"
                className="popup__input"
                name="forename"
                required
                minLength="2"
                maxLength="40"
                pattern="[ёЁА-Яа-яA-Za-z -]{1,}"
                onChange={this.inputOnChange}
                value={this.state.inputs.forename}
                update={!this.props.isOpen}
              />
              <Input
                type="text"
                className="popup__input"
                name="job"
                required
                minLength="2"
                maxLength="200"
                onChange={this.inputOnChange}
                value={this.state.inputs.job}
                update={!this.props.isOpen}
              />
            </>
          )}
          {this.props.settings.name === "add" && (
            <>
              <Input
                type="text"
                className="popup__input"
                name="title"
                required
                placeholder="Название"
                minLength="1"
                maxLength="30"
                onChange={this.inputOnChange}
                value={this.state.inputs.title}
                update={!this.props.isOpen}
              />
              <Input
                type="url"
                className="popup__input"
                pattern=".+\.(jpg|png)"
                name="url"
                required
                placeholder="Ссылка на картинку"
                onChange={this.inputOnChange}
                value={this.state.inputs.url}
                update={!this.props.isOpen}
              />
            </>
          )}
          <button
            type="submit"
            className={`popup__save ${
              this.isFormValid() ? "" : "popup__save_display_error"
            }`}
            disabled={this.isFormValid() ? "" : "disabled"}
          >
            {this.state.buttonText}
          </button>
          <button
            type="button"
            className="popup__exit-button"
            onClick={() => {
              this.props.onClose();
              setTimeout(() => {
                this._submitSuccessfully();
                this._clearInputs();
              }, 200);
            }}
          ></button>
        </form>
      </Popup>
    );
  }
}

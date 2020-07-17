import React from "react";

export default class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: this.props.settings.buttonTitle,
      inputs: {},
    };
  }
  isFormValid() {
    if (this.inputs.length === 0) {
      //Проверка для формы без инпутов
      return true;
    }
    if (this.inputs.every((item) => this.isInputValid(item))) {
      return true;
    } else {
      return false;
    }
  }
  isInputValid(input) {
    return input.validity.valid;
  }
  componentDidMount() {
    this.form = document.forms[this.props.settings.name];
    this.inputs = Array.from(this.form.querySelectorAll("input"));
    this.inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        const newInputs = { ...this.state.inputs };
        newInputs[input.name] = evt.target.value;
        this.setState({inputs: newInputs });
      });
/*     const newInputs = { ...this.state.inputs };
      newInputs[input.name] = input.value;
      console.log(newInputs)
     await this.setState({inputs: newInputs }); */
    });
  }
  _clearInputs() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
    this.setState({ inputs: {} });
  }
  changeHandler(evt) {
    this.setState({ inputs: { avatar: evt.target.value } });
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
  _setInitial() {
    if (this.inputs) {
      this.inputs.forEach((input) => {
        input.value = this.props[input.name] || "";
      });
    }
  }
  render() {
    if (!this.props.isOpen) {
      this._setInitial();
    }
    return (
      <div
        className={`popup popup_target_${this.props.settings.name} ${
          this.props.isOpen ? "popup_display_opened" : ""
        }`}
      >
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
          {this.props.settings.children}
          <button
            type="submit"
            className={`popup__save ${
              this.inputs
                ? this.isFormValid()
                  ? ""
                  : "popup__save_display_error"
                : "popup__save_display_error"
            }`}
            disabled={
              this.inputs ? (this.isFormValid() ? "" : "disabled") : "disabled"
            }
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
        <div
          className="popup__overlay"
          onClick={() => {
            this.props.onClose();
            setTimeout(() => {
              this._submitSuccessfully();
              this._clearInputs();
            }, 200);
            this._clearInputs();
          }}
        ></div>
      </div>
    );
  }
}

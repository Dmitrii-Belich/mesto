import React from "react";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputValid: true,
      validationMessage: "",
    };

    this.changeHandler = (evt) => {
      this.props.onChange(
        evt.target.value,
        this.props.name,
        evt.target.validity.valid
      );
      this.setState({
        isInputValid: evt.target.validity.valid,
        validationMessage: evt.target.validationMessage,
      });
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.update !== this.props.update) {
      this.setState({
        isInputValid: true,
        validationMessage: "",
      });
    }
  }
  
  render() {
    return (
      <>
        <input
          type={this.props.type}
          className={`popup__input ${
            !this.state.isInputValid && "popup__input_display_error"
          }`}
          pattern={this.props.pattern}
          name={this.props.name}
          required={this.props.required}
          placeholder={this.props.placeholder}
          onChange={this.changeHandler}
          value={this.props.value}
          maxLength={this.props.maxLength}
          minLength={this.props.minLength}
        />
        <span className="popup__input-error">
          {this.state.validationMessage}
        </span>
      </>
    );
  }
}

import React from "react";

export default function Input(props) {
  const [isInputValid, setIsInputValid] = React.useState(true);
  const [validationMessage, setValidationMessage] = React.useState("");
  React.useEffect(() => {
    setIsInputValid(true);
    setValidationMessage("");
  }, [props.update]);
  const changeHandler = (evt) => {
    props.onChange(evt.target.value, props.name, evt.target.validity.valid);

    setIsInputValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  };
  return (
    <>
      <input
        type={props.type}
        className={`popup__input ${
          !isInputValid && "popup__input_display_error"
        }`}
        pattern={props.pattern}
        name={props.name}
        required={props.required}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={props.value}
        maxLength={props.maxLength}
        minLength={props.minLength}
      />
      <span className="popup__input-error">{validationMessage}</span>
    </>
  );
}

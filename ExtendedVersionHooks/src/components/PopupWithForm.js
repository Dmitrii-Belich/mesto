import React from "react";
import Popup from "./Popup.js";
import Input from "./ui/Input.js";

export default function PopupWithForm(props) {
  let initialInputs = {};
  let initialValidity = {};
  switch (props.settings.name) {
    case "avatar": // if (x === 'value1')
      initialInputs = { avatar: "" };
      initialValidity = { avatar: false };
      break;
    case "edit": // if (x === 'value2')
      initialInputs = {
        forename: props.forename,
        job: props.job,
      };
      initialValidity = { forename: true, job: true };
      break;
    case "add":
      initialInputs = { title: "", url: "" };
      initialValidity = { title: false, url: false };
      break;
    default:
  }

  const [buttonText, setButtonText] = React.useState(
    props.settings.buttonTitle
  );
  const [inputs, setInputs] = React.useState(initialInputs);
  const [validity, setValidity] = React.useState(initialValidity);
  const inputOnChange = (value, name, InputValidity) => {
    const newInputs = { ...inputs };
    newInputs[name] = value;

    setInputs(newInputs);
    const newValidity = { ...validity };
    console.log(newValidity);
    newValidity[name] = InputValidity;
    console.log(newValidity);
    setValidity(newValidity);
  };
  React.useEffect(() => {
    if (props.settings.name === "edit") {
      setInputs({ forename: props.forename, job: props.job });
      console.log("set");
    }
  }, [props.forename, props.job, props.settings.name, props.isOpen]);
  function isFormValid() {
    if (validity) {
      if (!Object.values(validity).length) {
        return true;
      }
      return Object.values(validity).reduce((previousValue, currentItem) => {
        return previousValue && currentItem;
      });
    }
  }
  function _clearInputs() {
    if (props.settings.name === "edit") {
      setInputs({ forename: props.forename, job: props.job });
      setValidity(initialValidity);
    } else {
      setInputs(initialInputs);
      setValidity(initialValidity);
    }
  }
  function _submitProcess() {
    setButtonText(props.settings.buttonLoadingTitle);
  }
  function _submitError() {
    setButtonText("Ошибка");
  }
  function _submitSuccessfully() {
    setButtonText(props.settings.buttonTitle);
  }

  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <form
        className="popup__container"
        onSubmit={(evt) => {
          evt.preventDefault();
          _submitProcess();
          props
            .onSubmitForm(inputs)
            .then(() => {
              _submitSuccessfully();
              _clearInputs();
            })
            .catch(() => {
              _submitError();
            });
        }}
        name={props.settings.name}
        noValidate
      >
        <h2 className="popup__title">{props.settings.title}</h2>
        {props.settings.name === "avatar" && (
          <Input
            type="url"
            className="popup__input"
            pattern=".+\.(jpg|png)"
            name="avatar"
            required
            placeholder="Введите ссылку"
            onChange={inputOnChange}
            value={inputs.avatar}
            update={!props.isOpen}
          />
        )}
        {props.settings.name === "edit" && (
          <>
            <Input
              type="text"
              className="popup__input"
              name="forename"
              required
              minLength="2"
              maxLength="40"
              pattern="[ёЁА-Яа-яA-Za-z -]{1,}"
              onChange={inputOnChange}
              value={inputs.forename}
              update={!props.isOpen}
            />
            <Input
              type="text"
              className="popup__input"
              name="job"
              required
              minLength="2"
              maxLength="200"
              onChange={inputOnChange}
              value={inputs.job}
              update={!props.isOpen}
            />
          </>
        )}
        {props.settings.name === "add" && (
          <>
            <Input
              type="text"
              className="popup__input"
              name="title"
              required
              placeholder="Название"
              minLength="1"
              maxLength="30"
              onChange={inputOnChange}
              value={inputs.title}
              update={!props.isOpen}
            />
            <Input
              type="url"
              className="popup__input"
              pattern=".+\.(jpg|png)"
              name="url"
              required
              placeholder="Ссылка на картинку"
              onChange={inputOnChange}
              value={inputs.url}
              update={!props.isOpen}
            />
          </>
        )}
        <button
          type="submit"
          className={`popup__save ${
            isFormValid() ? "" : "popup__save_display_error"
          }`}
          disabled={isFormValid() ? "" : "disabled"}
        >
          {buttonText}
        </button>
        <button
          type="button"
          className="popup__exit-button"
          onClick={() => {
            props.onClose();
            setTimeout(() => {
              _submitSuccessfully();
              _clearInputs();
            }, 200);
          }}
        ></button>
      </form>
    </Popup>
  );
}

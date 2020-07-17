import React from "react";
export const apiOptions = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-12",
  headers: {
    authorization: "10d0cab2-3de3-42ea-80c8-2e15574d2bdb",
    "Content-Type": "application/json",
  },
};

export const popupsInfo = [
  {
    name: "avatar",
    title: "Обновить аватар",
    buttonTitle: "Сохранить",
    buttonLoadingTitle: "Сохранение...",
    children: (
      <>
        <input
          type="url"
          className="popup__input"
          pattern=".+\.(jpg|png)"
          name="avatar"
          required
          placeholder="Введите ссылку"
        />
        <span className="popup__input-error" id="avatar-error"></span>
      </>
    ),
  },
  {
    name: "delete",
    title: "Вы уверены?",
    buttonTitle: "Да",
    buttonLoadingTitle: "Удаление...",
  },
  {
    name: "edit",
    title: "Редактировать профиль",
    buttonTitle: "Сохранить",
    buttonLoadingTitle: "Сохранение...",
    children: (
      <>
        <input
          type="text"
          className="popup__input"
          name="forename"
          required
          minLength="2"
          maxLength="40"
          pattern="[ёЁА-Яа-яA-Za-z -]{1,}"
        />
        <span className="popup__input-error" id="forename-error"></span>
        <input
          type="text"
          className="popup__input"
          name="job"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error" id="job-error"></span>
      </>
    ),
  },
  {
    name: "add",
    title: "Новое место",
    buttonTitle: "Создать",
    buttonLoadingTitle: "Создание...",
    children: (
      <>
        <input
          type="text"
          className="popup__input"
          name="title"
          required
          placeholder="Название"
          minLength="1"
          maxLength="30"
        />
        <span className="popup__input-error" id="title-error"></span>
        <input
          type="url"
          className="popup__input"
          pattern=".+\.(jpg|png)"
          name="url"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error" id="url-error"></span>
      </>
    ),
  },
];

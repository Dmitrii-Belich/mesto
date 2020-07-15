import React from "react";
import logo from "../images/logo.svg";

function App() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
      </header>
      <main>
        <section className="profile">
          <div className="profile__inner-wrapper profile__inner-wrapper_place_profile">
            <img alt="Аватар" className="profile__avatar" />
            <button className="profile__avatar-overlay"></button>
            <div className="profile__info">
              <div className="profile__inner-wrapper profile__inner-wrapper_place_name">
                <h1 className="profile__name">Profile Name</h1>
                <button className="profile__edit-button"></button>
              </div>
              <p className="profile__subtitle"></p>
            </div>
          </div>
          <button className="profile__add-button"></button>
        </section>

        <div className="popup popup_target_avatar">
          <form className="popup__container" name="avatar" noValidate>
            <h2 className="popup__title">Обновить аватар</h2>
            <input
              type="url"
              className="popup__input"
              pattern=".+\.(jpg|png)"
              name="avatar"
              required
              placeholder="Введите ссылку"
            />
            <span className="popup__input-error" id="avatar-error"></span>
            <button type="submit" className="popup__save">
              Сохранить
            </button>
            <button type="button" className="popup__exit-button"></button>
            <p className="popup__form-error"></p>
          </form>
          <div className="popup__overlay"></div>
        </div>

        <div className="popup popup_target_delete">
          <form className="popup__container" name="delete" noValidate>
            <h2 className="popup__title">Вы уверены?</h2>
            <button type="submit" className="popup__save">
              Да
            </button>
            <button type="button" className="popup__exit-button"></button>
            <p className="popup__form-error"></p>
          </form>
          <div className="popup__overlay"></div>
        </div>

        <div className="popup popup_target_edit">
          <form className="popup__container" name="edit" noValidate>
            <h2 className="popup__title">Редактировать профиль</h2>
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
            <button type="submit" className="popup__save">
              Сохранить
            </button>
            <button type="button" className="popup__exit-button"></button>
            <p className="popup__form-error"></p>
          </form>
          <div className="popup__overlay"></div>
        </div>

        <div className="popup popup_target_add">
          <form className="popup__container" name="add" noValidate>
            <h2 className="popup__title">Новое место</h2>
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
            <button
              type="submit"
              className="popup__save popup__save_display_error"
              disabled
            >
              Создать
            </button>
            <button type="button" className="popup__exit-button"></button>
            <p className="popup__form-error"></p>
          </form>
          <div className="popup__overlay"></div>
        </div>

        <div className="popup popup_target_img">
          <div className="popup__image-container">
            <img alt="Изображение карточки" className="popup__image" />
            <h2 className="popup__image-title">Image title</h2>
            <button className="popup__exit-button"></button>
          </div>
          <div className="popup__overlay"></div>
        </div>

        <section className="card__container">
          <template id="card">
            <div className="card">
              <img alt="Изображение карточки" className="card__image" />
              <h2 className="card__title">Card title</h2>
              <button className="card__like"></button>
              <p className="card__like-count"></p>
              <button className="card__delete"></button>
            </div>
          </template>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
      </footer>
    </>
  );
}

export default App;

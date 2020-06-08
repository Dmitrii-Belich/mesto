import {popupOpen} from './script.js'
const popupImg = document.querySelector('.popup_target_img');
const popupImage = popupImg.querySelector('.popup__image');
const popupTitle = popupImg.querySelector('.popup__image-title')
export class Card {
  constructor (name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardLike = this._element.querySelector('.card__like');
    this._cardDelete = this._element.querySelector('.card__delete');
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  _setAttributes() {
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
  }

  _openCard () {
    popupOpen(popupImg)
    popupImage.src = this._link;
    popupTitle.textContent = this._name;
  }

  _likeSwitch (evt) {
    evt.target.classList.toggle ("card__like_mode_active");
  }

  _destroyElement (evt) {
    const card = evt.target.parentElement;
    card.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {this._openCard()})
    this._cardLike.addEventListener('click', (evt) => { this._likeSwitch(evt)})
    this._cardDelete.addEventListener('click', (evt) => { this._destroyElement(evt)})
  }

  _generateCard() {
    this._setAttributes();
    this._setEventListeners();
  }

  getCard() {
    this._generateCard()
    return this._element;
  }
}
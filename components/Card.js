export class Card {
  constructor(
    cardData,
    userId,
    cardSelector,
    handleCardClick,
    likeRenderer,
    deleteRenderer
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeConunt = cardData.likes.length;
    this._cardId = cardData._id;
    this._likeRenderer = likeRenderer;
    this._likes = cardData.likes;
    this._cardOwner = cardData.owner._id;
    this._deleteRenderer = deleteRenderer;
    this._userId = userId;
  }

  _setAttributes() {
    this._templateElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this._element = this._templateElement.firstElementChild;
    this._cardImage = this._templateElement.querySelector(".card__image");
    this._cardTitle = this._templateElement.querySelector(".card__title");
    this._cardLike = this._templateElement.querySelector(".card__like");
    this._cardLikeCount = this._templateElement.querySelector(".card__like-count");
    this._cardDelete = this._templateElement.querySelector(".card__delete");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardLikeCount.textContent = this._likeConunt;
    if (
      this._likes.some((item) => {
        return item._id === this._userId;
      })
    ) {
      this._cardLike.classList.add("card__like_mode_active");
    }
    if (this._cardOwner !== this._userId) {
      this._cardDelete.remove();
    }
  }

  _openCard() {
    this._handleCardClick(this._link, this._name);
  }

  _likeSwitch(evt) {
    this._likeRenderer(this).then((data) => {
      if (typeof data.likes.length !== undefined) {
        this._likes = data.likes;
        this._cardLikeCount.textContent = data.likes.length;
        evt.target.classList.toggle("card__like_mode_active");
      } 
    });
  }

  _destroyElement() {
    this._deleteRenderer(this);
  }

  deleteElement() {
    this._element.remove();
  }

  getId () {
    return this._cardId
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._openCard();
    });
    this._cardLike.addEventListener("click", (evt) => {
      this._likeSwitch(evt);
    });
    if (this._cardDelete) {
      this._cardDelete.addEventListener("click", (evt) => {
        this._destroyElement(evt);
      });
    }
  }

  _generateCard() {
    this._setAttributes();
    this._setEventListeners();
  }

  getCard() {
    this._generateCard();

    return this._templateElement;
  }
}

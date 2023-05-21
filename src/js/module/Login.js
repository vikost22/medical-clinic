import Request from "./Request.js";
import { USER, noItemsText } from "./constans.js";
import Card from "./Card.js";

const request = new Request();

export default class Login {
  render() {
    const form = document.createElement("form");
    form.innerHTML = `<h2 class="modal__name">Log in</h2>
    <label class="modal__input-name">Login</label>
    <input type="email" class="modal__input login-email" placeholder="Login" required />
    <label class="modal__input-name">Passwort</label>
    <input
      type="password"
      class="modal__input login-password"
      placeholder="Password"
      required
    />
    <p class="modal__invalid-date">Incorrect username or password*</p>
    <button class="modal__button">Log in</button>`;

    const loginBtn = form.querySelector(".modal__button");
    const email = form.querySelector(".login-email");
    const password = form.querySelector(".login-password");
    const invalidText = form.querySelector(".modal__invalid-date");

    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.authorization(email, password, invalidText);
    });
    return form;
  }
  authorization(email, password, invalidText) {
    request.login(email.value, password.value).then((token) => {
      if (
        token !== "Incorrect username or password" &&
        email.value.trim() !== "" &&
        password.value.trim() !== ""
      ) {
        USER.token = token;
        sessionStorage.setItem("token", USER.token);

        document.querySelector(".header__button--login").style.display = "none";
        document.querySelector(".header__button--visit").style.display =
          "block";
        this.updateCards();
      } else {
        invalidText.style.display = "block";
      }
    });
  }
  updateCards() {
    request.getCards(USER.token).then((cards) => {
      document.querySelector(".modal").remove();
      if (cards.length > 0) {
        noItemsText.style.display = "none";
        cards.forEach((card) => {
          const newCard = new Card();
          document.querySelector(".cards-list").append(newCard.render(card));
        });
      }
    });
  }
}

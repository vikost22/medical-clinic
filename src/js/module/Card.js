import Request from "./Request.js";
import { USER, noItemsText } from "./constans.js";
import Modal from "./Modal.js";
import ChangeVisit from "./ChangeVisit.js";
import VisitCardiologist from "./VisitCardiologist.js";
import VisitDentist from "./VisitDentist.js";
import VisitTherapist from "./VisitTherapist.js";
export default class Card {
  render(obj) {
    const {
      id,
      patient,
      doctor,
      objectiveDesc,
      state,
      shortDesc,
      urgency,
      otherInfo,
    } = obj;

    const card = document.createElement("li");
    card.classList.add("card-item");
    card.id = id;
    card.innerHTML = `
    <div class="cards-item__closed-btn closed-btn">
      <span class="closed-btn__line"></span>
      <span class="closed-btn__line"></span>
    </div>

    <h3 class="card-item__patient">${patient}</h3>
    <p class="card-item__doctor">${doctor}</p>

    <div class="card-item__info">
      <p class="info__descr info__descr--objective">
      ${objectiveDesc}
      </p>
      <p class="info__descr info__descr--short">
      ${shortDesc}
      </p>
      <p class="info__descr info__descr--urgency">
        Urgency: <span>${urgency}</span>
      </p>
      <p class="info__descr info__descr--state">
        State: <span>${state}</span>
      </p>
    </div>

    <div class="card-item__buttons">
      <button class="card-item__button button--edit">
        <svg
          style="color: rgb(0, 0, 0)"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          class="bi bi-pencil"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
            fill="#000000"
          ></path>
        </svg>
        Edit
      </button>
      <button class="card-item__button button--open-more">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path
            class="card-item__dots"
            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            fill="#000000"
          ></path>
        </svg>
        More
      </button>
    </div>`;

    const infoBlock = card.querySelector(".card-item__info");
    const deleteBtn = card.querySelector(".closed-btn");
    const moreBtn = card.querySelector(".button--open-more");
    const editBtn = card.querySelector(".button--edit");

    for (const info in otherInfo) {
      if (Object.hasOwnProperty.call(otherInfo, info)) {
        const infoItem = document.createElement("p");
        infoItem.classList.add("info__descr");
        infoItem.innerHTML = `${info}: <span>${otherInfo[info]}</span>`;
        infoBlock.append(infoItem);
      }
    }

    deleteBtn.addEventListener("click", () => this.removeCard(card));
    moreBtn.addEventListener("click", (event) =>
      this.showMore(event, infoBlock)
    );

    editBtn.addEventListener("click", () => this.editCard(obj, card));
    return card;
  }
  removeCard(card) {
    const request = new Request();
    request.deleteCard(USER.token, card.id).then((response) => {
      if (response.status === 200) {
        card.remove();
      }
    });
    request.getCards(USER.token).then((cards) => {
      console.log(cards.length);
      if (cards.length === 1 || cards.length === 0) {
        noItemsText.style.display = "block";
      }
    });
  }
  showMore(event, infoBlock) {
    event.target.closest(".button--open-more").classList.toggle("active");
    event.target
      .closest(".card-item__buttons")
      .classList.toggle("card-item__buttons--active");
    infoBlock.classList.toggle("card-item__info--active");
  }
  editCard(cardObj, card) {
    const cardio = new VisitCardiologist();
    const dentist = new VisitDentist();
    const therap = new VisitTherapist();
    const modal = new Modal();
    const changeVisit = new ChangeVisit();
    const request = new Request();

    request.getCard(USER.token, card.id).then((response) => {
      document.body.append(
        modal.render(
          changeVisit.render(
            cardio.render(response.otherInfo),
            dentist.render(response.otherInfo),
            therap.render(response.otherInfo),
            response,
            card
          )
        )
      );
    });
  }
}

import Request from "./Request.js";
import { USER, noItemsText } from "./constans.js";
import Card from "./Card.js";
import validateOtherInfo from "./validateOtherInfo.js";
export default class Visit {
  render(cardio, dentist, therapeft) {
    const form = document.createElement("form");

    form.classList = "modal__form";

    form.action = "#";

    form.innerHTML = `
    <h2 class="modal__name">Create visit</h2>
    <select name="" id="" class="modal__select">
        <option value="none" disabled selected hidden class="modal__select-option">Select doctor</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Dentist">Dentist</option>
        <option value="Therapist">Therapist</option>
    </select>
      <input type="text" class="modal__input purpose--visit" placeholder="The purpose of the visit" />
      <input type="text" class="modal__input description--visit" placeholder="A brief description of the visit" />
      <select name="" id="" class="modal__select urgency--select">
      <option value="none" disabled selected hidden class="modal__select-option">Urgency</option>
      <option value="high">High</option>
      <option value="normal">Normal</option>
      <option value="low">Low</option>
    </select>
  <select name="" id="" hidden class="modal__select state--select">
    <option value="open">Open</option>
    <option value="done">Done</option>
  </select>
    <input type="text" class="modal__input name--input" placeholder="Name" />
    <div class="inputs--div"></div>
    <p class="modal__invalid-date">Enter all values</p>
    <button class="modal__button">Create visit</button>
    `;
    const inputsDiv = form.querySelector(".inputs--div");
    const selectDoc = form.querySelector(".modal__select");
    selectDoc.addEventListener("change", () => {
      const docValue = selectDoc.value;
      inputsDiv.innerHTML = "";
      if (docValue === "Dentist") {
        inputsDiv.innerHTML = dentist;
      } else if (docValue === "Cardiologist") {
        inputsDiv.innerHTML = cardio;
      } else if (docValue === "Therapist") {
        inputsDiv.innerHTML = therapeft;
      }
    });
    return form;
  }
  setObj(form) {
    const selectDoc = form.querySelector(".modal__select");
    const patient = form.querySelector(".name--input").value;

    const doctor = selectDoc.value;

    const objectiveDesc = form.querySelector(".purpose--visit").value;

    const shortDesc = form.querySelector(".description--visit").value;

    const urgency = form.querySelector(".urgency--select").value;

    const otherInfo = {};

    const state = form.querySelector(".state--select").value;

    const docValue = selectDoc.value;
    if (docValue === "Cardiologist") {
      const cs = form.querySelector(".cs--input").value || null;
      const weigth = form.querySelector(".body--mass").value || null;
      const pressure = form.querySelector(".pressure-input").value || null;
      const age = form.querySelector(".age--input").value || null;
      (otherInfo.weigth = weigth),
        (otherInfo.pressure = pressure),
        (otherInfo.cs = cs),
        (otherInfo.age = age);
    } else if (docValue === "Dentist") {
      const lastVisit = form.querySelector(".lastvisit--input").value || null;
      otherInfo["Last Visit"] = lastVisit;
    } else if (docValue === "Therapist") {
      const age = form.querySelector(".age--input").value || null;
      otherInfo.age = age;
    } else {
      alert("Choose the doctor!");
      return false;
    }
    const obj = {
      patient: patient,
      doctor: doctor,
      objectiveDesc: objectiveDesc,
      shortDesc: shortDesc,
      state: state,
      urgency: urgency,
      otherInfo,
    };
    return obj;
  }
  cardRequest(obj, form) {
    const invalidMessage = form.querySelector(".modal__invalid-date");
      const { patient, doctor, objectiveDesc, shortDesc, urgency, otherInfo } =
        obj;
      if (
        patient !== null &&
        doctor !== null &&
        objectiveDesc !== null &&
        shortDesc !== null &&
        urgency !== null &&
        validateOtherInfo(otherInfo, invalidMessage)
      ) {
        document.querySelector(".modal").remove();
        const request = new Request();
        request.setCard(USER.token, obj).then((response) => {
          const card = new Card();
          const cardList = document.querySelector(".cards-list");
          cardList.append(card.render(response));
          if ((noItemsText.style.display = "block")) {
            noItemsText.style.display = "none";
          }
        });
      } 
  }
}

import Visit from "./Visit.js";
import Card from "./Card.js";
import Request from "./Request.js";
import { USER } from "./constans.js";
import validateForm from "./validateForm.js";
export default class ChangeVisit extends Visit {
  render(cardio, dentist, therapist, obj, card) {
    const {
      id,
      patient,
      doctor,
      objectiveDesc,
      state = "open",
      shortDesc,
      urgency,
      otherInfo,
    } = obj;

    const form = super.render(cardio, dentist, therapist);

    const modalTitle = form.querySelector(".modal__name");
    const selDoc = form.querySelector(".modal__select");
    const purVisit = form.querySelector(".purpose--visit");
    const shortDescription = form.querySelector(".description--visit");
    const selUrgency = form.querySelector(".urgency--select");
    const patientName = form.querySelector(".name--input");
    const inputsDiv = form.querySelector(".inputs--div");
    const changeBtn = form.querySelector(".modal__button");

    const stateSelect = form.querySelector(".state--select");
    stateSelect.removeAttribute("hidden");
    stateSelect.setAttribute("visible", "");
    Array.from(stateSelect.options)
      .find((option) => option.value === state)
      .setAttribute("selected", "");

    modalTitle.textContent = "Change visit";
    Array.from(selDoc.options)
      .find((option) => option.value === doctor)
      .setAttribute("selected", "");
    purVisit.value = objectiveDesc;
    shortDescription.value = shortDesc;
    Array.from(selUrgency.options)
      .find((option) => option.value === urgency)
      .setAttribute("selected", "");
    patientName.value = patient;
    changeBtn.textContent = "Change visit";

    if (doctor === "Dentist") {
      inputsDiv.innerHTML = dentist;
    } else if (doctor === "Cardiologist") {
      inputsDiv.innerHTML = cardio;
    } else if (doctor === "Therapist") {
      inputsDiv.innerHTML = therapist;
    }
    changeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.changeCard(form, card);
    });
    return form;
  }
  changeCard(form, card) {
    const formObj = super.setObj(form);
    const newCard = new Card();
    const invalidMessage = form.querySelector(".modal__invalid-date");
    const updatedCard = newCard.render(formObj);
    const request = new Request();
    if (validateForm(form, invalidMessage)) {
      document.querySelector(".modal").remove();
      request.changeCard(USER.token, card.id, formObj);
      updatedCard.id = card.id;
      card.replaceWith(updatedCard);
    }
  }
}

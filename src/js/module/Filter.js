import { noItemsText } from "./constans.js";
export default class Filter {
  constructor() {
    this.cards = Array.from(document.querySelectorAll(".card-item"));
  }

  findPatient() {
    try {
      this.cards.forEach((card) => {
        const patientString = card.querySelector(".card-item__patient").textContent.toLowerCase();
        const urgencyString = card.querySelector(".info__descr--urgency").textContent.toLowerCase();
        const stateString = card.querySelector(".info__descr--state span").textContent.toLowerCase();
        const patientValue = document.querySelector(".filter-form__input").value.trim().toLowerCase();
        const urgencyValue = document.querySelector("#urgency").value.trim().toLowerCase();
        const stateValue = document.querySelector("#cardState").value.trim().toLowerCase();

        sessionStorage.setItem("filterTitle", patientValue);
        sessionStorage.setItem("filterUrgency", urgencyValue);
        sessionStorage.setItem("filterState", stateValue);

        if (card.contains(card.querySelector(".active"))) {
          card.querySelector(".active").click();
        }

        if (
          patientString.includes(patientValue) &&
          (urgencyValue === "all" || urgencyString.includes(urgencyValue)) &&
          (stateValue === "all" || stateString.includes(stateValue))
        ) {
          card.classList.remove("card-item--hidden");
        } else {
          card.classList.add("card-item--hidden");
        }
      });

      const hiddenCards = Array.from(document.querySelectorAll(".card-item--hidden"));
      if (this.cards.length === hiddenCards.length) {
        noItemsText.style.display = "block";
      } else {
        noItemsText.style.display = "none";
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

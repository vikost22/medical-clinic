import Visit from "./Visit.js";
export default class VisitTherapist extends Visit {
  render({ age = "" } = {}) {
    return `<input type="text" class="modal__input age--input" placeholder="Age" value="${age}"/>`;
  }
}

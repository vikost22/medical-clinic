import Request from "./Request.js";
import { USER } from "./constans.js";
import Visit from "./Visit.js";

export default class VisitDentist extends Visit {
  render({ "Last Visit": lastVisit = "" } = {}) {
    return `<input
        type="text"
        value="${lastVisit}"
        class="modal__input lastvisit--input"
        placeholder="Data of the last visit"
      />`;
  }
}

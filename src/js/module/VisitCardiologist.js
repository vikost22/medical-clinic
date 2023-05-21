import Visit from "./Visit.js";
export default class VisitCardiologist extends Visit {
  render({weigth='', pressure='', cs='', age=''}={}) {
    return `<input type="text" value="${weigth}" class="modal__input body--mass" placeholder="Body mass index" />
         <input type="text" value="${pressure}" class="modal__input pressure-input" placeholder="Normal pressure" />
         <input type="text" value="${cs}" class="modal__input cs--input" placeholder="Transferred diseases of the CS" />
         <input type="text" value="${age}" class="modal__input age--input" placeholder="Age" />`;
  }
}


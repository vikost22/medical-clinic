export default class Modal {
  render(content) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML =
      '<div action="#" class="modal__window">      <div class="modal-closed-btn">        <span class="modal-closed-btn__line"></span>        <span class="modal-closed-btn__line"></span>      </div>    </div>';

    modal.querySelector(".modal-closed-btn").addEventListener("click", () => {
      document.body.style.overflow = "auto";
      modal.remove();
    });
    modal.querySelector(".modal__window").append(content);
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        document.body.style.overflow = "auto";
        modal.remove();
      }
    });
    return modal;
  }
}

export default function validateForm(form, par) {
  const inputs = form.querySelectorAll("input, select");

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (
      !input.value &&
      input.value !== 0 &&
      (!input.selectedOptions || !input.selectedOptions.length)
    ) {
      par.style.display = "block";
      return false;
    }
  }

  return true;
}

let isValid = true;

export function unitLabel(element: HTMLElement): HTMLElement | null {
  return element.classList.contains("js-input-amount")
    ? (element.previousElementSibling as HTMLElement)
    : (element.nextElementSibling as HTMLElement);
}

function renderError(element: HTMLElement) {
  element.classList.add("error-input");

  const unitLabelElement = unitLabel(element);
  unitLabelElement?.classList.add("error-unit-label");

  const wrapperElement = element.closest(".js-input-wrapper");
  const errorElement = wrapperElement?.nextElementSibling;

  if (errorElement) {
    errorElement.innerHTML = "This field is required";
  }
}

function removeError(element: HTMLElement) {
  element.classList.remove("error-input");

  const unitLabelElement = unitLabel(element);
  unitLabelElement?.classList.remove("error-unit-label");

  const wrapperElement = element.closest(".js-input-wrapper");
  const errorElement = wrapperElement?.nextElementSibling;

  if (errorElement) {
    errorElement.innerHTML = "";
  }
}

export function verifyInput(input: HTMLInputElement): boolean {
  isValid = true;
  if (input.type === "radio") {
    const radioBtnName = input.name;
    const radioGroup = document.querySelectorAll(
      `input[name="${radioBtnName}"]`
    );
    const isAnyChecked = Array.from(radioGroup).some((radio) => {
      return (radio as HTMLInputElement).checked;
    });

    if (!isAnyChecked) {
      renderError(input);
      isValid = false;
    } else {
      removeError(input);
    }
  } else {
    if (input.value === "" || input.value === null) {
      renderError(input);
      isValid = false;
    } else {
      removeError(input);
    }
  }
  return isValid;
}

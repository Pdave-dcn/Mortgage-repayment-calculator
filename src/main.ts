import * as fromMainFunctionsget from "./functions/main-functions.js";
import { unitLabel, addCommas } from "./functions/utils.js";

// STYLE MANAGING
//***************************************************************//
document.querySelectorAll("input[type='text']").forEach((input) => {
  input.addEventListener("focus", (event) => {
    const target = event.target as HTMLElement;

    const unitLabelElement = unitLabel(target);
    unitLabelElement?.classList.add("focus-unit-label");
  });

  input.addEventListener("blur", (event) => {
    const target = event.target as HTMLElement;

    const unitLabelElement = unitLabel(target);
    unitLabelElement?.classList.remove("focus-unit-label");
  });
});

document.querySelectorAll("input[type='radio']").forEach((input) => {
  input.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;

    document.querySelectorAll(".js-radio-btn-wrapper").forEach((wrapper) => {
      wrapper.classList.remove("active-type");
    });

    const wrapperElement = target.closest(".js-radio-btn-wrapper");
    wrapperElement?.classList.add("active-type");
  });
});

document
  .querySelector<HTMLInputElement>(".js-input-amount")
  ?.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/,/g, "");

    if (!isNaN(Number(value))) {
      target.value = addCommas(value);
    }
  });

// FORM VALIDATION
//*****************************************************************************//
document.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const isInputValid = fromMainFunctionsget.verifyInput();

  const isInputValueValid =
    isInputValid && fromMainFunctionsget.verifyInputValue();

  if (isInputValid && isInputValueValid) {
    fromMainFunctionsget.generateResult();
  }
});

// CLEAR INPUTS
//****************************************************************************//
document.querySelector(".js-clear-btn")?.addEventListener("click", () => {
  const form = document.querySelector("form") as HTMLFormElement;
  fromMainFunctionsget.clearAllInputs(form);
});

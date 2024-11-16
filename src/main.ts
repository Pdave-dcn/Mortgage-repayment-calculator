import * as exportedFunctions from "./functions.js";

// STYLE MANAGING
//***************************************************************//
document.querySelectorAll("input[type='text'").forEach((input) => {
  input.addEventListener("focus", (event) => {
    const target = event.target as HTMLElement;

    const unitLabelElement = exportedFunctions.unitLabel(target);
    unitLabelElement?.classList.add("focus-unit-label");
  });

  input.addEventListener("blur", (event) => {
    const target = event.target as HTMLElement;

    const unitLabelElement = exportedFunctions.unitLabel(target);
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

// FORM VALIDATION
//*****************************************************************************//
document.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  document.querySelectorAll("input").forEach((input) => {
    exportedFunctions.verifyInput(input);
  });
});

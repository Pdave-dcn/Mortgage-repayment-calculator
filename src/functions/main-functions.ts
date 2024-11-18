import * as fromUtilsGet from "./utils.js";

export let isInputValid = true;
export let isInputValueValid = true;

export function verifyInput(): boolean {
  isInputValid = true;
  let isValid = true;
  document.querySelectorAll("input").forEach((input) => {
    if (input.type === "radio") {
      const radioBtnName = input.name;
      const radioGroup = document.querySelectorAll(
        `input[name="${radioBtnName}"]`
      );
      const isAnyChecked = Array.from(radioGroup).some((radio) => {
        return (radio as HTMLInputElement).checked;
      });

      if (!isAnyChecked) {
        fromUtilsGet.renderError(input, "This field is required");
        isValid = false;
      } else {
        fromUtilsGet.removeError(input);
      }
    } else if (input.type === "text") {
      if (input.value === "" || input.value === null) {
        fromUtilsGet.renderError(input, "This field is required");
        isValid = false;
      } else {
        fromUtilsGet.removeError(input);
      }
    }
  });

  if (!isValid) isInputValid = false;

  return isInputValid;
}

export function verifyInputValue(): boolean {
  isInputValueValid = true;
  let isValid = true;
  if (isInputValid) {
    document
      .querySelectorAll<HTMLInputElement>("input[type='text']")
      .forEach((input) => {
        const inputElement = input;
        const value = inputElement.value.trim();
        const numericValue = Number(inputElement.value);
        if (isNaN(Number(value))) {
          fromUtilsGet.renderError(inputElement, "Must be a valid value");
          isValid = false;
        } else if (numericValue < 0) {
          fromUtilsGet.renderError(inputElement, "Value cannot be negative");
          isValid = false;
        } else if (numericValue === 0) {
          fromUtilsGet.renderError(inputElement, "Value cannot be zero");
          isValid = false;
        } else {
          fromUtilsGet.removeError(inputElement);
        }
      });
  }

  if (!isValid) {
    isInputValueValid = false;
  }
  return isInputValueValid;
}

export function generateResult() {
  const amount: number = Number(
    (document.querySelector(".js-input-amount") as HTMLInputElement)?.value
  );

  const term: number =
    Number(
      (document.getElementById("mortgage-term") as HTMLInputElement)?.value
    ) * 12;

  const rate: number =
    Number(
      (document.getElementById("interest-rate") as HTMLInputElement)?.value
    ) /
    12 /
    100;

  const radioGroup = document.querySelectorAll(
    "input[name='mortgage-type']"
  ) as NodeList;

  const mortgagetype = Array.from(radioGroup).find((radio) => {
    return (radio as HTMLInputElement).checked;
  });

  let monthlyPayment: string = "";
  let yearlyPayment: string = "";

  const selectedType: number = Number((mortgagetype as HTMLInputElement).value);

  if (selectedType === 1) {
    const nume = rate * (1 + rate) ** term;
    const deno = (1 + rate) ** term - 1;

    const result: number = amount * (nume / deno);
    const termlyResult = result * term;

    monthlyPayment = fromUtilsGet.formatNumberWithCommas(
      Number(result.toFixed(2))
    );
    yearlyPayment = fromUtilsGet.formatNumberWithCommas(
      Number(termlyResult.toFixed(2))
    );
    fromUtilsGet.renderHTML(monthlyPayment, yearlyPayment);
  } else {
    const result: number = amount * rate;
    const termlyResult = result * term;

    monthlyPayment = fromUtilsGet.formatNumberWithCommas(
      Number(result.toFixed(2))
    );
    yearlyPayment = fromUtilsGet.formatNumberWithCommas(
      Number(termlyResult.toFixed(2))
    );
    fromUtilsGet.renderHTML(monthlyPayment, yearlyPayment);
  }
}

export function clearAllInputs(form: HTMLElement) {
  form.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
    if (input.type === "radio") {
      input.checked = false;
      const wrapper = input.closest(".js-radio-btn-wrapper");
      wrapper?.classList.remove("active-type");
    } else {
      input.value = "";
    }

    if (input.classList.contains("error-input"))
      input.classList.remove("error-input");

    const errorElement = fromUtilsGet.unitLabel(input);
    errorElement?.classList.remove("error-unit-label");

    document
      .querySelectorAll<HTMLElement>(".calculator__input--error")
      .forEach((element) => {
        element.innerText = "";
      });
  });

  const displayElement = document.querySelector<HTMLElement>(".js-display");

  if (displayElement) {
    const firstChild = displayElement.firstElementChild;
    if (
      firstChild instanceof HTMLElement &&
      firstChild.classList.contains("result")
    ) {
      const wrapperElement = document.createElement("div");
      wrapperElement.classList.add("wrapper");

      wrapperElement.innerHTML = `
      <img
          src="assets/images/illustration-empty.svg"
          alt="illustration"
          class="calculator__display--img"
      />
      <h1 class="calculator__display--title">Results shown here</h1>
      <p class="calculator__display--paragraph">
        Complete the form and click "calculate repayments" to see what
        your monthly repayments would be.
      </p>
      `;

      displayElement.replaceChild(wrapperElement, firstChild);
    }
  }

  document
    .querySelector<HTMLElement>(".js-calculator-display")
    ?.classList.remove("result-style");
}

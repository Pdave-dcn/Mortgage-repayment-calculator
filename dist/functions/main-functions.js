import * as fromUtilsGet from "./utils.js";
export let isInputValid = true;
export let isInputValueValid = true;
export function verifyInput() {
    isInputValid = true;
    let isValid = true;
    document.querySelectorAll("input").forEach((input) => {
        if (input.type === "radio") {
            const radioBtnName = input.name;
            const radioGroup = document.querySelectorAll(`input[name="${radioBtnName}"]`);
            const isAnyChecked = Array.from(radioGroup).some((radio) => {
                return radio.checked;
            });
            if (!isAnyChecked) {
                fromUtilsGet.renderError(input, "This field is required");
                isValid = false;
            }
            else {
                fromUtilsGet.removeError(input);
            }
        }
        else if (input.type === "text") {
            if (input.value === "" || input.value === null) {
                fromUtilsGet.renderError(input, "This field is required");
                isValid = false;
            }
            else {
                fromUtilsGet.removeError(input);
            }
        }
    });
    if (!isValid)
        isInputValid = false;
    return isInputValid;
}
export function verifyInputValue() {
    isInputValueValid = true;
    let isValid = true;
    if (isInputValid) {
        document
            .querySelectorAll("input[type='text']")
            .forEach((input) => {
            const inputElement = input;
            const value = inputElement.value.trim();
            const numericValue = Number(inputElement.value);
            if (isNaN(Number(value))) {
                fromUtilsGet.renderError(inputElement, "Must be a valid value");
                isValid = false;
            }
            else if (numericValue < 0) {
                fromUtilsGet.renderError(inputElement, "Value cannot be negative");
                isValid = false;
            }
            else if (input.classList.contains("js-input-amount") &&
                numericValue === 0) {
                fromUtilsGet.renderError(inputElement, "Amount cannot be zero");
                isValid = false;
            }
            else {
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
    var _a, _b, _c;
    const amount = Number((_a = document.querySelector(".js-input-amount")) === null || _a === void 0 ? void 0 : _a.value);
    const term = Number((_b = document.getElementById("mortgage-term")) === null || _b === void 0 ? void 0 : _b.value) * 12;
    const rate = Number((_c = document.getElementById("interest-rate")) === null || _c === void 0 ? void 0 : _c.value) /
        12 /
        100;
    const radioGroup = document.querySelectorAll("input[name='mortgage-type']");
    const mortgagetype = Array.from(radioGroup).find((radio) => {
        return radio.checked;
    });
    let monthlyPayment = "";
    let yearlyPayment = "";
    const selectedType = Number(mortgagetype.value);
    if (selectedType === 1) {
        const nume = rate * (1 + rate) ** term;
        const deno = (1 + rate) ** term - 1;
        const result = amount * (nume / deno);
        const termlyResult = result * term;
        monthlyPayment = result.toFixed(2);
        yearlyPayment = termlyResult.toFixed(2);
        fromUtilsGet.renderHTML(monthlyPayment, yearlyPayment);
    }
    else {
        const result = amount * rate;
        const termlyResult = result * term;
        monthlyPayment = result.toFixed(2);
        yearlyPayment = termlyResult.toFixed(2);
        fromUtilsGet.renderHTML(monthlyPayment, yearlyPayment);
    }
}
export function clearAllInputs(form) {
    var _a;
    form.querySelectorAll("input").forEach((input) => {
        if (input.type === "radio") {
            input.checked = false;
            const wrapper = input.closest(".js-radio-btn-wrapper");
            wrapper === null || wrapper === void 0 ? void 0 : wrapper.classList.remove("active-type");
        }
        else {
            input.value = "";
        }
        if (input.classList.contains("error-input"))
            input.classList.remove("error-input");
        const errorElement = fromUtilsGet.unitLabel(input);
        errorElement === null || errorElement === void 0 ? void 0 : errorElement.classList.remove("error-unit-label");
        document
            .querySelectorAll(".calculator__input--error")
            .forEach((element) => {
            element.innerText = "";
        });
    });
    const displayElement = document.querySelector(".js-display");
    if (displayElement) {
        const firstChild = displayElement.firstElementChild;
        if (firstChild instanceof HTMLElement &&
            firstChild.classList.contains("result")) {
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
    (_a = document
        .querySelector(".js-calculator-display")) === null || _a === void 0 ? void 0 : _a.classList.remove("result-style");
}
//# sourceMappingURL=main-functions.js.map
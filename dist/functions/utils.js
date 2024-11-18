export function unitLabel(element) {
    return element.classList.contains("js-input-amount")
        ? element.previousElementSibling
        : element.nextElementSibling;
}
export function renderError(element, errorMessage) {
    element.classList.add("error-input");
    const unitLabelElement = unitLabel(element);
    unitLabelElement === null || unitLabelElement === void 0 ? void 0 : unitLabelElement.classList.add("error-unit-label");
    const wrapperElement = element.closest(".js-input-wrapper");
    const errorElement = wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.nextElementSibling;
    if (errorElement) {
        errorElement.innerHTML = errorMessage;
    }
}
export function removeError(element) {
    element.classList.remove("error-input");
    const unitLabelElement = unitLabel(element);
    unitLabelElement === null || unitLabelElement === void 0 ? void 0 : unitLabelElement.classList.remove("error-unit-label");
    const wrapperElement = element.closest(".js-input-wrapper");
    const errorElement = wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.nextElementSibling;
    if (errorElement) {
        errorElement.innerHTML = "";
    }
}
export function renderHTML(monthlyResult, yearlyResult) {
    var _a;
    const html = `
  <div class="result">
    <h1 class="result__title">Your results</h1>
    <p class="result__paragraph">
      Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again.
    </p>
    <div class="result__container">
      <div class="result__container--content-1">
        <span class="result__container--title">Your monthly repayments</span>
        <input type="text" name="monthly-result" id="monthly-result" value="£${monthlyResult}" readonly>
      </div>
    <div class="result__container--content-2">
      <span class="result__container--title">Total you'll repay over the term</span>
      <input type="text" name="total-result" id="total-result" value="£${yearlyResult}" readonly>
    </div>  
    </div
  </div>
  `;
    const displayElement = document.querySelector(".js-display");
    if (displayElement) {
        displayElement.innerHTML = html;
        (_a = document
            .querySelector(".js-calculator-display")) === null || _a === void 0 ? void 0 : _a.classList.add("result-style");
    }
    else {
        console.error("Display container '.js-display' not found in the DOM.");
    }
}
export function formatNumberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//# sourceMappingURL=utils.js.map
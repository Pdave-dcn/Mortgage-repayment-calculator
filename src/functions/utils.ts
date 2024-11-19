export function unitLabel(element: HTMLElement): HTMLElement | null {
  return element.classList.contains("js-input-amount")
    ? (element.previousElementSibling as HTMLElement)
    : (element.nextElementSibling as HTMLElement);
}

export function renderError(element: HTMLElement, errorMessage: string) {
  element.classList.add("error-input");

  const unitLabelElement = unitLabel(element);
  unitLabelElement?.classList.add("error-unit-label");

  const wrapperElement = element.closest(".js-input-wrapper");
  const errorElement = wrapperElement?.nextElementSibling;

  if (errorElement) {
    errorElement.innerHTML = errorMessage;
  }
}

export function removeError(element: HTMLElement) {
  element.classList.remove("error-input");

  const unitLabelElement = unitLabel(element);
  unitLabelElement?.classList.remove("error-unit-label");

  const wrapperElement = element.closest(".js-input-wrapper");
  const errorElement = wrapperElement?.nextElementSibling;

  if (errorElement) {
    errorElement.innerHTML = "";
  }
}

export function renderHTML(monthlyResult: string, yearlyResult: string): void {
  const html: string = `
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

  const displayElement: HTMLElement | null =
    document.querySelector(".js-display");

  if (displayElement) {
    displayElement.innerHTML = html;
    document
      .querySelector<HTMLElement>(".js-calculator-display")
      ?.classList.add("result-style");
  } else {
    console.error("Display container '.js-display' not found in the DOM.");
  }
}

export function addCommas(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

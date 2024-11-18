var _a, _b;
import * as fromMainFunctionsget from "./functions/main-functions.js";
import { unitLabel } from "./functions/utils.js";
document.querySelectorAll("input[type='text']").forEach((input) => {
    input.addEventListener("focus", (event) => {
        const target = event.target;
        const unitLabelElement = unitLabel(target);
        unitLabelElement === null || unitLabelElement === void 0 ? void 0 : unitLabelElement.classList.add("focus-unit-label");
    });
    input.addEventListener("blur", (event) => {
        const target = event.target;
        const unitLabelElement = unitLabel(target);
        unitLabelElement === null || unitLabelElement === void 0 ? void 0 : unitLabelElement.classList.remove("focus-unit-label");
    });
});
document.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", (event) => {
        const target = event.target;
        document.querySelectorAll(".js-radio-btn-wrapper").forEach((wrapper) => {
            wrapper.classList.remove("active-type");
        });
        const wrapperElement = target.closest(".js-radio-btn-wrapper");
        wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.classList.add("active-type");
    });
});
(_a = document.querySelector("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    const isInputValid = fromMainFunctionsget.verifyInput();
    const isInputValueValid = isInputValid && fromMainFunctionsget.verifyInputValue;
    if (isInputValid && isInputValueValid) {
        fromMainFunctionsget.generateResult();
    }
});
(_b = document.querySelector(".js-clear-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const form = document.querySelector("form");
    fromMainFunctionsget.clearAllInputs(form);
});
//# sourceMappingURL=main.js.map
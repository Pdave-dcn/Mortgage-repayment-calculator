var _a, _b, _c;
import * as fromMainFunctionsget from "./functions/main-functions.js";
import { unitLabel, addCommas } from "./functions/utils.js";
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
(_a = document
    .querySelector(".js-input-amount")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (event) => {
    const target = event.target;
    const value = target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
        target.value = addCommas(value);
    }
});
(_b = document.querySelector("form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => {
    event.preventDefault();
    const isInputValid = fromMainFunctionsget.verifyInput();
    console.log("isInputValid:", isInputValid);
    const isInputValueValid = isInputValid && fromMainFunctionsget.verifyInputValue();
    console.log("isInpuValuetValid:", isInputValueValid);
    if (isInputValid && isInputValueValid) {
        fromMainFunctionsget.generateResult();
        console.log("Validation successful");
    }
    else {
        console.log("Validation failed");
    }
});
(_c = document.querySelector(".js-clear-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const form = document.querySelector("form");
    fromMainFunctionsget.clearAllInputs(form);
});
//# sourceMappingURL=main.js.map
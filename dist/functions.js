let isValid = true;
export function unitLabel(element) {
    return element.classList.contains("js-input-amount")
        ? element.previousElementSibling
        : element.nextElementSibling;
}
function renderError(element) {
    element.classList.add("error-input");
    const unitLabelElement = unitLabel(element);
    unitLabelElement === null || unitLabelElement === void 0 ? void 0 : unitLabelElement.classList.add("error-unit-label");
    const wrapperElement = element.closest(".js-input-wrapper");
    const errorElement = wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.nextElementSibling;
    if (errorElement) {
        errorElement.innerHTML = "This field is required";
    }
}
function removeError(element) {
    element.classList.remove("error-input");
    const unitLabelElement = unitLabel(element);
    unitLabelElement === null || unitLabelElement === void 0 ? void 0 : unitLabelElement.classList.remove("error-unit-label");
    const wrapperElement = element.closest(".js-input-wrapper");
    const errorElement = wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.nextElementSibling;
    if (errorElement) {
        errorElement.innerHTML = "";
    }
}
export function verifyInput(input) {
    isValid = true;
    if (input.type === "radio") {
        const radioBtnName = input.name;
        const radioGroup = document.querySelectorAll(`input[name="${radioBtnName}"]`);
        const isAnyChecked = Array.from(radioGroup).some((radio) => {
            return radio.checked;
        });
        if (!isAnyChecked) {
            renderError(input);
            isValid = false;
        }
        else {
            removeError(input);
        }
    }
    else {
        if (input.value === "" || input.value === null) {
            renderError(input);
            isValid = false;
        }
        else {
            removeError(input);
        }
    }
    return isValid;
}
//# sourceMappingURL=functions.js.map
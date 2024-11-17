export function unitLabel(element) {
    return element.classList.contains("js-input-amount")
        ? element.previousElementSibling
        : element.nextElementSibling;
}
function renderError(element, errorMessage) {
    element.classList.add("error-input");
    const unitLabelElement = unitLabel(element);
    unitLabelElement === null || unitLabelElement === void 0 ? void 0 : unitLabelElement.classList.add("error-unit-label");
    const wrapperElement = element.closest(".js-input-wrapper");
    const errorElement = wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.nextElementSibling;
    if (errorElement) {
        errorElement.innerHTML = errorMessage;
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
export let isInputValid = true;
export let isInputValueValid = true;
export function verifyInput() {
    let isValid = true;
    document.querySelectorAll("input").forEach((input) => {
        if (input.type === "radio") {
            const radioBtnName = input.name;
            const radioGroup = document.querySelectorAll(`input[name="${radioBtnName}"]`);
            const isAnyChecked = Array.from(radioGroup).some((radio) => {
                return radio.checked;
            });
            if (!isAnyChecked) {
                renderError(input, "This field is required");
                isValid = false;
            }
            else {
                removeError(input);
            }
        }
        else if (input.type === "text") {
            if (input.value === "" || input.value === null) {
                renderError(input, "This field is required");
                isValid = false;
            }
            else {
                removeError(input);
            }
        }
    });
    if (!isValid)
        isInputValid = false;
    return isInputValid;
}
export function verifyInputValue() {
    let isValid = true;
    if (isInputValid) {
        document.querySelectorAll("input[type='text']").forEach((input) => {
            const inputElement = input;
            const value = inputElement.value.trim();
            if (isNaN(Number(value))) {
                renderError(inputElement, "Must be a valid value");
                isValid = false;
            }
            else {
                removeError(inputElement);
            }
        });
    }
    if (!isValid) {
        isInputValueValid = false;
    }
    return isInputValueValid;
}
export function clearAllInputs(form) {
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
        const errorElement = unitLabel(input);
        errorElement === null || errorElement === void 0 ? void 0 : errorElement.classList.remove("error-unit-label");
        document
            .querySelectorAll(".calculator__input--error")
            .forEach((element) => {
            element.innerText = "";
        });
    });
}
//# sourceMappingURL=functions.js.map
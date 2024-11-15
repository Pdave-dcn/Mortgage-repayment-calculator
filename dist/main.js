"use strict";
document.querySelectorAll("input[type='text'").forEach((input) => {
    input.addEventListener("focus", (event) => {
        const target = event.target;
        if (target.classList.contains("js-input-amount")) {
            const unitLabel = target.previousElementSibling;
            unitLabel === null || unitLabel === void 0 ? void 0 : unitLabel.classList.add("focus-unit-label");
        }
        else {
            const unitLabel = target.nextElementSibling;
            unitLabel === null || unitLabel === void 0 ? void 0 : unitLabel.classList.add("focus-unit-label");
        }
    });
    input.addEventListener("blur", (event) => {
        const target = event.target;
        if (target.classList.contains("js-input-amount")) {
            const unitLabel = target.previousElementSibling;
            unitLabel === null || unitLabel === void 0 ? void 0 : unitLabel.classList.remove("focus-unit-label");
        }
        else {
            const unitLabel = target.nextElementSibling;
            unitLabel === null || unitLabel === void 0 ? void 0 : unitLabel.classList.remove("focus-unit-label");
        }
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
//# sourceMappingURL=main.js.map
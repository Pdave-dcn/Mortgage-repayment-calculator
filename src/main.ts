document.querySelectorAll("input[type='text'").forEach((input) => {
  input.addEventListener("focus", (event) => {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains("js-input-amount")) {
      const unitLabel = target.previousElementSibling;
      unitLabel?.classList.add("focus-unit-label");
    } else {
      const unitLabel = target.nextElementSibling;
      unitLabel?.classList.add("focus-unit-label");
    }
  });

  input.addEventListener("blur", (event) => {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains("js-input-amount")) {
      const unitLabel = target.previousElementSibling;
      unitLabel?.classList.remove("focus-unit-label");
    } else {
      const unitLabel = target.nextElementSibling;
      unitLabel?.classList.remove("focus-unit-label");
    }
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

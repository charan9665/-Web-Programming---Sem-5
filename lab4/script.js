const countrySelect = document.querySelector("#country");
const capitalOutput = document.querySelector("#capital");

countrySelect.addEventListener("change", () => {
  capitalOutput.textContent = countrySelect.value
    ? `Capital: ${countrySelect.value}`
    : "";
});

const STORAGE_KEY = "lab8RegistrationDetails";
const detailsList = document.getElementById("details-list");
const emptyMessage = document.getElementById("empty-message");
const displayMessage = document.getElementById("display-message");

const detailFields = [
  ["Name", "name"],
  ["Gender", "gender"],
  ["Mobile", "mobile"],
  ["Email", "email"],
  ["City", "city"],
  ["State", "state"],
  ["Country", "country"]
];

// Show the empty state and hide any previously displayed details.
function showEmptyMessage(message) {
  detailsList.replaceChildren();
  detailsList.hidden = true;
  emptyMessage.textContent = message;
  emptyMessage.hidden = false;
}

// Read the saved JSON and safely add each detail to the page.
function displayData() {
  displayMessage.textContent = "";

  let data;
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      showEmptyMessage("No data available. Please fill the form first.");
      return;
    }
    data = JSON.parse(savedData);
  } catch (error) {
    showEmptyMessage("Saved details could not be read. Please return to the form.");
    return;
  }

  const hasAllFields = data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    detailFields.every(function (field) {
      return typeof data[field[1]] === "string" && data[field[1]].trim() !== "";
    });

  if (!hasAllFields) {
    showEmptyMessage("Saved details are incomplete. Please return to the form.");
    return;
  }

  detailsList.replaceChildren();
  detailFields.forEach(function (field) {
    const row = document.createElement("div");
    const label = document.createElement("dt");
    const value = document.createElement("dd");

    row.className = "detail-row";
    label.textContent = field[0];
    value.textContent = data[field[1]];
    row.append(label, value);
    detailsList.appendChild(row);
  });

  emptyMessage.hidden = true;
  detailsList.hidden = false;
}

// Return to the form so the user can edit or enter details.
document.getElementById("back-button").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Remove the saved data and show the no-data message.
document.getElementById("clear-button").addEventListener("click", function () {
  try {
    localStorage.removeItem(STORAGE_KEY);
    displayMessage.textContent = "";
    showEmptyMessage("No data available. Please fill the form first.");
  } catch (error) {
    displayMessage.textContent = "The saved details could not be cleared. Please try again.";
  }
});

// Load the saved details as soon as the display page is ready.
displayData();

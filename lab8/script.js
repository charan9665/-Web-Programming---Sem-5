// Find the registration form and its fields.
const registrationForm = document.getElementById("registration-form");
const formMessage = document.getElementById("form-message");

const fields = {
  name: document.getElementById("name"),
  mobile: document.getElementById("mobile"),
  email: document.getElementById("email"),
  city: document.getElementById("city"),
  state: document.getElementById("state"),
  country: document.getElementById("country")
};

// Put a field-specific error below its input or radio group.
function showFieldError(fieldName, message) {
  document.getElementById(fieldName + "-error").textContent = message;
}

// Check each required field and return the user details only when valid.
function validateForm() {
  const data = {
    name: fields.name.value.trim(),
    gender: document.querySelector('input[name="gender"]:checked')?.value || "",
    mobile: fields.mobile.value.trim(),
    email: fields.email.value.trim(),
    city: fields.city.value.trim(),
    state: fields.state.value,
    country: fields.country.value
  };
  let isValid = true;

  formMessage.textContent = "";
  Object.keys(fields).forEach(function (fieldName) {
    showFieldError(fieldName, "");
  });
  showFieldError("gender", "");

  if (!data.name) {
    showFieldError("name", "Please enter your name.");
    isValid = false;
  } else if (!/^[A-Za-z ]+$/.test(data.name)) {
    showFieldError("name", "Use letters and spaces only.");
    isValid = false;
  }

  if (!data.gender) {
    showFieldError("gender", "Please select a gender.");
    isValid = false;
  }

  if (!data.mobile) {
    showFieldError("mobile", "Please enter your mobile number.");
    isValid = false;
  } else if (!/^[6-9][0-9]{9}$/.test(data.mobile)) {
    showFieldError("mobile", "Enter exactly 10 digits starting with 6, 7, 8, or 9.");
    isValid = false;
  }

  if (!data.email) {
    showFieldError("email", "Please enter your email address.");
    isValid = false;
  } else if (!fields.email.validity.valid) {
    showFieldError("email", "Please enter a valid email address.");
    isValid = false;
  }

  if (!data.city) {
    showFieldError("city", "Please enter your city.");
    isValid = false;
  }

  if (!data.state) {
    showFieldError("state", "Please select your state.");
    isValid = false;
  }

  if (!data.country) {
    showFieldError("country", "Please select your country.");
    isValid = false;
  }

  return isValid ? data : null;
}

// Save the validated details as JSON and open the display page.
function saveData(data) {
  try {
    localStorage.setItem("lab8RegistrationDetails", JSON.stringify(data));
    window.location.href = "display.html";
  } catch (error) {
    formMessage.textContent = "Your details could not be saved. Please check browser storage and try again.";
  }
}

// Stop the normal form submission, validate, and save if all fields are valid.
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = validateForm();
  if (data) {
    saveData(data);
  }
});

// Remove previous messages when the user resets the form.
registrationForm.addEventListener("reset", function () {
  formMessage.textContent = "";
  Object.keys(fields).forEach(function (fieldName) {
    showFieldError(fieldName, "");
  });
  showFieldError("gender", "");
});

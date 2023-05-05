// Subscribe

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const nameError = document.querySelector(".i_name_error");
const emailError = document.querySelector(".i_email_error");
const button = document.querySelector(".subscribe_button");
const container = document.querySelector(".subscribe");

function validateForm(event) {
  event.preventDefault();
  if (checkLength(nameInput.value, 5) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (
    validateEmail(email.value) === true &&
    checkLength(nameInput.value, 5) === true
  ) {
    container.innerHTML = `<div class="loader"></div>`;
    setTimeout(() => {
      container.innerHTML = `<div class="subscribed">
        <p class="brown">You're a subscriber!</p>
        <p>I appreciate the support ♡</p></div>`;
    }, 1500);
  }
}

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

button.addEventListener("click", validateForm);

// slider

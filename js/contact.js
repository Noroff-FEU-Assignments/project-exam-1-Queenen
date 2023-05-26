// Contact Form

const nameInput = document.querySelector("#c_name");
const emailInput = document.querySelector("#c_email");
const subject = document.querySelector("#c_subject");
const message = document.querySelector("#c_message");
const nameError = document.querySelector(".c_name_error");
const emailError = document.querySelector(".c_email_error");
const subjectError = document.querySelector(".c_subject_error");
const messageError = document.querySelector(".c_message_error");
const button = document.querySelector(".c_button");
const form = document.querySelector(".contact_form");

function validateForm(event) {
  event.preventDefault();

  if (checkLength(nameInput.value, 4) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  if (checkLength(subject.value, 14) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkLength(message.value, 24) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (validateEmail(emailInput.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (
    checkLength(nameInput.value, 4) &&
    checkLength(subject.value, 14) &&
    checkLength(message.value, 24) &&
    validateEmail(emailInput.value) === true
  ) {
    form.innerHTML = `<center><div class="loader"></div></center>`;
    setTimeout(() => {
      form.innerHTML = `<div class="message_sent">
        <h2 class="brown">Your message is sent! ✉️</h2>
        <p>I will get back to you as soon as possible</p></div>`;
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

function validateEmail(emailInput) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(emailInput);
  return patternMatches;
}

button.addEventListener("click", validateForm);

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

// Latest Posts Slider

const firstSlide = document.querySelector("#first_slide");
const secondSlide = document.querySelector("#second_slide");
const thirdSlide = document.querySelector("#third_slide");
const dot1 = document.querySelector(".dot-1");
const dot2 = document.querySelector(".dot-2");
const dot3 = document.querySelector(".dot-3");

dot1.classList.add("selected");
secondSlide.style.display = "none";
thirdSlide.style.display = "none";

dot1.addEventListener("click", slide1);
dot2.addEventListener("click", slide2);
dot3.addEventListener("click", slide3);

function slide1() {
  dot1.classList.add("selected");
  dot2.classList.remove("selected");
  dot3.classList.remove("selected");
  firstSlide.style.display = "flex";
  secondSlide.style.display = "none";
  thirdSlide.style.display = "none";
}

function slide2() {
  dot2.classList.add("selected");
  dot1.classList.remove("selected");
  dot3.classList.remove("selected");
  firstSlide.style.display = "none";
  secondSlide.style.display = "flex";
  thirdSlide.style.display = "none";
}

function slide3() {
  dot3.classList.add("selected");
  dot1.classList.remove("selected");
  dot2.classList.remove("selected");
  firstSlide.style.display = "none";
  secondSlide.style.display = "none";
  thirdSlide.style.display = "flex";
}

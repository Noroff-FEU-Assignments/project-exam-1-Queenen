// Subscribe form

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const nameError = document.querySelector(".i_name_error");
const emailError = document.querySelector(".i_email_error");
const button = document.querySelector(".subscribe_button");
const container = document.querySelector(".subscribe");
const infoDiv = document.querySelector(".sub_info");
const subscribe = document.querySelector(".subscribe");

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
    validateEmail(email.value) === false &&
    checkLength(nameInput.value, 5) === false &&
    window.matchMedia("(min-width: 768px)")
  ) {
    infoDiv.style.marginTop = "2rem";
    button.style.marginTop = "1rem";
    subscribe.style.height = "15rem";
    subscribe.style.top = "250px";
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

// Latest posts slider

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

// Slider content

const url = "https://www.rainydaysshop.no/wp-json/wp/v2/posts";
const postContainer = document.querySelector(".post_container");
const indexPost = document.querySelector(".index_post");

async function fetchContent() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    for (let index = 0; index < results.length; index++) {
      var postSlug = results[index].slug;
      var postId = results[index].id;
      const images = results[index].content.rendered;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = images;
      const imgTags = tempDiv.getElementsByTagName("img");
      const date = results[index].date.substring(0, 10);
      const title = results[index].title.rendered;
      let description = results[index].excerpt.rendered;
      description = description.substring(3, 65) + " ...";

      for (let index = 0; index < imgTags.length; index++) {
        //leave as "var" for accessibility!
        var imgSrc = imgTags[index].src;
        var altText = imgTags[index].alt;
      }

      // Amount of posts by mediaquery

      // phone

      if (
        window.matchMedia("(min-width:0px) and (max-width: 767px)").matches &&
        index <= 0
      ) {
        createHTML(imgSrc, altText, title, date, description, firstSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:0px) and (max-width: 767px)").matches &&
        index <= 1
      ) {
        createHTML(imgSrc, altText, title, date, description, secondSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:0px) and (max-width: 767px)").matches &&
        index <= 2
      ) {
        createHTML(imgSrc, altText, title, date, description, thirdSlide);
        continue;
      }

      // tablet
      if (
        window.matchMedia("(min-width:768px) and (max-width: 991px)").matches &&
        index <= 1
      ) {
        createHTML(imgSrc, altText, title, date, description, firstSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:768px) and (max-width: 991px)").matches &&
        index <= 3
      ) {
        createHTML(imgSrc, altText, title, date, description, secondSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:768px) and (max-width: 991px)").matches &&
        index <= 5
      ) {
        createHTML(imgSrc, altText, title, date, description, thirdSlide);
        continue;
      }

      // deskop
      if (window.matchMedia("(min-width: 992px)").matches && index <= 2) {
        createHTML(imgSrc, altText, title, date, description, firstSlide);
        continue;
      }

      if (window.matchMedia("(min-width: 992px)").matches && index <= 5) {
        createHTML(imgSrc, altText, title, date, description, secondSlide);
        continue;
      }

      if (window.matchMedia("(min-width: 992px)").matches && index <= 8) {
        createHTML(imgSrc, altText, title, date, description, thirdSlide);
        continue;
      }

      function createHTML(imgSrc, altText, title, date, description, slide) {
        slide.innerHTML += `<div class="index_post">
                    <img src="${imgSrc}" alt="${altText}"/>
                    <center>
                    <p class="bold title">${title}</p>
                    <p class="italic">${date}</p>
                    <p class="review_info">${description}</p>
                    </center>
                    <a href="post.html?id=${postId}&name=${postSlug}" class="read-more">
                    <button>READ MORE</button>
                    </a>
                    </div>`;
      }
    }
  } catch (error) {
    postContainer.innerHTML = `<div class="loading_error"><p class="red">Unfortunately an error has occured, please try again later.</p>
      <p class="smaller">${error}</p></div>`;
  }
}

fetchContent();

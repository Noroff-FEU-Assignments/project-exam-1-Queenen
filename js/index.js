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
  if (checkLength(nameInput.value, 4) === true) {
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
    checkLength(nameInput.value, 4) === false &&
    window.matchMedia("(min-width: 768px)")
  ) {
    infoDiv.style.marginTop = "4rem";
    button.style.marginTop = "1rem";
    subscribe.style.height = "18rem";
    subscribe.style.top = "220px";
  }

  if (
    validateEmail(email.value) === true &&
    checkLength(nameInput.value, 4) === true
  ) {
    subscribe.style.height = "auto";
    container.innerHTML = `<div class="loader"></div>`;
    setTimeout(() => {
      container.innerHTML = `<div class="subscribed">
        <p>You're a subscriber!</p>
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
const progressBar = document.querySelector(".progress_bar");
const allDots = document.querySelectorAll(".dot");
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

const url = "https://www.rainydaysshop.no/wp-json/wp/v2/posts/?per_page=30";
const postContainer = document.querySelector(".post_container");
const card = document.querySelector(".post_card");

postContainer.innerHTML = `<div class="loader"></div>`;

async function fetchContent() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    postContainer.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      const title = results[i].title.rendered;
      const id = results[i].id;
      const slug = results[i].slug;
      const date = results[i].date.substring(0, 10);
      const shortDesc = results[i].excerpt.rendered.substring(3, 70) + " ...";
      const categories = results[i].categories[0];
      let categoryUrl;
      const images = results[i].content.rendered;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = images;
      const imgTags = tempDiv.getElementsByTagName("img");
      //
      for (let i = 0; i < imgTags.length; i++) {
        var src = imgTags[i].src;
        var alt = imgTags[i].alt;
      }

      allDots.forEach((dots) => {
        dots.style.display = "block";
      });

      //Amount of posts based of media queries
      if (
        window.matchMedia("(min-width:0px) and (max-width: 767px)").matches &&
        i <= 0
      ) {
        createHTML(title, id, slug, date, src, alt, shortDesc, firstSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:0px) and (max-width: 767px)").matches &&
        i <= 1
      ) {
        createHTML(title, id, slug, date, src, alt, shortDesc, secondSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:0px) and (max-width: 767px)").matches &&
        i <= 2
      ) {
        createHTML(title, id, slug, date, src, alt, shortDesc, thirdSlide);
        continue;
      }

      // tablet
      if (
        window.matchMedia("(min-width:767px) and (max-width: 990px)").matches &&
        i <= 1
      ) {
        createHTML(title, id, slug, date, src, alt, shortDesc, firstSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:767px) and (max-width: 990px)").matches &&
        i <= 3
      ) {
        createHTML(title, id, slug, date, src, alt, shortDesc, secondSlide);
        continue;
      }

      if (
        window.matchMedia("(min-width:767px) and (max-width: 990px)").matches &&
        i <= 5
      ) {
        createHTML(title, id, slug, date, src, alt, shortDesc, thirdSlide);
        continue;
      }

      // deskop
      if (window.matchMedia("(min-width: 991px)").matches && i <= 2) {
        createHTML(title, id, slug, date, src, alt, shortDesc, firstSlide);
        continue;
      }

      if (window.matchMedia("(min-width: 991px)").matches && i <= 5) {
        createHTML(title, id, slug, date, src, alt, shortDesc, secondSlide);
        continue;
      }

      if (window.matchMedia("(min-width: 991px)").matches && i <= 8) {
        createHTML(title, id, slug, date, src, alt, shortDesc, thirdSlide);
        continue;
      }

      //Create HTML of results
      function createHTML(title, id, slug, date, src, alt, shortDesc, slide) {
        slide.innerHTML += `<a href="post.html?id=${id}&name=${slug}"class="post_card">
                  <img src="${src}" alt="${alt}"/>
                  <center>
                  <p class="bold title">${title}</p>
                  <p class="italic">${date}</p>
                  <p class="review_info">${shortDesc}</p>
                  </center>
                  <button>READ MORE</button>
                  </a>`;
      }
    }
  } catch (error) {
    postContainer.innerHTML = `<div class="loading_error"><p class="red">Unfortunately an error has occured, please try again later.</p>
      <p style="font-size: 1.2rem">${error}</p></div>`;
  }
}

fetchContent();

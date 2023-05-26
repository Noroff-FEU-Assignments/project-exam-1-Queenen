const postHero = document.querySelector(".hero_post");
const postContainer = document.querySelector(".rg-post_container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://www.rainydaysshop.no/wp-json/wp/v2/posts/" + id;

async function fetchContent() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    const title = results.title.rendered;
    const date = results.date.substring(0, 10);
    let categories = results.categories[0];
    let categoryUrl;
    let returnText;
    //
    const content = results.content.rendered;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Extracting useful content from data
    const imgElements = tempDiv.querySelectorAll("img");
    const h2Elements = tempDiv.querySelectorAll("h2");
    const pElements = tempDiv.querySelectorAll("p");
    const liElements = tempDiv.querySelectorAll("li");

    // Store the extracted elements in separate variables or arrays
    const src = Array.from(imgElements).map((img) => img.getAttribute("src"));
    const alt = Array.from(imgElements).map((img) => img.getAttribute("alt"));
    const h2 = Array.from(h2Elements).map((h2) => h2.outerHTML);
    const p = Array.from(pElements).map((p) => p.outerHTML);
    const li = Array.from(liElements).map((li) => li.outerHTML);

    if (categories === 22) {
      returnText = "Guides";
      categoryUrl = "/guides.html";
      guideHTML(title, date, src, alt, li, categoryUrl, returnText);
    }
    if (categories === 23) {
      returnText = "Reviews";
      categoryUrl = "/reviews.html";
      reviewHTML(title, date, src, alt, li, categoryUrl, returnText, h2, p);
    }
  } catch (error) {
    postContainer.innerHTML = `<div class="loading_error"><p class="red">Unfortunately an error has occured, please try again later.</p>
    <p class="smaller">${error}</p></div>`;
    console.log(error);
  }
}

function reviewHTML(title, date, src, alt, li, categoryUrl, returnText, h2, p) {
  console.log(categoryUrl);
  postHero.innerHTML = `
  <div class="post_info">
    <h1 class="bold">${title}</h1>
    <p class="italic">${date}</p>
  </div>
  <img
    src="${src}"
    alt="${alt}"
    class="hero_img img_post" id="myImg" />
    </div>
  `;
  postContainer.innerHTML = `
  <div class="rg_content">
    <a href="${categoryUrl}" class="return"
      ><img
        src="/images/icons/arrow-left-circle.svg"
        alt="return to reviews" />${returnText}</a
    >
    <div class="description">
    ${h2[0]}
    ${p[0]}
    ${h2[1]}
    ${p[1]}
    ${h2[2]}
    <ol>${li}</ol>
    </div>
  </div>
  `;
}

function guideHTML(title, date, src, alt, li, categoryUrl, returnText, h2, p) {
  postHero.innerHTML = `
  <div class="post_info">
    <h1 class="bold">${title}</h1>
    <p class="italic">${date}</p>
  </div>
  <img
    src="${src}"
    alt="${alt}"
    class="hero_img img_post" id="myImg" />
    </div>
  `;
  postContainer.innerHTML = `
  <div class="rg_content">
    <a href="${categoryUrl}" class="return"
      ><img
        src="/images/icons/arrow-left-circle.svg"
        alt="return to reviews" />${returnText}</a
    >
    <div class="description">
    <ol>${li}</ol>
    </div>
  </div>
  `;
}

fetchContent();

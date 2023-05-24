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
    const description = results.excerpt.rendered;
    const images = results.content.rendered;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = images;
    const imgTags = tempDiv.getElementsByTagName("img");
    const imgSrc = imgTags[0].src;
    const altText = imgTags[0].alt;
    let categories = results.categories[0];
    let categoryUrl;

    function checkCategory() {
      if (categories === 22) {
        categories = "Guides";
        categoryUrl = "/guides.html";
      }
      if (categories === 23) {
        categories = "Reviews";
        categoryUrl = "/reviews.html";
      }
    }
    checkCategory();

    postHero.innerHTML = `
      <div class="post_info">
        <h1 class="bold">${title}</h1>
        <p class="italic">${date}</p>
      </div>
      <img
        src="${imgSrc}"
        alt="${altText}"
        class="hero_img img_post" />
      `;

    postContainer.innerHTML = `
      <div class="rg_content">
        <a href="${categoryUrl}" class="return"
          ><img
            src="/images/icons/arrow-left-circle.svg"
            alt="return to reviews" />${categories}</a
        >
        <div class="description">
          ${description}
        </div>
      </div>
      `;
  } catch (error) {
    postContainer.innerHTML = `<div class="loading_error"><p class="red">Unfortunately an error has occured, please try again later.</p>
    <p class="smaller">${error}</p></div>`;
  }
}

fetchContent();
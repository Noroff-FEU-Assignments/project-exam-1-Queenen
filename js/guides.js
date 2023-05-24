const hero = document.querySelector(".hero");
const container = document.querySelector(".reviews");

const url = "https://www.rainydaysshop.no/wp-json/wp/v2/posts";
let postsUrl = "http://127.0.0.1:5501/post.html";

async function fetchContent() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    for (let index = 0; index < results.length; index++) {
      //console.log(results[index]);
      const postId = results[index].id;
      const postSlug = results[index].slug;
      const title = results[index].title.rendered;
      const date = results[index].date.substring(0, 10);
      const images = results[index].content.rendered;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = images;
      const imgTags = tempDiv.getElementsByTagName("img");
      let description = results[index].excerpt.rendered;
      description = description.substring(3, 65) + " ...";

      let categories = results[index].categories[0];
      let categoryUrl;

      for (let index = 0; index < imgTags.length; index++) {
        //leave as "var" for accessibility!
        var imgSrc = imgTags[index].src;
        var altText = imgTags[index].alt;
      }

      if (categories === 22) {
        categories = "Guides";
        categoryUrl = "/guides.html";
        hero.innerHTML = `
      <h1 class="hero_title">${categories}</h1>
      <img
        src="/images/hero/guides.jpg"
        alt="view of a city in the sunset"
        class="hero_img" />
      `;

        container.innerHTML += `
      <div class="post_card">
        <img src="${imgSrc}" alt="${altText}" />
        <center>
          <p class="bold post_title">${title}</p>
          <p class="italic">${date}</p>

          <p class="review_info">
            ${description}
          </p>
        </center>
        <a href="post.html?id=${postId}&name=${postSlug}" class="read-more"
          ><button>READ MORE</button></a
        >
      </div>
      `;
      }
    }
  } catch (error) {
    container.innerHTML = `<div class="loading_error"><p class="red">Unfortunately an error has occured, please try again later.</p>
    <p class="smaller">${error}</p></div>`;
  }
}

fetchContent();

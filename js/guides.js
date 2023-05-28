const url =
  "https://www.rainydaysshop.no/wp-json/wp/v2/posts?categories=22&per_page=10";
const container = document.querySelector(".reviews");
const hero = document.querySelector(".hero");

container.innerHTML = `<div class="loader"></div>`;

async function fetchContent() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    container.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      const title = results[i].title.rendered;
      const slug = results[i].slug;
      const id = results[i].id;
      const date = results[i].date.substring(0, 10);
      const shortDesc = results[i].excerpt.rendered.substring(3, 70) + " ...";
      const content = results[i].content.rendered;
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

      createHTML(title, id, slug, date, shortDesc, src, alt);
    }
  } catch (error) {
    container.innerHTML = `<div class="loading_error"><p class="red">Unfortunately an error has occured, please try again later.</p>
      <p style="font-size: 1.2rem">${error}</p></div>`;
  }
}
fetchContent();

//Create HTML

function createHTML(title, id, slug, date, shortDesc, src, alt) {
  container.innerHTML += `
  <a href="post.html?id=${id}&name=${slug}"class="post_card">
    <img src="${src}" alt="${alt}" />
    <center>
      <p class="bold post_title">${title}</p>
      <p class="italic">${date}</p>

      <p class="review_info">
        ${shortDesc}
      </p>
    </center>
    <button>READ MORE</button>
  </a>
  `;
}

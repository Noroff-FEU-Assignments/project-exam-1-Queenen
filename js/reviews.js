const url =
  "https://www.rainydaysshop.no/wp-json/wp/v2/posts?categories=23&per_page=";
let postResults = 10;
const container = document.querySelector(".post_container");
const hero = document.querySelector(".hero");
const viewMoreBtn = document.querySelector(".view-more");
const viewLessBtn = document.querySelector(".view-less");

async function fetchContent() {
  try {
    const response = await fetch(url + postResults);
    const results = await response.json();

    container.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      const title = results[i].title.rendered;
      const slug = results[i].slug;
      const id = results[i].id;
      const date = results[i].date.substring(0, 10);
      const shortDesc = results[i].excerpt.rendered.substring(3, 70) + " ...";
      //
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
  } catch (error) {}
}
fetchContent();

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

viewMoreBtn.addEventListener("click", () => {
  postResults = 30;
  container.innerHTML = "";
  fetchContent();
  viewMoreBtn.style.display = "none";
  viewLessBtn.style.display = "block";

  setTimeout(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, 1000);
});

viewLessBtn.addEventListener("click", () => {
  postResults = 10;
  container.innerHTML = "";
  fetchContent();
  viewLessBtn.style.display = "none";
  viewMoreBtn.style.display = "block";
});

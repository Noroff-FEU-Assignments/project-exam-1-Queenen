// NAV MENU

const openMenu = document.querySelector(".open_menu");
const closeMenu = document.querySelector(".close_menu");
const navMenu = document.querySelector("header nav");

closeMenu.style.display = "none";
navMenu.style.display = "none";

openMenu.addEventListener("click", menuIsOpen);

function menuIsOpen() {
  openMenu.style.display = "none";
  closeMenu.style.display = "block";
  navMenu.style.display = "flex";
}

closeMenu.addEventListener("click", menuIsClosed);

function menuIsClosed() {
  closeMenu.style.display = "none";
  openMenu.style.display = "block";
  navMenu.style.display = "none";
}

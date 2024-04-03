/*======= #ELEMENTOS =======*/
const header = document.getElementById("header-nav-logo");
const headerNavLogoImg = document.getElementById("header-nav-img");
const headerNavMenu = document.getElementById("header-nav-menu");
const headerNavHamburger = document.getElementById("hamburger-btn");
const headerNavClose = document.getElementById("close-btn");
const patrimonyItem = document.getElementById("patrimony-item");
const headerNavSublist = document.getElementById("header-nav-sublist");
const patrimonyItemDescendants = document
  .getElementById("patrimony-item")
  .querySelectorAll("*");
const caretIcon = document.getElementById("caret-icon");
const menuLinks = document.querySelectorAll("#header-nav-menu a");
const sublistLinks = document.querySelectorAll("#header-nav-sublist a");

/*======= #EVENTOS =======*/
window.addEventListener("scroll", stickyMenuWhenScroll);

if (headerNavHamburger) {
  headerNavHamburger.addEventListener("click", showMenu);
}

if (headerNavClose) {
  headerNavClose.addEventListener("click", closeMenu);
}

/**
 * Ancho de pantalla mayor a 767px (desktop) -> eventos mouseover y mouseout en 'patrimonyItem'
 * para controlar la visibilidad de su sublista. Mismos eventos en los descendientes de 'patrimonyItem'
 * para cambiar la orientacion del icono caret
 */
if (window.innerWidth > 767) {
  patrimonyItem.addEventListener("mouseover", showSublist);
  patrimonyItem.addEventListener("mouseout", closeSublist);

  for (let i = 0; i < patrimonyItemDescendants.length; i++) {
    patrimonyItemDescendants[i].addEventListener("mouseover", (event) =>
      changeIcon("right", "down")
    );
  }

  for (let i = 0; i < patrimonyItemDescendants.length; i++) {
    patrimonyItemDescendants[i].addEventListener("mouseout", (event) =>
      changeIcon("down", "right")
    );
  }
}

/**
 * Click en el icono caret para cambiar su orientacion y mostrar la sublista de
 * 'patrimonyItem'
 */
if (window.innerWidth <= 767) {
  caretIcon.addEventListener("click", (event) => {
    if (event.target.className.includes("right")) {
      changeIcon("right", "down");
      showSublist();
    } else {
      changeIcon("down", "right");
      closeSublist();
    }
  });
}

for (let link of menuLinks) {
  link.addEventListener("click", closeMenu);
}

for (let link of sublistLinks) {
  link.addEventListener("click", closeSublist);
}

/*======= #METODOS Y FUNCIONES =======*/

/**
 * Modifica el logo y su tamaño para disminuir el header al hacer scroll (desktop)
 */
function stickyMenuWhenScroll() {
  if (window.scrollY > 0 /* && window.innerWidth > 767 */) {
    header.classList.add("js-sticky-menu");
    headerNavLogoImg.src = require("/src/assets/images/global/logo/logo-text.svg");
  } else {
    header.classList.remove("js-sticky-menu");
    headerNavLogoImg.src = require("/src/assets/images/global/logo/extended-logo.svg");
  }
}

function showMenu() {
  headerNavMenu.classList.add("js-show-menu");
}

function closeMenu() {
  headerNavMenu.classList.remove("js-show-menu");
}

function showSublist() {
  headerNavSublist.classList.add("js-show-sublist");
}

function closeSublist() {
  headerNavSublist.classList.remove("js-show-sublist");
}

/**
 * Modifica la orientacion del icono caret
 */
function changeIcon(oldWay, newWay) {
  caretIcon.className = caretIcon.className.replace(oldWay, newWay);
}

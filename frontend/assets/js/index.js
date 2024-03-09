// Hamburger Menu
document.addEventListener("DOMContentLoaded", function () {
  // This code will run when the DOM is fully loaded
  const mainMenu = document.querySelector(".mainMenu");
  const closeMenu = document.querySelector("#closeMenu");
  const openMenu = document.querySelector(".openMenu");

  openMenu.addEventListener("click", show);
  closeMenu.addEventListener("click", close);

  function show() {
    mainMenu.style.display = "flex";
    mainMenu.style.top = "0";
    closeMenu.style.display = "block";
  }

  function close() {
    mainMenu.style.top = "-100%";
    closeMenu.style.display = "none";
  }
});

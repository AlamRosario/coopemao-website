const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("navLinks"); // Corregido

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

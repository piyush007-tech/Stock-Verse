console.log("main.js loaded");

/* ===============================
   DARK / LIGHT MODE
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("btn-top");

  if (!themeBtn) {
    console.warn("Theme button not found");
    return;
  }

  let isDark = false;

  themeBtn.addEventListener("click", () => {
    isDark = !isDark;

    if (isDark) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      themeBtn.innerHTML = "☀️";
      document.body.classList.add("dark");
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      themeBtn.innerHTML = "🌙";
      document.body.classList.remove("dark");
    }
  });
});

/* ===============================
   UNDER DEVELOPMENT
   =============================== */
function showUnderDevelopment() {
  alert("🚧 Trending section is under development.\nPlease check back soon!");
}

/* expose for inline HTML usage */
window.showUnderDevelopment = showUnderDevelopment;
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});



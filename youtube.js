  // These find the elements for the theme selection pop-up
const modal = document.getElementById("themeModal");
const btn = document.getElementById("themeBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("themeForm");
// This opens the theme selection pop-up when you click the button
btn.onclick = function() {
  modal.style.display = "block";
}
// This closes the pop-up when you click the 'x'
span.onclick = function() {
  modal.style.display = "none";
}
// This closes the pop-up if you click outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// This handles what happens when you submit the theme form
form.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const theme = document.getElementById("theme").value;
  // It saves your preferences
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userTheme", theme);
  // It applies the theme you chose
  applyTheme(theme);
  // It closes the pop-up
  modal.style.display = "none";
}
// This function applies the theme you chose
function applyTheme(theme) {
  document.body.className = theme + "-theme";
}
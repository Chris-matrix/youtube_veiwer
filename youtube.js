  // These find the elements for the theme selection pop-up*/
const modal = document.getElementById("themeModal");
const btn = document.getElementById("themeBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("themeForm");

/* This opens the theme selection pop-up when you click the button/icon */
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
// This handles what happens when you submit the theme form*/
form.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const theme = document.getElementById("theme").value;
  // It saves your preferences
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userTheme", theme);
  // It applies the theme you chose*/
  applyTheme(theme);
  // It closes the pop-up*/
  modal.style.display = "none";
}
// This function applies the theme you chose*/
function applyTheme(theme) {
  document.body.className = theme + "-theme";
}

// Creating the js file for the sign-up form validation*//

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validate input
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // TODO: Implement additional validation as needed (e.g., check for existing username, password strength)Z*/

  // Send data to server for processing*//
  fetch('/create-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Handle successful account creation (e.g., redirect to login page)
      alert('Account created successfully!');
    } else {
      alert('Error creating account: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
});
// Login page Scripts
// -------------------------------------- Variables ------------------------------------------------
const allInputs = document.querySelectorAll("input"); // All inputs are reqd in this form.

const usernameLabel = document.getElementById("username-lbl");
const usernameInput = document.getElementById("username-input");

const passwordLabel = document.getElementById("password-lbl");
const passwordInput = document.getElementById("password-input");

const touchedStatus = "touched";
const loginErrorMsg =
  "A registered email for username and password is required to login.";

// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
for (let input of allInputs) {
  input.dataset.status = "untouched";
  input.dataset.errorMsg = loginErrorMsg;
}

// -------------------------------------- OnLoad Functions ----------------------------------------------
const focusUsernameInputOnLoad = () => usernameInput.focus();
window.addEventListener("load", focusUsernameInputOnLoad);

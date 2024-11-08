// Login page Scripts
// -------------------------------------- Variables ------------------------------------------------
const allInputs = document.querySelectorAll("input"); // All inputs are reqd in this form.

const usernameLabel = document.getElementById("username-lbl");
const usernameInput = document.getElementById("username-input");

const passwordLabel = document.getElementById("password-lbl");
const passwordInput = document.getElementById("password-input");

const loginBtn = document.getElementById("login-btn");

const errorMessage = "A registered email address and password are required to login.";
const untouchedStatus = "untouched";
const touchedStatus = "touched";
const errorClassName = "error";


// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
for (let input of allInputs) {
  input.dataset.status = untouchedStatus;
}

loginBtn.dataset.status = untouchedStatus;

usernameInput.dataset.errorMsg = errorMessage;
passwordInput.dataset.errorMsg = errorMessage;


// -------------------------------------- OnLoad Functions ----------------------------------------------
const focusUsernameInputOnLoad = () => usernameInput.focus();
window.addEventListener("load", focusUsernameInputOnLoad);


// -------------------------------------- Validation Functions --------------------------------------------
const addError = (inputEl, inputLabel) => {
  // If the error is displaying already, don't show again.
  if(inputEl.previousElementSibling && inputEl.previousElementSibling.className === errorClassName) {
    return;
  }

  const errorDiv = document.createElement("div");
  
  inputLabel.classList.add(errorClassName);
  errorDiv.className = errorClassName;
  errorDiv.innerHTML = `${inputEl.dataset.errorMsg}`;
  inputEl.parentNode.insertBefore(errorDiv, inputEl);
};

const removeError = (inputEl, inputLabel) => {
  if(inputEl.previousElementSibling && inputEl.previousElementSibling.className === errorClassName) {
    inputLabel.classList.remove(errorClassName);
    inputEl.previousElementSibling.remove();
  }
};

const checkInput = (inputEl, inputLabel) => {
  if(!inputEl.checkValidity()) {
    addError(inputEl, inputLabel);
    return false;
  } else {
    removeError(inputEl, inputLabel);
    return true;
  }
};


// -------------------------------------- Event Listeners & Handlers --------------------------------------
usernameInput.addEventListener("change", () => {
  usernameInput.dataset.status = touchedStatus;
  checkInput(usernameInput, usernameLabel);
});

usernameInput.addEventListener("input", () => {
  if(usernameInput.dataset.status === touchedStatus)
    checkInput(usernameInput, usernameLabel);
});

passwordInput.addEventListener("change", ()=>{
  passwordInput.dataset.status = touchedStatus;
  checkInput(passwordInput, passwordLabel);
});

passwordInput.addEventListener("input", () => {
  if(passwordInput.dataset.status === touchedStatus)
    checkInput(passwordInput, passwordLabel);
});

const handleClickLoginBtn = (event) => {
  const usernameIsValid = checkInput(usernameInput, usernameLabel);
  const passwordIsValid = checkInput(passwordInput, passwordLabel);

  if(!usernameIsValid || !passwordIsValid){
    event.preventDefault();
    alert("Please, fix required fields.");
  } else {
    // Clear the input fields on click of the Ok btn in the form submission alert.
    // setTimeout() with 0 ms wait allows just enough time for user to click the alert btn before
    // emptying the fields -- to avoid false negatives and erroring the fields again.  
    setTimeout(
      ()=>{
        usernameInput.innerText = "";
        usernameInput.value = "";
        passwordInput.innerText = "";
        passwordInput.value = "";
      }, 
      0
    );
  }
};

loginBtn.addEventListener("click", handleClickLoginBtn);

usernameInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") { 
    handleClickLoginBtn(event);
  }
});

passwordInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") { 
    handleClickLoginBtn(event);
  }
});

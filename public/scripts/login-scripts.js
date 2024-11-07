// Login page Scripts
// -------------------------------------- Variables ------------------------------------------------
const allInputs = document.querySelectorAll("input"); // All inputs are reqd in this form.

const usernameLabel = document.getElementById("username-lbl");
const usernameInput = document.getElementById("username-input");

const passwordLabel = document.getElementById("password-lbl");
const passwordInput = document.getElementById("password-input");

const loginBtn = document.getElementById("login-btn");

const touchedStatus = "touched";


// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
for (let input of allInputs) {
  input.dataset.status = "untouched";
}

usernameInput.dataset.errorMsg = "A registered email as your username is required to login."
passwordInput.dataset.errorMsg = "Password is required to login.";


// -------------------------------------- OnLoad Functions ----------------------------------------------
const focusUsernameInputOnLoad = () => usernameInput.focus();
window.addEventListener("load", focusUsernameInputOnLoad);


// -------------------------------------- Validation Functions --------------------------------------------
const addError = (inputEl, inputLabel) => {
  // If the error is displaying already, don't show again.
  if(inputEl.previousElementSibling && inputEl.previousElementSibling.className === "error") {
    return;
  }

  const errorDiv = document.createElement("div");
  
  inputLabel.classList.add("error");
  errorDiv.className = "error";
  errorDiv.innerHTML = `${inputEl.dataset.errorMsg}`;
  inputEl.parentNode.insertBefore(errorDiv, inputEl);
};

const removeError = (inputEl, inputLabel) => {
  if(inputEl.previousElementSibling && inputEl.previousElementSibling.className === "error") {
    inputLabel.classList.remove("error");
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
    //alert("Form Submitted");
    
    /* usernameInput.innerText = "";
    usernameInput.value = "";
    passwordInput.innerText = "";
    passwordInput.value = ""; */
  }
};

loginBtn.addEventListener("click", handleClickLoginBtn);

loginBtn.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") { 
    handleClickLoginBtn(event);
  }
});

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

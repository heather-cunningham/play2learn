// Login page Scripts
// -------------------------------------- Login form Scripts --------------------------------------
// -------------------------------------- Login form Variables ------------------------------------------------
const allLoginFormInputs = document.querySelectorAll("#login-form input"); // All Login form inputs are reqd.

const usernameLabel = document.getElementById("username-lbl");
const usernameInput = document.getElementById("username-input");

const passwordLabel = document.getElementById("password-lbl");
const passwordInput = document.getElementById("password-input");

const loginBtn = document.getElementById("login-btn");
const resetLoginFormBtn = document.getElementById("reset-form-btn");

const loginFormDiv = document.getElementById("login-form-div");
const registerLink = document.getElementById("register-link");
const registerFormDiv = document.getElementById("register-form-div");

const loginErrorMessage = "A registered email address and password are required to login.";
const untouchedStatus = "untouched";
const touchedStatus = "touched";
const errorClassName = "error";


// -------------------------------------- Login form datasets & Custom Error Msgs ----------------------------------

usernameInput.dataset.errorMsg = loginErrorMessage;
passwordInput.dataset.errorMsg = loginErrorMessage;


// -------------------------------------- Login form OnLoad Functions ----------------------------------------------
const focusUsernameInputOnLoad = () => usernameInput.focus();

const setAllLoginInputsToUntouched = () => {
  for(let loginInput of allLoginFormInputs){
    loginInput.dataset.status = untouchedStatus;
  }
};

window.addEventListener("load", ()=>{
  setAllLoginInputsToUntouched();
  focusUsernameInputOnLoad();
});


// -------------------------------------- Login form Validation Functions --------------------------------------------
const addError = (inputEl, inputLabel) => {
  // If the error is displaying already, don't show again.
  if(inputEl.previousElementSibling && inputEl.previousElementSibling.className === errorClassName)
    return;

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
  const inputID = inputEl.id;
  let doEntriesMatch = true;

  inputEl.dataset.status = touchedStatus;

  if(inputID === "confirm-username-input"){
    doEntriesMatch = confirmEntriesMatch(createUsernameInput.value, inputEl.value);
  }else if(inputID === "confirm-password-input"){
    doEntriesMatch = confirmEntriesMatch(createPasswordInput.value, inputEl.value);    
  }

  if(!doEntriesMatch || !inputEl.checkValidity() || (inputEl.value).trim() === " ") {
    addError(inputEl, inputLabel);
    return false;
  } else {
    removeError(inputEl, inputLabel);
    return true;
  }
};


// -------------------------------------- Login form Event Listeners & Handlers --------------------------------------
usernameInput.addEventListener("change", () => {
  checkInput(usernameInput, usernameLabel);
});

usernameInput.addEventListener("input", () => {
  if(usernameInput.dataset.status === touchedStatus)
    checkInput(usernameInput, usernameLabel);
});

passwordInput.addEventListener("change", ()=>{
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
      ()=> resetForm(allLoginFormInputs), 
      0
    );
  }
};

loginBtn.addEventListener("click", handleClickLoginBtn);

usernameInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter")
    handleClickLoginBtn(event);
});

passwordInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") 
    handleClickLoginBtn(event);
});

const resetForm = (listOfInputs) => {
  for(let input of listOfInputs){
    input.value = "";
    input.innerText = "";

    let inputLabel = document.querySelector(`label[for="${input.id}"]`);
    removeError(input, inputLabel);

    input.dataset.status = untouchedStatus;

    if(input.type === "checkbox" && input.checked){
      input.checked = false;
      input.value = "false";
      if(input.hasAttribute(checkedAttr)) 
        input.removeAttribute(checkedAttr);
    }

    listOfInputs[0].focus();
  }
};

resetLoginFormBtn.addEventListener("click", ()=>{
  resetForm(allLoginFormInputs);
});

const showForm = (event, formDivToShow, formDivToHide, formInputsList)=>{
  if(formDivToShow.style.display === "none") {
    event.preventDefault();

    formDivToHide.style.display = "none"
    formDivToShow.style.display = "block"

    resetForm(formInputsList);

    formInputsList[0].focus();
  }
};

registerLink.addEventListener("click", (event)=>{
  // @params = event, form to show, form to hide, list of the form to show's inputs
  showForm(event, registerFormDiv, loginFormDiv, allRegisterFormInputs);
});


// -------------------------------------- Register form Scripts ----------------------------------------------------
// -------------------------------------- Register form Variables ---------------------------------------------------
const allRegisterFormInputs = document.querySelectorAll("#registration-form input"); // All Login form inputs are reqd.

const createUsernameInput = document.getElementById("create-username-input");
const createUsernameLbl = document.getElementById("create-username-lbl");

const confirmUsernameInput = document.getElementById("confirm-username-input");
const confirmUsernameLbl = document.getElementById("confirm-username-lbl");;

const createPasswordInput = document.getElementById("create-password-input");
const createPasswordLbl = document.getElementById("create-password-lbl");

const confirmPasswordInput = document.getElementById("confirm-password-input");
const confirmPasswordLbl = document.getElementById("confirm-password-lbl");

const ageVerificationCkbox = document.getElementById("age-verification-ckbx");
const ageVerificationLbl = document.getElementById("age-verification-lbl");

const registerBtn = document.getElementById("register-btn");
const resetRegisterFormBtn = document.getElementById("reset-register-form-btn");

const loginLink = document.getElementById("login-link");

const confirmInputErrorMsg = "Entries do not match.";

const checkedAttr = "checked";


// -------------------------------------- Register form datasets & Custom Error Msgs ----------------------------------
createUsernameInput.dataset.errorMsg = `Please, enter a valid email to use as your username.`;

confirmUsernameInput.dataset.errorMsg = confirmInputErrorMsg

createPasswordInput.dataset.errorMsg = 
  `Must be between ${createPasswordInput.minLength} and ${createPasswordInput.maxLength} characters.`;

confirmPasswordInput.dataset.errorMsg = confirmInputErrorMsg;

ageVerificationCkbox.dataset.errorMsg = "You must attest you're 13 years old or older to proceed.";


// -------------------------------------- Register form Event Listeners & Handlers --------------------------------------
createUsernameInput.addEventListener("change", () => {
  checkInput(createUsernameInput, createUsernameLbl);
});

createUsernameInput.addEventListener("input", () => {
  if(createUsernameInput.dataset.status === touchedStatus)
    checkInput(createUsernameInput, createUsernameLbl);
});


confirmUsernameInput.addEventListener("change", () => {
  checkInput(confirmUsernameInput, confirmUsernameLbl);
});

confirmUsernameInput.addEventListener("input", () => {
  if(confirmUsernameInput.dataset.status === touchedStatus)
    checkInput(confirmUsernameInput, confirmUsernameLbl);
});


createPasswordInput.addEventListener("change", () => {
  checkInput(createPasswordInput, createPasswordLbl);
});

createUsernameInput.addEventListener("input", () => {
  if(createUsernameInput.dataset.status === touchedStatus)
    checkInput(createUsernameInput, createUsernameLbl);
});

confirmPasswordInput.addEventListener("change", () => {
  checkInput(confirmPasswordInput, confirmPasswordLbl);
});

confirmPasswordInput.addEventListener("input", () => {
  if(confirmPasswordInput.dataset.status === touchedStatus)
    checkInput(confirmPasswordInput, confirmPasswordLbl);
});

const updateCheckbox = (checkboxEl) => {
  if(checkboxEl.checked) {
    checkboxEl.setAttribute(checkedAttr, "");
    checkboxEl.value = "true";
  } else {
    checkboxEl.removeAttribute(checkedAttr);
    checkboxEl.checked = false;
    checkboxEl.value = "false";
  }
};

ageVerificationCkbox.addEventListener("click", () => {
  checkInput(ageVerificationCkbox, ageVerificationLbl);
  updateCheckbox(ageVerificationCkbox);
});

const confirmEntriesMatch = (inputVal, reenteredVal) => {
  return inputVal === reenteredVal ? true : false;
};

const handleClickRegisterBtn = (event) => {
  const createdUsernameIsValid = checkInput(createUsernameInput, createUsernameLbl);
  const confirmedUsernameIsValid = checkInput(confirmUsernameInput, confirmUsernameLbl);

  const createdPasswordIsValid = checkInput(createPasswordInput, createPasswordLbl);
  const confirmedPasswordIsValid = checkInput(confirmPasswordInput, confirmPasswordLbl);

  const ageVerificationCkboxIsValid = checkInput(ageVerificationCkbox, ageVerificationLbl);

  if(!createdUsernameIsValid || !confirmedUsernameIsValid 
      || !createdPasswordIsValid || !confirmedPasswordIsValid
      || !ageVerificationCkboxIsValid) {
    event.preventDefault();
    alert("Please, fix required fields.");
    
    ageVerificationCkbox.checked = false;
    ageVerificationCkbox.value = "false";

    if(ageVerificationCkbox.hasAttribute(checkedAttr)){
      ageVerificationCkbox.removeAttribute(checkedAttr);
    }
  } else {
    // Clear the input fields on click of the Ok btn in the form submission alert.
    // setTimeout() with 0 ms wait allows just enough time for user to click the alert btn before
    // emptying the fields -- to avoid false negatives and erroring the fields again.  
    setTimeout(
      ()=> resetForm(allRegisterFormInputs), 
      0
    );
  }
};

registerBtn.addEventListener("click", handleClickRegisterBtn);

createUsernameInput.addEventListener("keydown", (event)=>{
  if(event.key === "Enter")
    handleClickRegisterBtn(event);
});

confirmUsernameInput.addEventListener("keydown", (event)=>{
  if(event.key === "Enter")
    handleClickRegisterBtn(event);
});

createPasswordInput.addEventListener("keydown", (event)=>{
  if(event.key === "Enter")
    handleClickRegisterBtn(event);
});

confirmPasswordInput.addEventListener("keydown", (event)=>{
  if(event.key === "Enter")
    handleClickRegisterBtn(event);
});

ageVerificationCkbox.addEventListener("keydown", (event)=>{
  if(event.key === "Enter") {
    ageVerificationCkbox.checked = true;
    updateCheckbox(ageVerificationCkbox);
    handleClickRegisterBtn(event);
  }
});

resetRegisterFormBtn.addEventListener("click", ()=>{
  resetForm(allRegisterFormInputs);
});

loginLink.addEventListener("click", (event)=>{
  // @params = event, form to show, form to hide, list of the form to show's inputs 
  showForm(event, loginFormDiv, registerFormDiv, allLoginFormInputs);
});


// Contact Us page Scripts
// -------------------------------------- Variables ------------------------------------------------
const allInputs = document.querySelectorAll("input, textarea"); // All inputs are reqd in this form.

const emailLabel = document.getElementById("email-lbl");
const emailInput = document.getElementById("email-input");

const subjectLabel = document.getElementById("msg-subject-lbl");
const subjectInput = document.getElementById("msg-subject-input");

const msgLabel = document.getElementById("message-lbl");
const msgTextareaInput = document.getElementById("message-textarea");

const sendBtn = document.getElementById("send-msg-btn");
const resetContactFormBtn = document.getElementById("reset-form-btn");

const contactResponse = document.getElementById("contact-us-response");

const touchedStatus = "touched";
const errorClassName = "error";


// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
for (let input of allInputs) {
  input.dataset.status = "untouched";
}

emailInput.dataset.errorMsg = `Please, enter a valid email.`;

subjectInput.dataset.errorMsg = 
  `A subject between ${subjectInput.minLength}-${subjectInput.maxLength} characters is required.`;

msgTextareaInput.dataset.errorMsg = 
  `A message between ${msgTextareaInput.minLength}-${msgTextareaInput.maxLength} characters is required.`;

// -------------------------------------- OnLoad Functions ----------------------------------------------
const focusEmailInputOnLoad = () => emailInput.focus();
window.addEventListener("load", focusEmailInputOnLoad);


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
  if(!inputEl.checkValidity() || (inputEl.value).trim() === " ") {
    addError(inputEl, inputLabel);
    return false;
  } else {
    removeError(inputEl, inputLabel);
    return true;
  }
};


// -------------------------------------- Event Listeners & Handlers --------------------------------------
emailInput.addEventListener("change", () => {
  emailInput.dataset.status = touchedStatus;
  checkInput(emailInput, emailLabel);
});

emailInput.addEventListener("input", () => {
  if(emailInput.dataset.status === touchedStatus)
    checkInput(emailInput, emailLabel);
});

subjectInput.addEventListener("change", ()=>{
  subjectInput.dataset.status = touchedStatus;
  checkInput(subjectInput, subjectLabel);
});

subjectInput.addEventListener("input", () => {
  if(subjectInput.dataset.status === touchedStatus)
    checkInput(subjectInput, subjectLabel);
});

msgTextareaInput.addEventListener("change", ()=>{
  msgTextareaInput.dataset.status = touchedStatus;
  checkInput(msgTextareaInput, msgLabel);
});

msgTextareaInput.addEventListener("input", () => {
  if(msgTextareaInput.dataset.status === touchedStatus)
    checkInput(msgTextareaInput, msgLabel);
});

const handleClickSendBtn = (event) => {
  const emailIsValid = checkInput(emailInput, emailLabel);
  const subjectIsValid = checkInput(subjectInput, subjectLabel);
  const msgIsValid = checkInput(msgTextareaInput, msgLabel);

  validateEmailAddySent();

  if(!emailIsValid || !subjectIsValid || !msgIsValid){
    event.preventDefault();
    alert("Please, fix required fields.");
  } else {
    alert("Form Submitted");

    // Clear the input fields on click of the Ok btn in the form submission alert.
    // setTimeout() with 0 ms wait allows just enough time for user to click the alert btn before
    // emptying the fields -- to avoid false negatives and erroring the fields again.  
    setTimeout(
      () => resetContactForm(), 
      0
    );
  }
};

sendBtn.addEventListener("click", (event)=>{
  handleClickSendBtn(event);
});

emailInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") 
    handleClickSendBtn(event);
});

subjectInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") 
    handleClickSendBtn(event);
});

msgTextareaInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") 
    handleClickSendBtn(event);
});

const resetContactForm = () => {
  for (let input of allInputs) {
    input.value = "";
    input.innerText = "";

    let inputLabel = document.querySelector(`label[for="${input.id}"]`);
    removeError(input, inputLabel);

    input.dataset.status = "untouched";
  }

  if(contactResponse && contactResponse.style.display === "block"){
    contactResponse.innerHTML = "";
    contactResponse.style.display = "none";
  }
};

resetContactFormBtn.addEventListener("click", resetContactForm);

// -------------------------------------- AJAX Validation Fcns-----------------------------------------
const validateEmailAddySent = () => {
  const emailAddressSent = emailInput.value;
  const xmlHttpReq = new XMLHttpRequest();

  xmlHttpReq.open("POST", "/contact-response-msg", true);

  xmlHttpReq.onreadystatechange = () => {
    if (xmlHttpReq.readyState === XMLHttpRequest.DONE && xmlHttpReq.status === 200) {
      contactResponse.style.display = "block";
      contactResponse.innerHTML = xmlHttpReq.responseText;
    }
  };

  xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpReq.send("email=" + emailAddressSent);
};

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
const resetBtn = document.getElementById("reset-form-btn");

const contactResponse = document.getElementById("contact-us-response");

const touchedStatus = "touched";


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

window.addEventListener("load", () => {
  focusEmailInputOnLoad();
});


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

  if(!emailIsValid || !subjectIsValid || !msgIsValid){
    event.preventDefault();
    alert("Please, fix required fields.");
  }
};

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

const resetForm = () => {
  emailInput.value = "";
  emailInput.innerText = "";
  removeError(emailInput, emailLabel);

  subjectInput.value = "";
  subjectInput.innerText = "";
  removeError(subjectInput, subjectLabel);

  msgTextareaInput.value = "";
  msgTextareaInput.innerText = "";
  removeError(msgTextareaInput, msgLabel);

  if(contactResponse && contactResponse.style.display === "block"){
    contactResponse.innerHTML = "";
    contactResponse.style.display = "none";
  }
};

resetBtn.addEventListener("click", resetForm);
resetBtn.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") 
    resetForm();
});
// -------------------------------------- AJAX Validation Fcns-----------------------------------------
const validateEmailAddySent = () => {
    const emailAddressSent = emailInput.value;
    const xmlHttpReq = new XMLHttpRequest();

    contactResponse.style.display = "block";
    contactResponse.innerHTML = "<p>Sending message...</p>";

    xmlHttpReq.open("POST", "/contact-response-msg", true);

    xmlHttpReq.onreadystatechange = () => {
      if(xmlHttpReq.readyState == XMLHttpRequest.DONE && xmlHttpReq.status == 200){
        contactResponse.innerHTML = xmlHttpReq.responseText;
      }
    };

    xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttpReq.send("email=" + emailAddressSent);
};

sendBtn.addEventListener("click", (event)=>{
  handleClickSendBtn(event);
  validateEmailAddySent(event);
});

sendBtn.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") { 
    handleClickSendBtn(event);
    validateEmailAddySent();
  }
});

// Could not get these to work at all and can't figure out what's wrong -- at least, not based on lessons.
/* const validateSubjSent = (event) => {
  const subjSent = subjectInput.value;
  const xmlHttpReq = new XMLHttpRequest();

  contactResponse.style.display = "block";
  contactResponse.innerHTML = "<p>Sending message...</p>";

  xmlHttpReq.open("POST", "/contact-response-msg", false);

  xmlHttpReq.onreadystatechange = () => {
    if(xmlHttpReq.readyState == XMLHttpRequest.DONE && xmlHttpReq.status == 200){
      contactResponse.innerHTML = xmlHttpReq.responseText;
    }
  };

  xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpReq.send("subject=" + subjSent);
};

const validateMessageSent = (event) => {
  const msgSent = msgTextareaInput.value;
  const xmlHttpReq = new XMLHttpRequest();

  contactResponse.style.display = "block";
  contactResponse.innerHTML = "<p>Sending message...</p>";

  xmlHttpReq.open("POST", "/contact-response-msg", false);

  xmlHttpReq.onreadystatechange = () => {
    if(xmlHttpReq.readyState == XMLHttpRequest.DONE && xmlHttpReq.status == 200){
      contactResponse.innerHTML = xmlHttpReq.responseText;
    }
  };

  xmlHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttpReq.send("message=" + msgSent);
};

sendBtn.addEventListener("click", validateSubjSent);
sendBtn.addEventListener("click", validateMessageSent);
 */





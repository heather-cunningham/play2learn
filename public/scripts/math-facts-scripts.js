const mathFactsSelectDiv = document.getElementById("math-facts-select-div");
const mathFactsSelect = document.getElementById("math-facts-select");
const mathFactsOptions = document.querySelectorAll("#math-facts-select option")

const mathFactsStartDiv = document.getElementById("math-facts-start");
const mathFactsGameDiv = document.getElementById("math-facts-game");

const mathFactsGoBtn = document.getElementById("math-facts-go-btn");
const mathFactsQuitBtn = document.getElementById("math-facts-quit-btn");

const opSelectedHeader = document.getElementById("math-operation-selected-header");
let operationSelected = "";

const mathFactsAnswerInput = document.getElementById("math-facts-answer-input");

const calcButtonsList = document.querySelectorAll("#calculator-buttons button");
const calcNumButtonsList = document.querySelectorAll(".calc-num-btn");

const calcClearBtn = document.getElementById("calculator-clear-btn");
const calcNegateBtn = document.getElementById("calculator-negate-btn");
const calcDecimalBtn = document.getElementById("calculator-decimal-btn");
const calcEnterBtn = document.getElementById("calculator-enter-btn");

const mathScoreTxtbox = document.getElementById("math-score-input");
const mathTimeTxtbox = document.getElementById("math-time-input");

const selectedOperatorSpan = document.getElementById("selected-operator");
const operandSpansList = document.querySelectorAll(".operand");
const arithmeticOperatorsObj = {
  addition: "+",
  subtraction: "-",
  division: "/",
  multiplication: "*"
};

const timeCounter = 30;
let timerIntervalId;


// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
mathFactsSelect.dataset.errorMsg = "You must select one:";

mathFactsAnswerInput.dataset.errorMsg = "NOT A NUMBER!";

// -------------------------------------- addEventListener()'s ---------------------------------------
const focusMathFactsInput = (inputEl)=>{
  inputEl.focus();
};
window.addEventListener("load", ()=>{
  focusMathFactsInput(mathFactsSelect);
});

const addRemoveErrorOnSelect = ()=>{
  if (mathFactsSelect.selectedIndex === 0
    && mathFactsSelectDiv.previousElementSibling.className !== 'error') {
      //addError div:
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = `${mathFactsSelect.dataset.errorMsg}`;
      errorDiv.className = 'error';
      mathFactsSelectDiv.parentNode.insertBefore(errorDiv, mathFactsSelectDiv);
  } else if(mathFactsSelect.selectedIndex !== 0
    && mathFactsSelectDiv.previousElementSibling.className === 'error') {
      //removeError div
      mathFactsSelectDiv.previousElementSibling.remove();
  }
};

const updateSelected = ()=>{
  // If the option selected is NOT the default of 0
  if (mathFactsSelect.selectedIndex !== 0 ) {
    mathFactsSelect.options[0].removeAttribute('selected');
    mathFactsSelect.options[mathFactsSelect.selectedIndex].setAttribute('selected', '');
    return mathFactsSelect.options[mathFactsSelect.selectedIndex].value;
  } else {
    mathFactsSelect.options[mathFactsSelect.selectedIndex].removeAttribute('selected');
    mathFactsSelect.selectedIndex = 0;
    mathFactsSelect.options[0].setAttribute('selected', '');
  }
  return null;
};

const checkMathFactsSelect = (event) => {
  event.preventDefault();
  
  // If the option selected is still the default of 0
  if (mathFactsSelect.selectedIndex === 0 ) {
    mathFactsSelect.setCustomValidity('Invalid');
    addRemoveErrorOnSelect();
    return false;
  } else {
    mathFactsSelect.setCustomValidity('');
    addRemoveErrorOnSelect();
    return true;
  }
};
mathFactsSelect.addEventListener("change", checkMathFactsSelect);

/*
* Returns a random integer between zero to nine
* */
const getRandomInt = ()=>{
  return Math.floor(Math.random() * 10);
};

const setOperationAndExpression = ()=>{
  operationSelected = updateSelected();
  // set the operation header to the one selected
  opSelectedHeader.innerText = operationSelected !== null ? operationSelected : "";
  operationSelected = operationSelected.toLowerCase();
  
  // set the operator for the arithmetic expression per the operation selected
  const operatorSelected = arithmeticOperatorsObj[operationSelected];
  selectedOperatorSpan.innerText = operatorSelected !== null ? operatorSelected : "";
  
  // set the operands
  let operand1 = getRandomInt();
  let operand2 = getRandomInt();
  if(operationSelected === "division" && operand2 === 0){
    while(operand2 <= 0 ){
      operand2 = getRandomInt();
    }
  }
  operandSpansList[0].innerText = `${operand1}`;
  operandSpansList[1].innerText = `${operand2}`;
};

const enableGameBoard = ()=>{
  mathFactsAnswerInput.disabled = false;
  mathFactsAnswerInput.classList.remove("disabled");
  mathFactsAnswerInput.classList.add("enabled");
  
  for(let button of calcButtonsList){
    button.disabled = false;
    button.classList.remove("disabled");
    button.classList.add("enabled");
  }
};

const resetGameBoard = ()=>{
  enableGameBoard();
  setOperationAndExpression();
  clearCalculatorInput();
  
  mathScoreTxtbox.style.backgroundColor = "floralwhite";
  mathScoreTxtbox.value = "0";
  mathScoreTxtbox.innerText = "0";
  
  mathTimeTxtbox.classList.remove("shake");
  mathTimeTxtbox.style.backgroundColor = "floralwhite";
  
  mathTimeTxtbox.value = `${timeCounter}`;
  mathTimeTxtbox.innerText = `${timeCounter}`;
};

const startTimer = (timeCounter)=>{
  timerIntervalId = setInterval(
    () => {
      if(timeCounter >= 0) {
        mathTimeTxtbox.value = `${timeCounter}`;
        mathTimeTxtbox.innerText = `${timeCounter}`;
        timeCounter--;
      } else {
        // stopTimer(timerIntervalId);
        // endGame();
      }
    },
    1000
  );
};

const stopTimer = (timerIntervalId)=>{
  clearInterval(timerIntervalId);
};

const disableGameBoard = ()=>{
  mathFactsAnswerInput.classList.remove("enabled");
  mathFactsAnswerInput.classList.add("disabled");
  mathFactsAnswerInput.disabled = true;
  
  for(let button of calcButtonsList){
    button.classList.remove("enabled");
    button.classList.add("disabled");
    button.disabled = true;
  }
};

const endGame = ()=>{
  mathScoreTxtbox.style.backgroundColor = "yellow";
  
  mathTimeTxtbox.style.backgroundColor = "yellow";
  mathTimeTxtbox.value = "TIME'S UP!!!";
  mathTimeTxtbox.innerText = "TIME'S UP!!!";
  mathTimeTxtbox.classList.add("shake");
  
  clearCalculatorInput();
  disableGameBoard();
};

const showGameBoard = (event) =>{
  event.preventDefault();
  
  if(checkMathFactsSelect(event)) {
    if (mathFactsGameDiv.style.display === "none") {
      mathFactsStartDiv.style.display = "none";
      mathFactsGameDiv.style.display = "block";
      
      resetGameBoard();
      focusMathFactsInput(mathFactsAnswerInput);
      //startTimer(timeCounter);
      resetStartScreen();
    }
  }
};
mathFactsGoBtn.addEventListener("click", showGameBoard);
mathFactsSelect.addEventListener("keydown", (event)=>{
  if (event.key === "Enter")
    showGameBoard(event);
});
for(let option of mathFactsOptions){
  option.addEventListener("keydown", (event)=>{
    if (event.key === "Enter")
      showGameBoard(event);
  });
}

const resetStartScreen = ()=>{
  mathFactsSelect.selectedIndex = 0;
  updateSelected();
};

const quitGameBoard = (event) =>{
  event.preventDefault();
  
  if(mathFactsStartDiv.style.display === "none") {
    mathFactsGameDiv.style.display = "none";
    mathFactsStartDiv.style.display = "block";
    
    // stopTimer(timerIntervalId);
    clearCalculatorInput();
    
    focusMathFactsInput(mathFactsSelect);
    resetStartScreen();
    resetGameBoard();
  }
};
mathFactsQuitBtn.addEventListener("click", quitGameBoard);

const clearCalculatorInput = ()=>{
  mathFactsAnswerInput.style.backgroundColor = "white";
  mathFactsAnswerInput.style.fontWeight = "normal";
  mathFactsAnswerInput.style.color = "black";
  
  mathFactsAnswerInput.innerText = "";
  mathFactsAnswerInput.value = "";
  mathFactsAnswerInput.setAttribute("value", "");
  focusMathFactsInput(mathFactsAnswerInput);
};
calcClearBtn.addEventListener("click", clearCalculatorInput);

const clickCalculatorNumBtn = (event)=>{
  event.preventDefault();
  const numValue = event.target.value;
  
  mathFactsAnswerInput.value += numValue;
  mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
  mathFactsAnswerInput.innerText += mathFactsAnswerInput.value;
};
for(let numButton of calcNumButtonsList){
  numButton.addEventListener("click", clickCalculatorNumBtn);
}

const clickCalcDecimalBtn = (event)=>{
  event.preventDefault();
  let decimalPoint = event.target.value === "." ? event.target.value : ".";
  
  if(mathFactsAnswerInput.value === "" && mathFactsAnswerInput.innerText === ""){
    mathFactsAnswerInput.value = "0" + decimalPoint;
    mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
    mathFactsAnswerInput.innerText = mathFactsAnswerInput.value;
  } else if (mathFactsAnswerInput.value.charAt(0) === decimalPoint
      || mathFactsAnswerInput.innerText.charAt(0) === decimalPoint) {
        mathFactsAnswerInput.value = "0" + mathFactsAnswerInput.value;
        mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
        mathFactsAnswerInput.innerText = mathFactsAnswerInput.value;
  } else if (mathFactsAnswerInput.value.includes(decimalPoint)
      || mathFactsAnswerInput.innerText.includes(decimalPoint)) {
    // don't add another decimal point
    const decimalPnt1Index = mathFactsAnswerInput.value.indexOf(decimalPoint);
    mathFactsAnswerInput.value = mathFactsAnswerInput.value.slice(0, decimalPnt1Index + 1)
      + mathFactsAnswerInput.value.slice(decimalPnt1Index + 1).replaceAll(decimalPoint, "");
    mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
    mathFactsAnswerInput.innerText = mathFactsAnswerInput.value;
  }
};
calcDecimalBtn.addEventListener("click", clickCalcDecimalBtn);

const clickCalcNegateBtn = (event)=>{
  event.preventDefault();
  const negativeSymbol = event.target.value === "-" ? event.target.value : "-";
  
  if (mathFactsAnswerInput.value === "0" || mathFactsAnswerInput.innerText === "0") {
    mathFactsAnswerInput.value = "0";
    mathFactsAnswerInput.setAttribute("value", "0");
    mathFactsAnswerInput.innerText = "0";
  } else if((mathFactsAnswerInput.value === "" || mathFactsAnswerInput.innerText === "")
    && (mathFactsAnswerInput.value.length <= 0 && mathFactsAnswerInput.innerText.length <= 0)){
    mathFactsAnswerInput.value = negativeSymbol;
    mathFactsAnswerInput.setAttribute("value", negativeSymbol);
    mathFactsAnswerInput.innerText = mathFactsAnswerInput.value;
  } else if (mathFactsAnswerInput.value.charAt(0) === negativeSymbol
      || mathFactsAnswerInput.innerText.charAt(0) === negativeSymbol) {
    mathFactsAnswerInput.value = mathFactsAnswerInput.value.slice(1);
    mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
    mathFactsAnswerInput.innerText = mathFactsAnswerInput.value;
  } else {
    mathFactsAnswerInput.value = negativeSymbol + mathFactsAnswerInput.value;
    mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
    mathFactsAnswerInput.innerText = mathFactsAnswerInput.value;
  }
};
calcNegateBtn.addEventListener("click", clickCalcNegateBtn);

const validateMathFactsAnswerInput = (event)=>{
  const regExPattern = /^-?\d*\.?\d*$/;
  const entry = mathFactsAnswerInput.value;
  
  if(!entry.match(regExPattern)) {
    event.preventDefault();
    mathFactsAnswerInput.value = `${mathFactsAnswerInput.dataset.errorMsg}`;
    mathFactsAnswerInput.style.backgroundColor = "yellow";
    mathFactsAnswerInput.style.fontWeight = "bold";
    mathFactsAnswerInput.style.color = "red";
    setTimeout(()=> clearCalculatorInput(), 1000 );
  } else if ((mathFactsAnswerInput.value.charAt(0) === "0" || mathFactsAnswerInput.innerText.charAt(0) === "0")
    && (mathFactsAnswerInput.value.charAt(1) !== "." || mathFactsAnswerInput.value.charAt(1) !== ".") ) {
    // NOTE:  Could not even get Copilot to create the correct regex pattern to check for this condtion.
    // This works, but now can't type a zero into the input w/o throwing the error.
    // Need to do the touched/untouched code pattern so the error doesn't throw until user is done
    // typing.
    event.preventDefault();
    mathFactsAnswerInput.value = `${mathFactsAnswerInput.dataset.errorMsg}`;
    mathFactsAnswerInput.style.backgroundColor = "yellow";
    mathFactsAnswerInput.style.fontWeight = "bold";
    mathFactsAnswerInput.style.color = "red";
    setTimeout(()=> clearCalculatorInput(), 1000 );
  } else if (mathFactsAnswerInput.value.charAt(0) === "."
    || mathFactsAnswerInput.innerText.charAt(0) === ".") {
      mathFactsAnswerInput.value = "0" + mathFactsAnswerInput.value;
      mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
      mathFactsAnswerInput.innerText = mathFactsAnswerInput.value;
  }
};
calcEnterBtn.addEventListener("click", validateMathFactsAnswerInput);

mathFactsAnswerInput.addEventListener("keydown", (event)=>{
  if(event.key ===  "Enter")
    validateMathFactsAnswerInput(event);
});

mathFactsAnswerInput.addEventListener("input", validateMathFactsAnswerInput);


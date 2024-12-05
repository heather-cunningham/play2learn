const mathFactsSelectDiv = document.getElementById("math-facts-select-div");
const mathFactsSelect = document.getElementById("math-facts-select");
const mathFactsOptions = document.querySelectorAll("#math-facts-select option")

const mathFactsStartDiv = document.getElementById("math-facts-start");
const mathFactsGameDiv = document.getElementById("math-facts-game");
const mathFactsFinalScreenDiv = document.getElementById("math-facts-final-screen");

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

const timesUpStr = "TIME'S UP!!!";
const timeCounter = 30;
let timerIntervalId;

let usersScore = 0;
let finalScore = 0;


// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
mathFactsSelect.dataset.errorMsg = "You must select one:";

const invalidNumberErrorMsg = "NOT A NUMBER!";
const incorrectAnswerErrorMsg = "Incorrect";


// -------------------------------------- Helper Fcns -----------------------------------------------

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

/*
* Returns a random integer between zero to nine
* */
const getRandomInt = ()=>{
  return Math.floor(Math.random() * 10);
};

const setNextExpression = ()=>{
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

const setOperationAndExpression = ()=>{
  operationSelected = updateSelected();
  operationSelected = operationSelected !== null ? operationSelected : "";
  // set the operation header to the one selected
  opSelectedHeader.innerText = operationSelected;
  operationSelected = operationSelected.toLowerCase();
  
  // set the operator for the arithmetic expression per the operation selected
  const operatorSelected = arithmeticOperatorsObj[operationSelected];
  selectedOperatorSpan.innerText = operatorSelected !== null ? operatorSelected : "";
  
  setNextExpression();
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

const resetScoreAndTimer = () =>{
  usersScore = 0;
  
  mathScoreTxtbox.style.backgroundColor = "floralwhite";
  mathScoreTxtbox.value = `${usersScore}`;
  mathScoreTxtbox.setAttribute("value", mathScoreTxtbox.value);
  mathScoreTxtbox.innerText = mathScoreTxtbox.value;
  
  mathTimeTxtbox.classList.remove("shake");
  mathTimeTxtbox.style.backgroundColor = "floralwhite";
  
  mathTimeTxtbox.value = `${timeCounter}`;
  mathTimeTxtbox.setAttribute("value", mathTimeTxtbox.value);
  mathTimeTxtbox.innerText = `${mathTimeTxtbox.value}`;
};

const resetGameBoard = ()=>{
  enableGameBoard();
  setOperationAndExpression();
  clearCalculatorInput();
  resetScoreAndTimer();
};

const startTimer = (timeCounter)=>{
  timerIntervalId = setInterval(
    () => {
      if(timeCounter >= 0) {
        mathTimeTxtbox.value = `${timeCounter}`;
        mathTimeTxtbox.setAttribute("value", mathTimeTxtbox.value);
        mathTimeTxtbox.innerText = mathTimeTxtbox.value;
        timeCounter--;
      } else {
        stopTimer(timerIntervalId);
        endGame();
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
  operationSelected = operationSelected.slice(0, 1).toUpperCase() + operationSelected.slice(1);
  
  finalScore = mathScoreTxtbox.value;
  mathScoreTxtbox.style.backgroundColor = "yellow";
  
  mathTimeTxtbox.style.backgroundColor = "yellow";
  mathTimeTxtbox.value = timesUpStr;
  mathTimeTxtbox.setAttribute("value", mathTimeTxtbox.value);
  mathTimeTxtbox.innerText = mathTimeTxtbox.value;
  mathTimeTxtbox.classList.add("shake");
  
  clearCalculatorInput();
  disableGameBoard();
  
  // Wait a second and then display the final screen/view
  setTimeout(
    ()=>{
      displayFinalScreen();
    },
    1000
  );
};

const resetStartScreen = ()=>{
  mathFactsSelect.selectedIndex = 0;
  updateSelected();
};

const flashAnErrorInTextInput = (textInputEl, errorMessage)=>{
  textInputEl.dataset.errorMsg = errorMessage;
  
  textInputEl.value = `${textInputEl.dataset.errorMsg}`;
  textInputEl.style.backgroundColor = "yellow";
  textInputEl.style.fontWeight = "bold";
  textInputEl.style.color = "red";
  
  setTimeout(()=> clearCalculatorInput(), 750 );
  
  focusMathFactsInput(textInputEl);
};

const checkFirstDigit = (textInputEl)=>{
  const entry = textInputEl.value;
  const firstDigit = entry.charAt(0);
  
  switch (firstDigit) {
    case " ":
      return false;
    case "0":
      return !(entry.length > 1 && entry.charAt(1) !== ".");
    case "-":
      return !(entry.length >= 3 && entry.charAt(1) === "0" && entry.charAt(2) !== ".");
    case ".":
      textInputEl.value = "0" + textInputEl.value;
      textInputEl.setAttribute("value", textInputEl.value);
      textInputEl.innerText = textInputEl.value;
      return true;
    default:
      return true;
  }
};

const verifyEntryIsRealNumber = (usersAnswer, event)=>{
  if(usersAnswer === "-0" || usersAnswer === "-0."){
    event.preventDefault();
    flashAnErrorInTextInput(mathFactsAnswerInput, invalidNumberErrorMsg);
    return false;
  }
  
  try {
    parseFloat(usersAnswer);
    return true;
  } catch (error) {
    event.preventDefault();
    flashAnErrorInTextInput(mathFactsAnswerInput, invalidNumberErrorMsg);
    return false;
  }
};

const getCorrectAnswer = ()=>{
  let firstOperand = document.getElementById("first-operand");
  firstOperand = parseInt(firstOperand.innerText);
  let secondOperand = document.getElementById("second-operand");
  secondOperand = parseInt(secondOperand.innerText);
  
  switch (operationSelected) {
    case "addition":
      return firstOperand + secondOperand;
    case "subtraction":
      return firstOperand - secondOperand;
    case "multiplication":
      return firstOperand * secondOperand;
    case "division":
      // Cut off any floats at two digits past the decimal point and round to nearest digit
      return Math.round((firstOperand / secondOperand).toFixed(2) * 100)/100;
    default:
      return null;
  }
};

const checkIfUsersAnswerCorrect = (usersAnswer, correctAnswer)=>{
  if (usersAnswer === correctAnswer) {
    // 1) increment score
    usersScore += 1;
    mathScoreTxtbox.value = usersScore;
    mathScoreTxtbox.setAttribute("value", mathScoreTxtbox.value);
    mathScoreTxtbox.innerText = mathScoreTxtbox.value;
    //  2) clear the answer input
    clearCalculatorInput();
    //  3) ensure focus is on answer input again
    focusMathFactsInput(mathFactsAnswerInput);
  } else {
    flashAnErrorInTextInput(mathFactsAnswerInput, incorrectAnswerErrorMsg);
  }
};


// -------------------------------------- addEventListener()'s ---------------------------------------
const focusMathFactsInput = (inputEl)=>{
  inputEl.focus();
};
window.addEventListener("load", ()=>{
  focusMathFactsInput(mathFactsSelect);
});

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

const showStartScreen = (event) => {
  event.preventDefault();
  
  if (mathFactsStartDiv.style.display === "none") {
    mathFactsStartDiv.style.display = "block";
    mathFactsFinalScreenDiv.style.display = "none";
    mathFactsGameDiv.style.display = "none";
    
    focusMathFactsInput(mathFactsSelect);
    resetStartScreen();
  }
};

const displayFinalScreen = () => {
  mathFactsStartDiv.style.display = "none";
  mathFactsGameDiv.style.display = "none";
  
  const endGameObj = {
    operation: operationSelected,
    timesupnote: timesUpStr, // ie, "TIMES UP!!!"
    score: finalScore
  };
  const jsonStr = encodeURIComponent(JSON.stringify(endGameObj));
  const xmlHttpReq = new XMLHttpRequest();
  
  mathFactsFinalScreenDiv.style.display = "block";
  mathFactsFinalScreenDiv.innerHTML = `<p>Finalizing score...</p>`;
  
  xmlHttpReq.open("GET", `/math-facts-final-screen?jsonStr=${jsonStr}`, true);
  
  xmlHttpReq.onreadystatechange = () => {
    if (xmlHttpReq.readyState === XMLHttpRequest.DONE) {
      if (xmlHttpReq.status === 200) {
        // noinspection UnnecessaryLocalVariableJS
        const endOfGameResponse = xmlHttpReq.responseText;
        mathFactsFinalScreenDiv.innerHTML = endOfGameResponse;
      } else {
        mathFactsFinalScreenDiv.innerHTML = `
          <h3 id="math-facts-operation" class="game-header">
            ${operationSelected}
          </h3>
          <p id="math-facts-times-up-note" class="times-up-note">
            ${timesUpStr}
          </p>
          <h3 id="math-facts-final-score-header" class="final-score-header">
            Your final score is: ${finalScore}
          </h3>
          <p class="apology">
            Apologies, an error occurred recording your final score, and it was not saved for posterity.
          </p>
          <button id="play-math-facts-again-btn"
                  class="play-again-btn"
                  alt="Play the Math Facts game again"
                  name="again"
                  type="button"
                  value="Play Again">
            Play Again
          </button>`;
      } // end if (xmlHttpReq.status === 200)
      
      // Handle click PLay Again btn:
      const mathFactsPlayAgainBtn = document.getElementById("play-math-facts-again-btn");
      if(mathFactsPlayAgainBtn) {
        mathFactsPlayAgainBtn.addEventListener("click", showStartScreen);
      }
    }
  };
  
  xmlHttpReq.send(null);
};

const showGameBoard = (event) =>{
  event.preventDefault();
  
  if(checkMathFactsSelect(event)) {
    if (mathFactsGameDiv.style.display === "none") {
      mathFactsStartDiv.style.display = "none";
      mathFactsGameDiv.style.display = "block";
      
      resetGameBoard();
      focusMathFactsInput(mathFactsAnswerInput);
      startTimer(timeCounter);
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

const quitGameBoard = (event) =>{
  event.preventDefault();
  
  if(mathFactsStartDiv.style.display === "none") {
    mathFactsGameDiv.style.display = "none";
    mathFactsStartDiv.style.display = "block";
    
    stopTimer(timerIntervalId);
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
    flashAnErrorInTextInput(mathFactsAnswerInput, invalidNumberErrorMsg);
    return false;
  } else if(!checkFirstDigit(mathFactsAnswerInput)) {
    event.preventDefault();
    flashAnErrorInTextInput(mathFactsAnswerInput, invalidNumberErrorMsg);
    return false;
  } else {
    mathFactsAnswerInput.setAttribute("value", mathFactsAnswerInput.value);
    return true;
  }
};
mathFactsAnswerInput.addEventListener("input", validateMathFactsAnswerInput);

const checkAnswer = (event)=>{
  if(validateMathFactsAnswerInput(event)){
    let usersAnswer = mathFactsAnswerInput.value;
    
    if(verifyEntryIsRealNumber(usersAnswer, event)) {
      const correctAnswer = getCorrectAnswer();
      usersAnswer = parseFloat(usersAnswer);
      
      checkIfUsersAnswerCorrect(usersAnswer, correctAnswer);
      setNextExpression();
    }
  }
};
calcEnterBtn.addEventListener("click", checkAnswer);
mathFactsAnswerInput.addEventListener("keydown", (event)=>{
  if(event.key === "Enter") {
    checkAnswer(event);
  }
});

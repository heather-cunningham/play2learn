const mathFactsSelect = document.getElementById("math-facts-select");
const mathFactsSelectDiv = document.getElementById("math-facts-select-div");

const mathFactsStartDiv = document.getElementById("math-facts-start");
const mathFactsGameDiv = document.getElementById("math-facts-game");

const mathFactsGoBtn = document.getElementById("math-facts-go-btn");
const mathFactsQuitBtn = document.getElementById("math-facts-quit-btn");

const opSelectedHeader = document.getElementById("math-operation-selected-header");
const mathFactsAnswerInput = document.getElementById("math-facts-answer-input");
let opSelected = "";

const calcClearBtn = document.getElementById("calculator-clear-btn");
const calcEnterBtn = document.getElementById("calculator-enter-btn");

const mathScoreTxtbox = document.getElementById("math-score-input");
const mathTimeTxtbox = document.getElementById("math-time-input");

// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
mathFactsSelect.dataset.errorMsg = "You must select one:";


// -------------------------------------- addEventListener()'s ---------------------------------------
const focusMathFactsInput = (inputEl)=>{
  inputEl.focus();
};
window.addEventListener("load", ()=>{
  focusMathFactsInput(mathFactsSelect);
});

const addRemoveErrorToSelect = ()=>{
  //addError div
  if (mathFactsSelect.selectedIndex === 0
    && mathFactsSelectDiv.previousElementSibling.className !== 'error') {
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
    mathFactsSelect.options[0].setAttribute('selected', '');
  }
  return null;
};

const checkMathFactsSelect = (event) => {
  event.preventDefault();
  
  // If the option selected is still the default of 0
  if (mathFactsSelect.selectedIndex === 0 ) {
    mathFactsSelect.setCustomValidity('Invalid');
    addRemoveErrorToSelect();
    return false;
  } else {
    mathFactsSelect.setCustomValidity('');
    addRemoveErrorToSelect();
    return true;
  }
};
mathFactsSelect.addEventListener("change", checkMathFactsSelect);

const resetGameBoard = ()=>{
  clearCalculatorInput();
  
  mathTimeTxtbox.value = "";
  mathTimeTxtbox.innerText = "";
  
  mathScoreTxtbox.value = "";
  mathScoreTxtbox.innerText = "";
};

const showGameBoard = (event) =>{
  event.preventDefault();
  
  if(checkMathFactsSelect(event)) {
    if (mathFactsGameDiv.style.display === "none") {
      mathFactsStartDiv.style.display = "none";
      mathFactsGameDiv.style.display = "block";
      
      opSelected = updateSelected();
      if(opSelected){
        // set the operation header to the one selected
        opSelectedHeader.innerText = opSelected;
      }
      
      focusMathFactsInput(mathFactsAnswerInput);
      resetGameBoard();
      resetStartScreen();
    }
  }
};
mathFactsGoBtn.addEventListener("click", showGameBoard);

const resetStartScreen = ()=>{
  mathFactsSelect.selectedIndex = 0;
  updateSelected();
};

const quitGameBoard = (event) =>{
  event.preventDefault();
  
  if(mathFactsStartDiv.style.display === "none") {
    mathFactsGameDiv.style.display = "none";
    mathFactsStartDiv.style.display = "block";
    focusMathFactsInput(mathFactsSelect);
    resetStartScreen();
    // reset game
    resetGameBoard();
    opSelected = "";
    opSelectedHeader.innerText = opSelected;
  }
};
mathFactsQuitBtn.addEventListener("click", quitGameBoard);

const clearCalculatorInput = ()=>{
  mathFactsAnswerInput.innerText = "";
  mathFactsAnswerInput.value = "";
};
calcClearBtn.addEventListener("click", clearCalculatorInput);


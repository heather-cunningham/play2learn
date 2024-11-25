const mathFactsSelect = document.getElementById("math-facts-select");

const mathFactsStartDiv = document.getElementById("math-facts-start");
const mathFactsGameDiv = document.getElementById("math-facts-game");

const mathFactsGoBtn = document.getElementById("math-facts-go-btn");
const mathFactsExitBtn = document.getElementById("math-facts-exit-btn");

const mathAnswerInput = document.getElementById("math-answer-input");

// -------------------------------------- datasets & Custom Error Msgs ----------------------------------
mathFactsSelect.dataset.errorMsg = "You must select one";


// -------------------------------------- addEventListener()'s ---------------------------------------
const focusMathInput = (inputEl)=>{
  inputEl.focus();
};
window.addEventListener("load", ()=>{
  focusMathInput(mathFactsSelect);
});

/*
const checkSelect = (field) => {
  if ( field.selectedIndex === 0 ) {
    field.setCustomValidity('Invalid');
    addError(field);
  } else {
    field.setCustomValidity('');
    removeError(field);
    field.options[0].removeAttribute('selected');
    field.options[field.selectedIndex].setAttribute('selected', '');
  }
};
*/

const handleSelection = ()=>{};

const checkSelect = () => {};

const showGameBoard = (event/*, gameStartDiv, gameDiv*/) =>{
  event.preventDefault();
  
  // verify an operation has been selected
  
  if(mathFactsGameDiv.style.display === "none") {
    mathFactsStartDiv.style.display = "none";
    mathFactsGameDiv.style.display = "block";
    // set the operation header to the one selected
    focusMathInput(mathAnswerInput);
    // reset the game
  }
};
mathFactsGoBtn.addEventListener("click", showGameBoard);

const exitGameBoard = (event) =>{
  event.preventDefault();
  
  if(mathFactsStartDiv.style.display === "none") {
    mathFactsGameDiv.style.display = "none";
    mathFactsStartDiv.style.display = "block";
    focusMathInput(mathFactsSelect);
    // clear the operation header in the game
    // reset game
  }
};
mathFactsExitBtn.addEventListener("click", exitGameBoard);


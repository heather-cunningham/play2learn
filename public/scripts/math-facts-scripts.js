const mathFactsSelect = document.getElementById("math-facts-select");

const focusSelectOnLoad = ()=>{
  mathFactsSelect.focus();
}

window.addEventListener("load", focusSelectOnLoad);
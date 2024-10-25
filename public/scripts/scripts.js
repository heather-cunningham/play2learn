const gamesNav = document.getElementById("nav-games");
const gamesSubNav = document.querySelectorAll("#games-sub-nav li");

const showGamesSubNav = () => {
  for(let node of gamesSubNav){
    node.style.display = "block";
  }  
};
gamesNav.addEventListener("mouseenter", showGamesSubNav);

const hideGamesSubNav = () => {
  for(let node of gamesSubNav){
    node.style.display = "none";
  }  
};
gamesNav.addEventListener("mouseleave", hideGamesSubNav);
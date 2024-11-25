// Global Scripts, Homepage Scripts 
const topNav = document.getElementById("top-nav");
const gamesNav = document.getElementById("top-nav-games"); // Top nav Menu List item
const gamesSubNav = document.getElementById("top-sub-nav-games"); // Top nav's sub nav
const blockQuote = document.getElementsByClassName("testimonial-quote")[0];


const showGamesSubNav = () => {
  gamesSubNav.style.display = "block";
};
gamesNav.addEventListener("mouseenter", showGamesSubNav);

const hideGamesSubNav = () => {
  gamesSubNav.style.display = "none";  
};
gamesNav.addEventListener("mouseleave", hideGamesSubNav);

const toggleGamesSubNav = () => {
  gamesSubNav.style.display = gamesSubNav.style.display === "none" 
                                  ? "block" 
                                  : "none";
}
gamesNav.addEventListener("click", toggleGamesSubNav);

// Note to Jared or the grading instructor:  I could not get the XMLHttpRequest type 
// syntax to work with loading the quotes.  The readystate never changed to DONE or 4,
// and I could not figure out what I was doing wrong.  I tried following the "presidents" Demo,
// but I could not replicate that syntax and get it to work.
// So, I did it w/ async fetch instead.
// The Node and AJAX lessons still don't make sense to me fully.  I still don't really understand 
// those lessons.  Backend and server side code is a weak point for me.   
const fetchQuotes = async () => {
  try{
    const response = await fetch("/testimonials");
    
    if(response && response.status !== 404){
      const testimonialsJSON = await response.json();
      let randomTestimonial;
      
      if(testimonialsJSON && testimonialsJSON.length > 0) {
        randomTestimonial = getRandomTestimonial(testimonialsJSON);
      }
      
      if (blockQuote) {
        blockQuote.id = "quote" + randomTestimonial.id + "_"
          + (randomTestimonial.citation).replaceAll(" ", "")
            .replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "")
            .trim();
        blockQuote.innerHTML = `"${randomTestimonial.quote.trim()}" \
        <cite class="testimonial-citation" name="testimonial-citation">--${randomTestimonial.citation}</cite>`;
      }
    } else {
      if (blockQuote)
        blockQuote.innerHTML = `Loading testimonials...`;
    }
  } catch (error) {
    if (blockQuote) {
      console.log('Error fetching testimonials:', error)
      blockQuote.innerHTML = `Loading testimonials...`;
    }
  }
};

const getRandomTestimonial = (testimonialsJSON) => {
  return testimonialsJSON[Math.floor(Math.random() * testimonialsJSON.length)];
};

const cycleQuotes = () => {
  fetchQuotes();
  setInterval(fetchQuotes, 10000);
};

// ----------------------------- Responsive / Mobile Scripts -----------------------------------------------
const mobileMenuIconDiv = document.getElementById("mobile-menu-icon-div");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");
const mobileSideNav = document.getElementById("mobile-side-nav");
const mobileNavGames = document.getElementById("mobile-nav-games"); // Menu List item
const mobileGamesMenuLink = document.getElementById("mobile-games-menu-link"); // Menu List item link
const mobileGamesSubNav = document.getElementById("mobile-sub-nav-games"); // sub menu list
const mobileMenuLinks = document.querySelectorAll("#mobile-side-nav a")


/**
 * Hover mobile menu links for 13", small, laptop screens  
 */
const mouseEnterMobileMenuLink = (event)=>{
  const link = event.target;

  if(!link.classList.contains("hover"))
    link.classList.add("hover")
};
for(let link of mobileMenuLinks){
  link.addEventListener("mouseenter", mouseEnterMobileMenuLink);
}

/**
 * Unhover mobile menu links for 13", small, laptop screens  
 */
const mouseLeaveMobileMenuLink = (event)=>{
  const link = event.target;

  if(link.classList.contains("hover"))
    link.classList.remove("hover")
};
for(let link of mobileMenuLinks){
  link.addEventListener("mouseleave", mouseLeaveMobileMenuLink);
}

const toggleMobileMenu = ()=>{
  // Ensure the Games sub menu is closed
  mobileGamesSubNav.style.display = "none";
  if(mobileGamesMenuLink.classList.contains("active")){
    mobileGamesMenuLink.classList.remove("active");
    mobileGamesMenuLink.classList.remove("hover");
  }
  
  // Open the mobile menu
  if(mobileMenuIcon.classList.contains("fa-bars")){
    mobileMenuIcon.classList.remove("fa-bars");
    mobileMenuIcon.classList.add("fa-times");
    mobileSideNav.style.display = "block";
  }else { // Close the mobile menu
    mobileMenuIcon.classList.remove("fa-times");
    mobileMenuIcon.classList.add("fa-bars");
    mobileSideNav.style.display = "none";
  }
};
mobileMenuIcon.addEventListener("click", toggleMobileMenu);

const toggleMobileGamesSubNav = ()=>{
  if(mobileGamesMenuLink.classList.contains("active")){
    mobileGamesMenuLink.classList.remove("active");
    mobileGamesMenuLink.classList.remove("hover");
  } else {
    mobileGamesMenuLink.classList.add("active");
  }
  mobileGamesSubNav.style.display = mobileGamesSubNav.style.display === "block" 
                                    ? "none" 
                                    : "block";
};
/**
 * This event listened to needs to be `click`, since there's no mouseenter or mouseleave events
 * on mobile devices with touchscreens. 
 */
mobileNavGames.addEventListener("click", toggleMobileGamesSubNav);

const onWindowResize = ()=>{
  if (window.innerWidth > 1370) {
    topNav.style.display = "block";
    mobileMenuIconDiv.style.display = "none";
    mobileSideNav.style.display = "none";
  } else {
    topNav.style.display = "none";
    mobileMenuIconDiv.style.display = "block";
    mobileMenuIcon.style.display = "block";

    if(mobileMenuIcon.classList.contains("fa-times") 
      && mobileSideNav.style.display === "none") {
        mobileMenuIcon.classList.remove("fa-times");
        mobileMenuIcon.classList.add("fa-bars");
    }
  }
};
window.addEventListener("resize", onWindowResize);

window.addEventListener("load", ()=>{
  cycleQuotes();
  onWindowResize();
});
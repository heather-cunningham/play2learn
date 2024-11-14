// Global Scripts, Homepage Scripts 
const topNav = document.getElementById("top-nav");
const gamesNav = document.getElementById("top-nav-games");
const gamesSubNav = document.querySelectorAll("#top-sub-nav-games li");
const blockQuote = document.getElementsByClassName("testimonial-quote")[0];

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

const onWindowLoad = ()=>{
  if (window.innerWidth > 1024) {
    mobileMenuIconDiv.style.display = "none";
  } else {
    mobileMenuIconDiv.style.display = "block";
  }
};

window.addEventListener("load", ()=>{
  cycleQuotes();
  onWindowLoad();
});

const onWindowResize = ()=>{
  if (window.innerWidth > 1024) {
    mobileMenuIconDiv.style.display = "none";
  } else {
    mobileMenuIconDiv.style.display = "block";
  }
};
window.addEventListener("resize", onWindowResize);

const showMobileMenu = () => {
  if(topNav && topNav.style.display === "block"){
    topNav.style.display = "none";
  } else {
    topNav.style.display = "block";
  }
};

mobileMenuIcon.addEventListener("click", showMobileMenu);

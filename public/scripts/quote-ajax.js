const blockQuote = document.getElementsByClassName("testimonial-quote")[0];

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
    
    blockQuote.innerHTML = `${randomTestimonial.quote} 
    <cite id="" class="testimonial-citation" name="testimonial-citation">--${randomTestimonial.citation}</cite>`;
  } catch (error) {
    console.log('Error fetching testimonials:', error)
    blockQuote.innerHTML = `Loading testimonials...`;
  }
};

const getRandomTestimonial = (testimonialsJSON) => {
  const randomTestimonialObj = testimonialsJSON[Math.floor(Math.random() * testimonialsJSON.length)];
  return randomTestimonialObj;
};

window.addEventListener("load", fetchQuotes);
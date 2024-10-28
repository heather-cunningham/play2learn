const blockQuote = document.getElementsByClassName("testimonial-quote")[0];

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
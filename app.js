const express = require("express");
const { check, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8081;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ------------------------------------------ Homepage ------------------------------------------------
const testimonialRawData = fs.readFileSync(path.join(__dirname, "./public/data/testimonials.json"));
const testimonialsJSON = JSON.parse(testimonialRawData);

// Set the homepage to url leg to "/" with Node and send it the homepage, aka `index.html`
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/testimonials", (request, response) => {
  // NOTE to Grading Instructor and/or Jared Dunn:  I could not get this GET request to work the way we did
  // in class, so I used async fetch() instead.
  if(testimonialsJSON && testimonialsJSON.length > 0) {
    // If the testimonials JSON is not null and not empty, send the response to:
    // scripts.js > fetchQuotes()
    response.json(testimonialsJSON);
  } else {
    response.json(null);
  }
});


// ------------------------------------------ Contact-Us page ------------------------------------------------
// NOTE to Grading Instructor and/or Jared Dunn: Following along with the class' instruction,
// I could not get any other validation checks to work here, other than this email check,
// and I could not figure out what I was doing wrong.  The project directions didn't mention anything
// about requiring these types of check, so I just left it with this simple email validation check.
// This kind of server-side code or backend code is what I truly need to work on,
// and a weak spot in my skills.  (I'm a Front End dev trying to become Full Stack.)
app.post("/contact-response-msg",
  [ check("email", "Invalid email address.").isEmail() ],
  (request, response) => {
    const contactErrors = validationResult(request);

    let responseMsg = "";

    if (!contactErrors.isEmpty()) {
      let contactErrorsHtmlList = "";

      for(let error of contactErrors.array()){
        contactErrorsHtmlList += `<li>${error.msg}</li>`
      }
    
      responseMsg = `<ul id="contact-response-message">
                      Message not sent due to:
                        ${contactErrorsHtmlList}
                    </ul>`
    }
    
    response.status(200).send(responseMsg);
});


// ------------------------------------- Math Facts game page Final Screen for end of game  ----------------------
app.get("/math-facts-final-screen",
  (request, response)=> {
    const jsonStr = request.query.jsonStr;
    if(jsonStr){
      try{
        const endGameObj = JSON.parse(jsonStr);
        
        const operation = endGameObj.operation;
        const timesUpNote = endGameObj.timesupnote;
        const playersFinalScore = endGameObj.score;
        
        // response HTML:
        const responseMsg = `
          <h3 id="math-facts-operation" class="game-header">
            ${operation}
          </h3>
          <p id="math-facts-times-up-note" class="times-up-note">
            ${timesUpNote}
          </p>
          <h3 id="math-facts-final-score-header" class="final-score-header">
            Your final score is:
          </h3>
          <h3 id="math-facts-final-score" class="final-score">
            ${playersFinalScore}
          </h3>
          <button id="play-math-facts-again-btn"
                  class="play-again-btn"
                  alt="Play the Math Facts game again"
                  name="again"
                  type="button"
                  value="Play Again">
            Play Again
          </button>`;
        
        response.status(200).send(responseMsg);
      }catch (error) {
        response.status(400).send('Invalid JSON');
      }
    } else {
      response.status(400).send('Missing jsonStr query parameter');
    }
});

// ------------------------------------------ App listening port ------------------------------------------------
app.listen(port, ()=>{
  console.log("Express / Node.js app running on port: " + port);
}); // 8081

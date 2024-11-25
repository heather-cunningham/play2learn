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
  if(testimonialsJSON && testimonialsJSON.length > 0) {
    // If the testimonials JSON is not null and not empty, send the response to:
    // scripts.js > fetchQuotes()
    response.json(testimonialsJSON);
  } else {
    response.json(null);
  }
});


// ------------------------------------------ Contact-Us page ------------------------------------------------
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
    
    response.status(200);
    response.send(responseMsg);
});

app.listen(port, ()=>{
  console.log("Express / Node.js app running on port: " + port);
}); // 8081

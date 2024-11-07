const express = require("express");
const { check, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8081;

const testimonialRawData = fs.readFileSync(path.join(__dirname, "./public/data/testimonials.json"));
const testimonialsJSON = JSON.parse(testimonialRawData);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the homepage to url leg to "/" with Node and send it the homepage, aka `index.html`
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/testimonials", (request, response) => {
  if(testimonialsJSON && testimonialsJSON.length > 0) {
    response.json(testimonialsJSON);
  } else {
    response.json(null);
  }
});

// Contact-Us messages Node response.  Much no worky.
app.post("/contact-response-msg", 
  [
    check("email", "Invalid email address.").isEmail() //,
    // Could not get these to work at all and can't figure out what's wrong.
    // These two checks fail regardless if the strings are over the  min length or not.
    // I even tried w/ only testing the min length and not the max, and these two checks still fail even if
    // the strings are over the min length.
    /* check("subject", "Subject line must be between 5-125 characters.").isLength({min: 5, max: 125}),
    check("message", "Message must be between 10-250 characters.").isLength({min: 10, max: 250}) */
  ],
  (request, response) => {
    const contactErrors = validationResult(request);
    // console.log(contactErrors.array());

    let responseMsg = "";
    //let responseStatus = 0;
    if (contactErrors.isEmpty()) { 
      // responseStatus = 200;
      responseMsg = `<p id="contact-response-message">Thank you, message sent.</p>`
    } else {
      let contactErrorsHtmlList = "";

      for(let error of contactErrors.array()){
        contactErrorsHtmlList += `<li>${error.msg}</li>`
      }
      // responseStatus = 500;
      responseMsg = `<ul id="contact-response-message">
                    Message not sent due to:
                        ${contactErrorsHtmlList}
                    </ul>`
    }
    
    response.status(200);
    // response.status(responseStatus);
    response.send(responseMsg);
});

app.listen(port); // 8081

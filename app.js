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

app.listen(port);

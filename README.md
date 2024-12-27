# Play2Learn Class Project 1  
# A Node.js Web App
## North Shore Community College 
## Full Stack Software Developer Program

### Instructions to Run the Project Locally
1. This app listens to port: 8081.
2. In a command line, from the root of the project, run command: `node app.js`.

### Class Project Instructions
Using only HTML, CSS, JavaScript, and Node.js, build the Play2Learn website. 
It should include two games:

1. Anagram Hunt - a placeholder for an anagram game to be built in a future project.
2. Math Facts - a game for practicing arithmetic skills.

You are only required to create the Math Facts game as part of this project, 
but you should include listings for both games on the home page.

The rest of the website should include:

### Home Page (index.html)
#### Upper Navigation
The links in the upper right of the home page should work as follows:

1. Home should point to index.html.
2. Games > Anagram Hunt should point to games/anagram-hunt.html.
3. Games > Math Facts Practice should point to games/math-facts.html.
4. About should point to about.html.
5. Login should point to login.html.
6. The Games link should not point to anything. Instead, it should drop down 
the sub-navigation for the two games.

#### Quotes
The quote on the home page should change every 10 seconds. 
You should have at least three quotes that it rotates through. 
Each quote should be made by a different person.

#### Lower Navigation
1. Mail icon should point to contact-us.html.
2. Instagram icon should point to https://instagram.com.
3. Twitter icon should point to https://twitter.com.
4. Facebook icon should point to https://facebook.com.

### About (about.html)
Feel free to design this however you like. You may add images, make up people associated with the "company," 
or anything else.

### Contact Us (contact-us.html)
The contact form should have an action of javascript:alert('Form Submitted'), 
which will simply alert that the form was submitted.

### Login (login.html)
This is a simple form. When the user clicks on the Need an account? Register link, the page should not refresh or go to 
another page. Instead, you should use JavaScript to hide the login form and show the register form.  Both forms should 
have an action of javascript:alert('Form Submitted'), which will simply alert that the form was submitted.

### Games
#### Math Facts
Note that no button clicked in this game should cause the page to reload. You should handle all button clicks with 
JavaScript.

1. When the user clicks the Go button, the game starts. 
2. The problem appears with a text field below it. This text field should already have focus.
3. The user can enter values using the keyboard or the buttons on the screen. 
4. When an answer is correct: The score should be incremented by 1.  The next problem should appear.
The answer field should be emptied and focus should be put back on the answer field, so the user can start typing the 
next answer.
5. The time-left countdown should start at 30 and decrease by 1 every second.
6. The game ends when the timer runs out.
7. You should display the user's score in a new view and provide a Play Again button, which takes the user back to the
starting page for Math Facts.


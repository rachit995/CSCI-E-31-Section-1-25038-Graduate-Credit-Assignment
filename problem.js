/**
 * Objective: We will learn how to use auth middleware to protect routes.
 *
 * This file contains the express server code.
 *
 * Note: This file is not complete. You need to implement the logic for
 * auth middleware by generating and verifying JWT tokens.
 *
 * Tasks to do:
 * 1. Use `express-session` to store the JWT token in the session. Initialize `express-session` as express middleware.
 * 2. Use the `authController` to generate and verify JWT tokens. Logic and comments have been provided for you.
 * 3. Complete `/login` route to generate a JWT token and store it in the session.
 * 4. Complete the `requireAuth` middleware to verify the JWT token in the session.
 * 5. Destroy the session when the user logs out.
 * 6. Use the `requireAuth` middleware to protect the `/protected` route.
 * 7. Use the `requireAuth` middleware to protect the `/logout` route.
 * 8. Views and credentials have been provided for you. You do not need to change them.
 * 9. You do not need to change the code in the `controllers` directory.
 */


// Import the express module
const express = require('express');

// Create an instance of the express server
const app = express();

// Set the port number
const port = 3000;

// Middleware to parse the request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Middleware to serve static files from the public directory
app.set('views', './views');

// Middleware to serve static files from the public directory
app.set('view engine', 'pug');


// Data used for user authentication
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Authentication Middleware
const requireAuth = (req, res, next) => {
  // Check if the session has a token
  // If not, return 401 Unauthorized
  // If yes, verify the token
  // If the token is valid, set the username in the request object and call next()
  // If the token is invalid, return 401 Unauthorized
  next();
};


// Login GET Request Handler
app.get('/login', (req, res) => {
  // send pug file
  res.render('login');
});

// Login POST Request Handler
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username == username && user.password == password;
  });
  if (user) {
    // Generate a JWT token and store it in the session
    res.redirect('/protected');
  }
});

// Protected Route
app.get('/protected', (req, res) => {
  res.render('protected', { username: req.username });
});

// Logout Route
app.get('/logout', (req, res) => {
  // Destroy the session
  res.redirect('/login');
});

// Default Route
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Listen on the port number and log a message to the console
app.listen(port, () => console.log(`Auth app listening on port ${port}!`));

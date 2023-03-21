/**
 * Objective: We will learn how to use auth middleware to protect routes.
 */

// Import the express module
const express = require('express');

// Import the express-session module
const session = require('express-session');

// Import the authController module
const authController = require('./controllers/authController');

// Create an instance of the express server
const app = express();

// Set the port number
const port = 3000;

// Middleware to parse the request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Middleware to use express-session
app.use(session({
  secret: 'cscie31',
  resave: true,
  saveUninitialized: true
}));

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
  const token = req.session.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  authController.verifyUserToken(token)
    .then((decodedToken) => {
      req.username = decodedToken.username;
      next();
    })
    .catch((err) => {
      res.status(401).send('Unauthorized');
    });
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
    const token = authController.generateUserToken(user);
    req.session.token = token;
    res.redirect('/protected');
  } else {
    res.sendStatus(401);
  }
});

// Protected Route
app.get('/protected', requireAuth, (req, res) => {
  res.render('protected', { username: req.username });
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Default Route
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Listen on the port number and log a message to the console
app.listen(port, () => console.log(`Auth app listening on port ${port}!`));

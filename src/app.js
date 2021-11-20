require('dotenv').config();
require('./strategies/discordstrat');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const db = require('./database/database');
const path = require('path');

db.then(() =>
  console.log(
    `
  ===================================================
  =====                                         =====
  =====          Connected to MongoDB           =====
  =====                                         =====
  ===================================================`
  )
).catch(err => console.log(err));

// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

app.use(
  session({
    secret:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    saveUninitialized: false,
    name: 'squeezy.auth',
    resave: false
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () =>
  console.log(
    `
  ===================================================
  =====                                         =====
  =====      Listening on port [ ${PORT} ]         =====
  =====       [http://localhost:${PORT}/]          =====
  =====                                         =====
  ===================================================`
  )
);

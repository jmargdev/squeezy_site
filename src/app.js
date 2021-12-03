require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3001;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Passport configuration
require('./strategies/discordstrat')(passport);

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() =>
    console.log(`
  ===================================================
  =====                                         =====
  =====          Connected to MongoDB           =====
  =====                                         =====
  ===================================================`)
  )
  .catch(err => console.log(err));

// Bodyparser
app.use(
  express.urlencoded({
    extended: true
  })
);

// Express session
app.use(
  session({
    secret:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    name: 'squeezy.auth',
    saveUninitialized: true,
    resave: true
  })
);

// EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, async () =>
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

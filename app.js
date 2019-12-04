//jshint esversion:8
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
app.use(express.static("public"));
// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get("/", (req, res)=>{
    res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/blog-single", (req, res) => {
  res.render("blog-single");
});
app.get("/blog-home", (req, res) => {
  res.render("blog-home");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/menu", (req, res) => {
  res.render("menu");
});
app.get("/team", (req, res) => {
  res.render("team");
});
app.get("/elements", (req, res) => {
  res.render("elements");
});



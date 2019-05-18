require("dotenv").config()

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// const passport = require('passport');
// const flash = require('connect-flash');
// const session = require('express-session');
const app = express();

// DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true 
})

const connection = mongoose.connection
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully')
})

// If the connection throws an error
connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err)
})

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Built-in Bodyparser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`!! Passport server started on port ${PORT} !!`));

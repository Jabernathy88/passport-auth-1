require("dotenv").config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()

// Passport Config
require('./config/passport')(passport)

// DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
})

const connection = mongoose.connection
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully')
})

// Handle DB connection error
connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err)
})

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Built-in Bodyparser
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// Routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`!! Passport server started on port ${PORT} !!`))

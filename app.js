const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

//express session
const session = require('express-session');
const flash = require('connect-flash');
app.use(flash());
app.use(session({
    secret: process.env.Secret_Key,
    resave: false,
    saveUninitialized: true
}))

// Set flash to res.locals
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//seting the json middleware 
app.use(express.urlencoded({ extended: true })); //if we are using http then true else false
app.use(express.json());
app.use(cookies());

//adding the public file static telling to express
app.use(express.static('public'));

//importing routes
const userRouter = require('./routes/user.route.js');
app.use('/user', userRouter );

//connecting to database
let uri = process.env.Connection_String;
mongoose.connect(uri)
    .then(() => {
        console.log("✅ MongoDB connected successfully!");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
    });

//seting path for ejs
const path = require('path');

//seting ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT;
//listening the current port
app.listen(PORT, () => {console.log(`Server is working fine on the port: ${PORT}`)});
app.get('/', (req, res) => {
    console.log("Working fine!"); 
    res.render('signup')
})

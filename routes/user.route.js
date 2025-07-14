const {signUp, login, logOut} = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js');

// Show signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', signUp);

//show login form
router.get('/login', (req,res) => {
    res.render('login')
});
router.post('/login', login);

router.get('/dashboard',verifyToken, (req,res) => {
  const user = req.session.user;
  if(!user) return res.render('login');

  res.render('dashboard', {user});
})

router.get('/authuser', verifyToken, (req,res) => {
    res.send("You are Authenticated");
})

router.get('/logout', logOut)

router.get('/logout', (req,res) => {
  res.redirect('/user/login');
})

module.exports = router;
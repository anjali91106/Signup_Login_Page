const {signUp, login, logOut} = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js');
const userValidation = require('../middlewares/userValidation.js');

// Show signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', userValidation, signUp);

//show login form
router.get('/login' , (req,res) => {
    res.render('login')
});
router.post('/login', login);

router.get('/dashboard',verifyToken, (req,res) => {
  const user = req.session.user;
  if(!user) return res.render('login');

  res.render('dashboard', {user});
})

router.get('/logout', logOut)

router.get('/logout', (req,res) => {
  res.redirect('/user/login');
})

module.exports = router;
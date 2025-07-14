const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signUp
const signUp = async (req, res) => {
  try {
    const { Name, Email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await userModel.findOne({ Email });
    if (userExists) {
      req.flash('error', 'User with same Email id already exits!');
    }

    const newUser = new userModel({
      Name: Name,
      Email: Email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save().catch(err => {
    req.flash('error', 'Mongoose save error!');
});

    //generate token
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.Email },
      process.env.Secret_Key,
      { expiresIn: "24h" }
    );

    if (!savedUser) {
      req.flash('error', 'Something went wrong this user can not be added please try again!!');
    }

    // res.status(201).json({
    //   message: "User signed up successful",
    //   user: {
    //     _id: savedUser._id,
    //     Name: savedUser.Name,
    //     email: savedUser.Email,
    //   },
    //   token,
    // });
    req.flash('success', 'Signup successful!');
    res.redirect("/user/login");
    // return res.redirect("/user/dashboard");
  } catch (err) {
    req.flash('error', 'Signup failed!');
    res.redirect('/user/signup');
  }
};

//login

const login = async (req, res) => {
  try {
    const { Email, password } = req.body;
    const user = await userModel.findOne({ Email });

    if (!user) {
      req.flash('error', 'User not found!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash('error', 'Incorrect password!');
    }

    //generate token
    const token = jwt.sign(
      { _id: user._id, email: user.Email },
      process.env.Secret_Key,
      { expiresIn: "24h" }
    );

    //set token in cookies httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    //save user info in session
    req.session.user = {
      name: user.Name,
      email: user.Email
    }
  
    req.flash('success', 'Logged in successfully!');
    return res.redirect("/user/dashboard");
  } catch (err) {
    req.flash('error', 'Something went wrong!');
    res.redirect('/user/login');
  }
};

const logOut = (req, res) => {
  try {
   res.clearCookie("token");
   req.flash('success', 'Logged out successfully!');
   res.redirect('/user/login');
  } catch (err) {
    req.flash('error', 'Something went wrong!');
  }
};


module.exports = { signUp, login, logOut };

# 🛡️ Auth System with Node.js, Express, MongoDB & JWT

This project is a full-stack authentication system built with **Node.js**, **Express**, **MongoDB**, **JWT**, **Bcrypt**, **Cookies**, **EJS**, and **Express Sessions**. It includes a complete flow of **sign-up**, **login**, and access to a **protected dashboard** page.

## 🚀 Features

- 🔐 User Registration with password hashing using **bcrypt**
- 🔑 User Login with JWT token generation
- 🧠 Session and Cookie management
- 🔒 Protected route (Dashboard) that requires authentication
- ✅ Authentication & Authorization logic using JWT
- 🧪 Token verification using **Thunder Client**
- 🌐 EJS as the templating engine for views
- 📁 Clean folder structure with proper controllers and routes

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JWT, Bcrypt, Sessions, Cookies
- **View Engine**: EJS
- **Testing Tool**: Thunder Client

---

## 📂 Folder Structure

├── controllers/
│ └── auth.controller.js
├── models/
│ └── user.model.js
├── routes/
│ └── auth.routes.js
├── middleware/
│ └── auth.middleware.js
├── views/
│ ├── login.ejs
│ ├── signup.ejs
│ └── dashboard.ejs
├── .env
├── server.js
└── package.json

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone (https://github.com/anjali91106/Signup_Login_Page.git)
   cd auth-system

2. **Install Dependencies**

bash
Copy
Edit
npm install

3. **Create .env File**
PORT=3000
Connection_String=your_mongodb_connection_string
Secret_Key=your_jwt_secret

4. **Start the Server**
   npm start


🧪 How to Test with Thunder Client
1. Sign Up
POST to http://localhost:3000/user/signup

Body (JSON):

json
Copy
Edit
{
  "Name": "Your Name",
  "Email": "your@email.com",
  "password": "yourpassword"
}

2. Login

POST to http://localhost:3000/user/login

Body (JSON):

json
Copy
Edit
{
  "Email": "your@email.com",
  "password": "yourpassword"
}

3. Access Protected Route

GET to http://localhost:3000//userdashboard

Send cookie (from login response) or test with middleware.

Verify Token Manually


Author: 
Email- anjalisoni86904@gmail.com

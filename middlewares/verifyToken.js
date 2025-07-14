const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/user/login');

  try {
    const decoded = jwt.verify(token, process.env.Secret_Key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/user/login');
  }
};


module.exports = verifyToken;
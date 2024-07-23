// middleware/auth.js

import jwt from 'jsonwebtoken';


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.secret_key, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Set the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

export default authenticateToken;

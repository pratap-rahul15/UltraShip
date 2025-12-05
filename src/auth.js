// Authentication middleware for Express.js
// Verifies the JWT from Authorization header and attaches user info to req.user if valid.
const jwt = require('jsonwebtoken');

// Middleware function to authenticate requests
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  // Check for Bearer token
  if (auth.startsWith('Bearer ')) {
    const token = auth.slice(7);
    // Verify token and extract payload
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: payload.id, role: payload.role, employeeId: payload.employeeId };
    } catch (err) {
      // if there is an invalid token -> leave the req.user undefined
      req.user = null;
    }
  }
  next();
}

module.exports = { authMiddleware };

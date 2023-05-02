const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('x-auth-token');
  console.log('Test in auth');
    
  // If no token is found, respond with an error message
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
    
  }

  try {
    // Verify the token using the secret key that you used to sign it
    const decoded = jwt.verify(token, 'your_secret_key_here');

    // Add the decoded user data to the request object for use in the route handler
    req.user = decoded.user;
    
    // Call the next middleware function in the chain
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

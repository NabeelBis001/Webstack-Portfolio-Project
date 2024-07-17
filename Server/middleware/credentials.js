const allorigins = require("../configs/origins");

const cred = (req, res, next) => {
  const origin = req.headers.origin;
  if (allorigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin); // Set the allowed origin dynamically
    res.header('Access-Control-Allow-Credentials', true);
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(200).send();
      return;
    }
    next(); // Continue processing for allowed origin
  } else {
    // Handle CORS error for disallowed origin
    res.status(403).json({ error: 'Not allowed by CORS' });
  }
};

module.exports = cred;

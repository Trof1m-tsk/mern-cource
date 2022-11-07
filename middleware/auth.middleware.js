const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    console.log('TOKEN', token);

    if (!token) {
      return res.status(401).json({ message: 'There is no authorization.' });
    }

    const secret = config.get('jwtSecret');
    const decoded = jwt.verify(token, secret, null, null);

    console.log('decoded', decoded);
    req.user = decoded;
    console.log('req.user: ', req.user);

    next();
  } catch (e) {
    return res.status(401).json({ message: 'There is no authorization.' });
  }
};

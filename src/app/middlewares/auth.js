const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { promisify } = require('util');
module.exports = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: 'No token provided.' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2)
      return res.status(401).json({ error: 'Token error.' });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
      return res.status(401).json({ error: 'Token malformatted.' });
    const verify = promisify(jwt.verify);
    const { id: userId } = await verify(token, authConfig.secret);
    if(!userId) return res.status(401).json({ error: 'Token invalid.' });
    req.headers.userId = userId;
    return next();
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
};

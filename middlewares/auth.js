const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Необходима авторизация!' });
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res.status(401).send('Необходима авторизация!');
  }
  req.user = payload;
  next();
};

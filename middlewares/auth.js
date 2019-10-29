const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Необходима авторизация!' });
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, 'my-awesome-sekret-key');
  } catch (err) {
    return res.status(401).send('Необходима авторизация!');
  }
  req.user = payload;
  next();
};
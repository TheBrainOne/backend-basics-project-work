const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.showAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user, error) => {
      if (error) {
        res.status(404);
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (res.status(404)) {
        res.send({ message: 'Пользователь не найден' });
      }
      res.status(500).send({ message: err });
    });
};

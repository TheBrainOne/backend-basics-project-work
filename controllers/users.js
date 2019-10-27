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
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Такого пользователя нет' });
      }
      return res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка на сервере ${err}` }));
};

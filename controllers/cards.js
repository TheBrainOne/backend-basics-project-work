const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.showAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        return Card.findByIdAndRemove(card.id)
          .then(() => res.send({ data: card }))
          .catch((err) => res.status(404).send({ message: err }));
      }
      return res.status(403).send({ message: 'Вы не можете удалить эту карточку' });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

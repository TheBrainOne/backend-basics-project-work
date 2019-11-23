const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.showAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      if (card.length <= 0) {
        throw new NotFoundError('Не найдено ни одной карточки.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      } else if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError('Вы не можете удалить не свою карточку');
      }
      Card.findByIdAndRemove(card.id)
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch(next);
};

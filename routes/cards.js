const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard, showAllCards, deleteCard } = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

router.get('/', showAllCards);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteCard);

module.exports = router;

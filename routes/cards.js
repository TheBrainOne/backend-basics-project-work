const router = require('express').Router();
const { createCard, showAllCards, deleteCard } = require('../controllers/cards');

router.post('/', createCard);

router.get('/', showAllCards);

router.delete('/:id', deleteCard);

module.exports = router;

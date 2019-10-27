const router = require('express').Router();
const { createUser, showAllUsers, findUserById } = require('../controllers/users');

router.post('/', createUser);

router.get('/', showAllUsers);

router.get('/:id', findUserById);

module.exports = router;

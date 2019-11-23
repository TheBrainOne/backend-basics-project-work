const router = require('express').Router();
const { showAllUsers, findUserById } = require('../controllers/users');

router.get('/', showAllUsers);

router.get('/:id', findUserById);

module.exports = router;

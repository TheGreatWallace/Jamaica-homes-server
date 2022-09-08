const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controllers');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', usersController.getUsers)
router.get('/:id',usersController.getUserById);

module.exports = router;
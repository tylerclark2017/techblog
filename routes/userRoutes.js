const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Define routes for users
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.delete('/:id', usersController.deleteUser);
router.put('/:id', usersController.updateUser);
// Add more routes as needed

module.exports = router;
// src/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/users', UserController.getAllUsers);  // New route for getting all users
router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
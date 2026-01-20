const express = require('express');
const user_router = express.Router();
const userController = require('../Controller/user.controller');
const { protect, isAdmin } = require('../Middleware/auth.middleware');

user_router.post('/register', userController.register);
user_router.post('/login', userController.login);

user_router.get('/me', protect, userController.getMe); 

user_router.get('/', protect, isAdmin, userController.getAllUsers);

module.exports = user_router;
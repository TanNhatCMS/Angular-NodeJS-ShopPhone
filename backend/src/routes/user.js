const express = require('express');
const router = express.Router();
const {
    CreateUser,
    GetAllUsers,
    GetUserByID,
    GetUserByUsername,
    UpdateUser,
    DeleteUser
 } = require('../controllers/userController');

// Create a new user
router.post('/', CreateUser);

// Get all users
router.get('/', GetAllUsers);

// Get user by ID
router.get('/:id', GetUserByID);

// Get user by username
router.get('/username/:username', GetUserByUsername);

// Update a user
router.put('/:id', UpdateUser);

// Delete a user
router.delete('/:id', DeleteUser);

module.exports = router;

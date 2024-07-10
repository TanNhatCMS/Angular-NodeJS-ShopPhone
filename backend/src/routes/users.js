const router = require('express').Router();
const {isEmptyBody, authenticate, upload} = require('../middleware');
const {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
 } = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Create a new user
router.post('/', authenticate, createUser);

// Get user by ID
router.get('/:id', getUserByID);

// Update a user
router.put('/:id', authenticate, updateUser);

// Delete a user
router.delete('/:id', authenticate, deleteUser);

module.exports = router;

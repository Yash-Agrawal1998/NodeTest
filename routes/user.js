const express = require('express');
const {getUserData, saveUserData, findUserDataById, updateUserDataById, deleteUserDataById, loginUser} = require('../controllers/UserController');
const {validateLoginData, verifyUser} = require('../middleware/auth')

const router = express.Router();

router.get('/', verifyUser, getUserData).post('/', saveUserData);

router.get('/:id', verifyUser, findUserDataById).patch('/:id', verifyUser, updateUserDataById).delete('/:id', verifyUser, deleteUserDataById);

router.post('/login', validateLoginData, loginUser);

module.exports = router;
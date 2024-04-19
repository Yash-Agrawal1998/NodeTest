import express from 'express';
import {
    getUserData,
    saveUserData,
    findUserDataById,
    updateUserDataById,
    deleteUserDataById,
    loginUser,
    updatePassword
} from '../controllers/UserController.mjs';
import {validateLoginData, verifyUser} from '../middleware/auth.mjs';

export const userRoute = express.Router();

userRoute.get('/', verifyUser, getUserData).post('/', saveUserData);

userRoute.get('/:id', verifyUser, findUserDataById).patch('/:id', verifyUser, updateUserDataById).delete('/:id', verifyUser, deleteUserDataById);

userRoute.post('/login', validateLoginData, loginUser);

userRoute.post('/forgetPassword', updatePassword);
import express from 'express';
import * as userController from '../controllers/userController.js'
import { isSuperAdmin } from '../auth/auth.controller.js';

const router = express.Router();
router.get('/', userController.getAllUsers )
router.get('/id/:id', userController.getUserById )
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
export default router
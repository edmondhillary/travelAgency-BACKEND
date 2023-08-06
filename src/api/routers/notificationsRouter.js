import express from 'express';
import * as notificationsController from '../controllers/notificationsController.js';

const router = express.Router();

router.post('/', notificationsController.createNotification);
router.get('/:userId', notificationsController.getNotifications);
router.put('/:id/read', notificationsController.markNotificationAsRead);

export default router;

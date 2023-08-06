import * as notificationsRepo from "../repositories/notificationsRepo.js";

async function createNotification(req, res) {
  const { userId, message } = req.body;
  try {
    const notification = await notificationsRepo.createNotification({ userId, message });
    return res.json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getNotifications(req, res) {
  const { userId } = req.params;
  try {
    const notifications = await notificationsRepo.getNotificationsByUserId({ userId });
    return res.json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function markNotificationAsRead(req, res) {
  const { id } = req.params;
  try {
    const notification = await notificationsRepo.markNotificationAsRead({ id });
    return res.json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export { createNotification, getNotifications, markNotificationAsRead };

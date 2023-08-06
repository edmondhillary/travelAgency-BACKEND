import notificationModel from "../models/notificationsSchema.js";

async function createNotification({ userId, message }) {
  const notification = await notificationModel.create({ userId, message });
  return notification;
}

async function getNotificationsByUserId({ userId }) {
  const notifications = await notificationModel.find({ userId });
  return notifications;
}

async function markNotificationAsRead({ id }) {
  const notification = await notificationModel.findByIdAndUpdate(id, { read: true }, { new: true });
  return notification;
}

export { createNotification, getNotificationsByUserId, markNotificationAsRead };

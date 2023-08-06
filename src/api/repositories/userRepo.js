import userModel from "../models/userSchema.js";
import { Types } from "mongoose";
import bookingModel from "../models/bookingsSchema.js";
import notificationModel from "../models/notificationsSchema.js";
import reviewModel from "../models/reviewsSchema.js";
const { ObjectId } = Types;

async function insert({ email, password, firstName, lastName, role }) {
  const user = await userModel.create({ email, password, firstName, lastName, role });
  return user;
}

async function getByEmail({ email }) {
  const user = await userModel.findOne({ email });
  return user;
}
async function getUserById(id) {
  const query = { _id: new ObjectId(id) };
  const user = await userModel.findById(query).populate('bookings');
  return user;
}
async function getAllUsers() {
  const users = await userModel.find({});
  return users;
}

async function updateUser({ id, fieldsToUpdate }) {
  const query = { _id: new ObjectId(id) };
  const updateBody = { $set: fieldsToUpdate };

  const userToUpdate = await userModel.findOneAndUpdate(query, updateBody, {
    new: true,
  });
  return userToUpdate;
}

async function deleteUserById({ id }) {
  const query = { _id: new ObjectId(id) };

  // Delete the user
  const deletedUser = await userModel.findOneAndDelete(query);

  if (!deletedUser) {
    throw new Error('User not found');
  }

  // Now we need to delete all documents that reference the user
  const userReferenceQuery = { user: new ObjectId(id) }; // para bookings y reviews
  const userReferenceQueryForNotifications = { userId: new ObjectId(id) }; // para notifications

  // Assuming you have models for bookings, notifications, and reviews
  await bookingModel.deleteMany(userReferenceQuery);
  await notificationModel.deleteMany(userReferenceQueryForNotifications);
  await reviewModel.deleteMany(userReferenceQuery);

  return deletedUser;
}

export { insert, getAllUsers, getByEmail, updateUser, deleteUserById, getUserById };

import bookingModel from "../models/bookingsSchema.js";
import { Types } from "mongoose";
import userModel from "../models/userSchema.js";
const { ObjectId } = Types;

async function insert(newBooking) {
  // Crear el nuevo booking
  const booking = await bookingModel.create(newBooking);

  const userToUpdate = await userModel.findById(booking.user);
  userToUpdate.bookings.push(booking._id);
  await userToUpdate.save();

  return booking;
}

async function getAllBookings() {
  const bookings = await bookingModel.find({})
  .populate('trip')
  .populate('user');
  return bookings;
}

async function getById (id){
  const query = { _id: new ObjectId(id) };
  const booking = await bookingModel.findById(query).populate('user trip');
  return booking;
}
  


async function updateBookingById({ id, fieldsToUpdate }) {
  const query = { _id: new ObjectId(id) };
  const updateBody = { $set: fieldsToUpdate };

  // Utiliza findOneAndUpdate con el parámetro { new: true } para obtener el booking actualizado
  const bookingToUpdate = await bookingModel.findOneAndUpdate(query, updateBody, {
    new: true,
  });

  // Si no se encontró el booking, lanzar un error
  if (!bookingToUpdate) {
    throw new Error('Booking not found');
  }

  return bookingToUpdate;
}

async function deleteBookingById({ id }) {
  const query = { _id: new ObjectId(id) };
  const deletedBooking = await bookingModel.findOneAndDelete(query);
  if (!deletedBooking) {
    throw new Error("booking not found");
  }
  const userId = deletedBooking.user;
  await userModel.findByIdAndUpdate(userId, { $pull: { bookings: new ObjectId(id) } });

  // Envía el booking eliminado como respuesta
  return deletedBooking;
}


export { insert, getAllBookings, updateBookingById, deleteBookingById, getById };

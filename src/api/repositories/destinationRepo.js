import destinationModel from "../models/destinationSchema.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

async function insert({ name, description, imageUrl, country, hashtags }) {
  const destination = await destinationModel.create({ name, description, imageUrl , country, hashtags});
  return destination;
}

async function getAllDestinations() {
  const destinations = await destinationModel.find({});
  return destinations;
}

async function getDestinationById(id) {
  const query = { _id: new ObjectId(id) };
  const destination = await destinationModel.findById(query);
  return destination;
}

async function updateDestination({ id, fieldsToUpdate }) {
  const query = { _id: new ObjectId(id) };
  const updateBody = { $set: fieldsToUpdate };

  const destinationToUpdate = await destinationModel.findOneAndUpdate(query, updateBody, {
    new: true,
  });
  return destinationToUpdate;
}

async function deleteDestinationById({ id }) {
  const query = { _id: new ObjectId(id) };
  const deletedDestination = await destinationModel.findOneAndDelete(query);
  return deletedDestination;
}

export { insert, getAllDestinations, updateDestination, deleteDestinationById ,getDestinationById };

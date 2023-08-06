import * as tripsRepo from '../repositories/tripsRepo.js';

async function getAllTrips (req, res){
    try{
        const trips = await tripsRepo.getAllTrips();
        res.json(trips);

    }
    catch(error){
        return res.status(error.status || 500).json(err.message)
    }
}

async function createTrip(req, res){
    const newTrip = req.body;
    try{
        const trip = await tripsRepo.insert(newTrip);
        return res.json(trip);
    }
    catch(error){
        return res.status(error.status || 500).json(error.message)
    }
}

async function getTripById(req, res) {
    const { id } = req.params;
    try {
      const trip = await tripsRepo.getTripById(id);
      return res.json(trip);
    } catch (error) {
      return res.status(error.status || 500).json(error.message);
    }
  }

async function updateTrip(req,res){
    const {id} = req.params;
    const fieldsToUpdate = req.body;
    try{
        const tripUpdated = await tripsRepo.updateTrip({id, fieldsToUpdate});
        return res.json(tripUpdated);
    }
    catch(error){   
        return res.status(error.status || 500).json(error.message);
    }
}

async function deleteTrip(req,res){
    const {id} = req.params;
    try{
        const deletedTrip = await tripsRepo.deleteTripById({id});
        res.write(`Trip: ${deletedTrip.title} has been deleted`);
        res.end();
    }
    catch(error){
        return res.status(error.status || 500).json(error.message);
    }
}

export {getAllTrips, createTrip, updateTrip, deleteTrip, getTripById};

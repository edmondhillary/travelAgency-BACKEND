import * as destinationsRepo from '../repositories/destinationRepo.js';

async function createDestination (req, res) {
    try{
        const destination = await destinationsRepo.insert(req.body)
        res.json(destination);
    }
    catch(error){
        return res.status(error.status || 500).json(error.message)
    }
}

async function getAllDestinations(req,res){
    try{
        const destinations = await destinationsRepo.getAllDestinations()
        res.json(destinations);
    }
    catch(error){
        return res.status(error.status || 500).json(error.message)
    }
}

async function getDestinationById(req, res) {
    const { id } = req.params;
    try {
      const destination = await destinationsRepo.getDestinationById(id);
      return res.json(destination);
    } catch (error) {
      return res.status(error.status || 500).json(error.message);
    }
  }

async function updateDestination(req,res){
    const {id} = req.params;
    const fieldsToUpdate = req.body;
    try{
        const destinationUpdated = await destinationsRepo.updateDestination({id, fieldsToUpdate})
        return res.json(destinationUpdated)
    }
    catch(error){
        return res.status(error.status || 500).json(error.message)
    }
}

async function deleteDestination(req,res){
    const {id} = req.params;
    try{
        const deletedDestination = await destinationsRepo.deleteDestinationById({id})
        res.write(`Destination: ${deletedDestination.name} has been deleted`);
        res.end();
    }
    catch(error){
        return res.status(error.status || 500).json(error.message)
    }
}

export {createDestination, getAllDestinations, updateDestination, deleteDestination, getDestinationById}

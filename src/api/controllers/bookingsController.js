import * as bookingsRepo from '../repositories/bookingsRepo.js';

async function getAllBookings (req, res){
    try{
        const bookings = await bookingsRepo.getAllBookings();
        res.json(bookings);

    }
    catch(error){
        return res.status(error.status || 500).json(err.message)
    }
}

async function createBooking(req, res){
    const newBooking = req.body;
    try{
        const booking = await bookingsRepo.insert(newBooking);
        return res.json(booking);
    }
    catch(error){
        return res.status(error.status || 500).json(error.message)
    }
}

async function getById (req, res){
    const {id} = req.params;
    try{
        const booking = await bookingsRepo.getById({id})
        return res.json(booking)
    }catch (error) {
        return res.status(error.status || 500).json(error.message);
      }
}

async function updateBooking(req, res) {
    const { id } = req.params;
    const fieldsToUpdate = req.body;
    try {
      const bookingUpdated = await bookingsRepo.updateBookingById({ id, fieldsToUpdate });
      return res.json(bookingUpdated);
    } catch (error) {
      return res.status(error.status || 500).json(error.message);
    }
  }

async function deleteBooking(req,res){
    const {id} = req.params;
    try{
        const deletedBooking = await bookingsRepo.deleteBookingById({id});
        res.write(`Booking with id ${id} has been deleted`);
        res.end();
    }
    catch(error){
        return res.status(error.status || 500).json(error.message);
    }
}

export {getAllBookings, createBooking, updateBooking, deleteBooking , getById};

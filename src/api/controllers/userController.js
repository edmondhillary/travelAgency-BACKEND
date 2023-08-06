import * as usersRepo from '../repositories/userRepo.js';

async function getAllUsers (req, res){
    try{
        const users = await usersRepo.getAllUsers()
        res.json(users);

    }
    catch(error){
        return res.status(error.status || 500).json(err.message)
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await usersRepo.getUserById(id);
      return res.json(user);
    } catch (error) {
      return res.status(error.status || 500).json(error.message);
    }
  }

async function updateUser(req,res){
    const {id} = req.params;
    const fieldsToUpdate = req.body;
    try{

        const userUpdated = await usersRepo.updateUser({id, fieldsToUpdate})
        return res.json(userUpdated)
    }
    catch(error){   
        return res.status(error.status || 500).json(error.message)
    }

}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await usersRepo.deleteUserById({ id });  
      res.status(200).json(deletedUser); 
      // Send the response with deletedUser JSON data
    } catch (error) {
      return res.status(error.status || 500).json(error.message);
    }
  }
  

export {getAllUsers, updateUser, deleteUser, getUserById}
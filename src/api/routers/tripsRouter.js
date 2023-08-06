import express from "express";
import * as tripsController from "../controllers/tripsController.js";
// import { isSuperAdmin } from '../auth/auth.controller.js';

const router = express.Router();
router.post("/", tripsController.createTrip);
router.get("/", tripsController.getAllTrips);
router.get("/id/:id", tripsController.getTripById);

router.put("/:id", tripsController.updateTrip);
router.delete("/:id", tripsController.deleteTrip);

export default router;

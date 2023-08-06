import express from "express";
import * as destinationController from "../controllers/destinationController.js";

const router = express.Router();

router.post("/", destinationController.createDestination);
router.get("/", destinationController.getAllDestinations);
router.get("/id/:id", destinationController.getDestinationById);
router.put("/:id", destinationController.updateDestination);
router.delete("/:id", destinationController.deleteDestination);

export default router;

// DEPENDENCIES
import Router from "express";
import usersRouter from "../api/routers/usersRouter.js";
import tripsRouter from "../api/routers/tripsRouter.js";
import boookingsRouter from "../api/routers/bookingsRouter.js";
import reviewsRouter from "../api/routers/reviewsRouter.js";
import notificationsRouter from "../api/routers/notificationsRouter.js";
import destinationRouter from "../api/routers/destinationRouter.js";
// ROUTER FILES
import { register, login } from "../api/auth/auth.controller.js";

// // ROUTER FILES

// // ROUTER INITIALIZING
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.use("/users", usersRouter);
router.use("/trips", tripsRouter);
router.use("/bookings", boookingsRouter)
router.use("/reviews", reviewsRouter)
router.use('/destinations', destinationRouter)
router.use("/notifications", notificationsRouter)


export default router;

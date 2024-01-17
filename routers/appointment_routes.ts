import express from "express";
import { InputValidator } from "../middlewares/input-validator";
import { AppointmentValidator } from "../validator/appointment.validator";
import * as AppointmentController from "../controllers/appointment_controller";
const AppointmentRouter = express.Router();
const appointment_routes = process.env.API_V + "/appointments";
AppointmentRouter.post(
  `${appointment_routes}/:organization`,
  [InputValidator(AppointmentValidator.create, "body")],
  AppointmentController.appointment_create,
);
export default AppointmentRouter;

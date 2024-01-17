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
AppointmentRouter.get(
  `${appointment_routes}/:organization`,
  [InputValidator(AppointmentValidator.getByRange, "query")],
  AppointmentController.appointment_get_by_range,
);
export default AppointmentRouter;

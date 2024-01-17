import { Schema } from "mongoose";
import { IAppointment } from "./interfaces/appointment.interface";
import { Database } from "../config/mongodb";

const AppointmentSchema = new Schema<IAppointment>({
  organization: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});
export const AppointmentModel = Database.model<IAppointment>(
  "appointments",
  AppointmentSchema,
);

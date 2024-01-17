import { IAppointment } from "../../models/interfaces/appointment.interface";

export abstract class Appointment implements IAppointment {
  createdAt: Date;
  end: Date;
  organization: String;
  start: Date;
  updatedAt: Date;
}

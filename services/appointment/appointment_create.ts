import { Appointment } from "./appointment";
import { AppointmentModel } from "../../models/appointment.model";

/**
 * Handle Creating Appointment
 */
export class AppointmentCreate extends Appointment {
  constructor(start: Date, end: Date, organization: String) {
    super();
    this.start = start;
    this.end = end;
    this.organization = organization;
  }

  /**
   * validate record(does not already appointment taken
   * create the record
   */
  async create(): Promise<RestApi.ObjectResInterface> {
    try {
      //TODO validate
      const appointment = await this.insert();
      return {
        msg: appointment.msg,
        is_success: appointment.is_success,
        data: appointment.data,
      };
    } catch (e) {
      console.log(e);
      return {
        is_success: false,
        msg: "internal error",
      };
    }
  }

  private async insert(): Promise<RestApi.ObjectResInterface> {
    try {
      const appointment = await AppointmentModel.create({
        organization: this.organization,
        start: this.start,
        end: this.end,
      });
      return {
        is_success: true,
        data: appointment,
      };
    } catch (e) {
      console.log(e);
      return {
        is_success: false,
        msg: "internal error",
      };
    }
  }
}

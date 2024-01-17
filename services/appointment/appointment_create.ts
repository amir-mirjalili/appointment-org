import { Appointment } from "./appointment";
import { AppointmentModel } from "../../models/appointment.model";
import { AppointmentCheck } from "./appointment_check";

/**
 * Handle Creating Appointment
 */
export class AppointmentCreate extends Appointment {
  constructor(start: Date, end: Date, organization: string) {
    super();
    this.start = start;
    this.end = end;
    this.organization = organization;
  }

  /**
   * validate record(does not already appointment taken
   * create the record
   */
  async create(id: string): Promise<RestApi.ObjectResInterface> {
    try {
      const check = new AppointmentCheck(this.organization);
      const checkTimeRange = await check.validateTimeRange(
        this.start,
        this.end,
      );
      if (!checkTimeRange.is_success)
        return {
          is_success: false,
          msg: checkTimeRange.msg,
        };
      let result;
      if (id) result = await this.update(id);
      else result = await this.insert();
      return {
        msg: result.msg,
        is_success: result.is_success,
        data: result.data,
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

  private async update(id: string): Promise<RestApi.ObjectResInterface> {
    try {
      const appointment = await AppointmentModel.findByIdAndUpdate(
        id,
        {
          start: this.start,
          end: this.end,
        },
        { new: true },
      );
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

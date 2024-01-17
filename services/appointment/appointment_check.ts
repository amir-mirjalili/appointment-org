import { AppointmentModel } from "../../models/appointment.model";

/**
 * check with the rules of either creation or updating
 */
export class AppointmentCheck {
  organization: string;
  constructor(organization: string) {
    this.organization = organization;
  }

  /**
   * check the appointment has already taken
   * @param start
   * @param end
   */
  async validateTimeRange(
    start: Date,
    end: Date,
  ): Promise<RestApi.ObjectResInterface> {
    const count = await AppointmentModel.countDocuments({
      organization: this.organization,
      $or: [
        { start: { $lte: start }, end: { $gte: start } },
        { start: { $lte: end }, end: { $gte: end } },
        { start: { $gte: start }, end: { $lte: end } },
      ],
    });
    return {
      msg: count > 0 ? "This Time Range Has Already Taken" : "",
      is_success: count <= 0,
    };
  }
}

import { AppointmentModel } from "../../models/appointment.model";

export class AppointmentInfo {
  organization: string;
  constructor(organization: string) {
    this.organization = organization;
  }
  async getByRange(
    start: Date,
    end: Date,
  ): Promise<RestApi.ObjectResInterface> {
    try {
      const items = await AppointmentModel.find({
        organization: this.organization,
        start: { $gte: start },
        end: { $lte: end },
      });
      return {
        data: items,
        is_success: true,
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

import { expect } from "chai";
import { AppointmentModel } from "../../models/appointment.model";
import { AppointmentInfo } from "../../services/appointment/appointment_info";
let createdAppointmentId: string | undefined;

describe("Appointment Info Service", () => {
  afterEach(async () => {
    if (createdAppointmentId) {
      await AppointmentModel.findByIdAndDelete(createdAppointmentId);
    }
  });
  it("should return success", async () => {
    const organization = "testOrg";
    const existingAppointment = await AppointmentModel.create({
      organization: "testOrg",
      start: new Date("2023-10-10T13:20:00.000Z"),
      end: new Date("2023-10-14T13:10:00.000Z"),
    });
    createdAppointmentId = existingAppointment._id.toString();
    const info = new AppointmentInfo(organization);
    const result = await info.getByRange(
      new Date("2023-10-10T13:20:00.000Z"),
      new Date("2023-10-14T13:10:00.000Z"),
    );
    expect(result.is_success).to.equal(true);
    expect(result.data).to.be.an("array").that.is.not.empty;
  });
});

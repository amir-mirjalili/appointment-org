import { AppointmentCheck } from "../../services/appointment/appointment_check";
import { expect } from "chai";
import { AppointmentModel } from "../../models/appointment.model";
let createdAppointmentId: string | undefined;

describe("Appointment Check Service", () => {
  afterEach(async () => {
    if (createdAppointmentId) {
      await AppointmentModel.findByIdAndDelete(createdAppointmentId);
    }
  });
  it("should return success when the time range is available", async () => {
    const organization = "testOrg";
    const check = new AppointmentCheck(organization);
    const result = await check.validateTimeRange(
      new Date("2023-10-10T13:20:00.000Z"),
      new Date("2023-10-14T13:10:00.000Z"),
    );
    expect(result).to.deep.equal({ msg: "", is_success: true });
  });

  it("should return error when the time range is already taken", async () => {
    const existingAppointment = await AppointmentModel.create({
      organization: "testOrg",
      start: new Date("2023-10-10T13:20:00.000Z"),
      end: new Date("2023-10-14T13:10:00.000Z"),
    });
    createdAppointmentId = existingAppointment._id.toString();

    const organization = "testOrg";
    const check = new AppointmentCheck(organization);
    const result = await check.validateTimeRange(
      new Date("2023-10-10T13:15:00.000Z"),
      new Date("2023-10-14T13:10:00.000Z"),
    );
    expect(result).to.deep.equal({
      msg: "This Time Range Has Already Taken",
      is_success: false,
    });
  });
});

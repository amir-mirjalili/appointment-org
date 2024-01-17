import { AppointmentCreate } from "../../services/appointment/appointment_create";
import { expect } from "chai";
import { AppointmentModel } from "../../models/appointment.model";
let createdAppointmentId: string | undefined;

describe("AppointmentCreate service", () => {
  afterEach(async () => {
    if (createdAppointmentId) {
      await AppointmentModel.findByIdAndDelete(createdAppointmentId);
    }
  });
  it("should create a new appointment successfully", async () => {
    const start = new Date("2023-10-15T10:00:00.000Z");
    const end = new Date("2023-10-15T11:00:00.000Z");
    const organization = "testOrg";
    const appointmentCreate = new AppointmentCreate(start, end, organization);

    const result = await appointmentCreate.create("");
    expect(result.is_success).to.equal(true);
    expect(result.data?.organization).to.equal(organization);
    expect(result.data?.start.toISOString()).to.equal(start.toISOString());
    expect(result.data?.end.toISOString()).to.equal(end.toISOString());

    // Store the created appointment's id to remove it later
    createdAppointmentId = result.data?._id;
  });

  it("should not create a new appointment if the time range is already taken", async () => {
    // Assuming you have some existing records in the database
    const existingAppointment = await AppointmentModel.create({
      organization: "testOrg",
      start: new Date("2023-10-10T13:20:00.000Z"),
      end: new Date("2023-10-14T13:10:00.000Z"),
    });

    createdAppointmentId = existingAppointment._id.toString();

    const start = new Date("2023-10-10T13:15:00.000Z");
    const end = new Date("2023-10-14T13:10:00.000Z");
    const organization = "testOrg";
    const appointmentCreate = new AppointmentCreate(start, end, organization);

    const result = await appointmentCreate.create("");
    expect(result.is_success).to.equal(false);
    expect(result.msg).to.equal("This Time Range Has Already Taken");
    expect(result.data).to.be.undefined;
  });
});

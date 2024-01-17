import request from "supertest";
import app from "../../providers/app";
import { expect } from "chai";
describe("Appointment Controller", () => {
  it("should call the appointment create", async () => {
    return request(app)
      .post("/api/v1/appointments/test")
      .send({ start: "2023-10-22 18:11", end: "2023-10-23 18:20" })
      .then(function (response: any) {
        expect(response.status).to.equal(200);
      });
  });
  it("should call the api and return validation error ", async () => {
    return request(app)
      .post("/api/v1/appointments/test")
      .then(function (response: any) {
        expect(response.status).to.equal(412);
      });
  });
  it("should call the getByRange", async () => {
    return request(app)
      .get("/api/v1/appointments/test")
      .query({ start: "2023-10-22 18:11", end: "2023-10-23 18:20" })
      .then(function (response: any) {
        expect(response.status).to.equal(200);
      });
  });

  it("should call the getByRange and return validation error", async () => {
    return request(app)
      .get("/api/v1/appointments/test")
      .then(function (response: any) {
        expect(response.status).to.equal(412);
      });
  });
});

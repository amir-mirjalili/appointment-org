import { Request, Response } from "express";
import { AppointmentCreate } from "../services/appointment/appointment_create";
import { ApiRes } from "../providers/restapi/status";
export const appointment_create = async (req: Request, res: Response) => {
  const appointmentCreate = new AppointmentCreate(
    req.body.start,
    req.body.end,
    req.params.organization,
  );
  const result = await appointmentCreate.create(req.body.id);

  return ApiRes(res, {
    status: 200,
    data: result.data,
    msg: result.msg,
  });
};

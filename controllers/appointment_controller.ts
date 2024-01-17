import { Request, Response } from "express";
import { AppointmentCreate } from "../services/appointment/appointment_create";
import { ApiRes } from "../providers/restapi/status";
import { AppointmentInfo } from "../services/appointment/appointment_info";
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

export const appointment_get_by_range = async (req: Request, res: Response) => {
  const appointmentInfo = new AppointmentInfo(req.params.organization);
  const result = await appointmentInfo.getByRange(
    new Date(req.query.start as string),
    new Date(req.query.end as string),
  );
  return ApiRes(res, {
    status: 200,
    data: result.data,
    msg: result.msg,
  });
};

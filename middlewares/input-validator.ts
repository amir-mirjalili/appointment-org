import { ApiRes } from "../providers/restapi/status";

export const InputValidator = (validator: any, type: string) => {
  return (req: any, res: any, next: any) => {
    const { error } = validator.validate(req[type]);
    if (!error) return next();
    const { details } = error;
    const message = details.map((i: any) => i.message).join(",");

    return ApiRes(res, {
      status: 412,
      msg: message,
    });
  };
};

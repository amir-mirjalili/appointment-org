import express, { Request, Response } from "express";
import compression from "compression";
import { Cors } from "./restapi/cors";
import { ApiRes } from "./restapi/status";
import AppointmentRouter from "../routers/appointment_routes";

const app = express();

//App usages
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Cors
app.use(Cors);

// App routers
app.use(AppointmentRouter);
app.get("/", (req, res) => {
  ApiRes(res, <RestApi.ResInterface>{
    status: 200,
    msg: "Appointment Service",
    data: undefined,
  });
});
// Error Pages
app.use((req: Request, res: Response) => {
  ApiRes(res, <RestApi.ResInterface>{
    status: 404,
    msg: undefined,
    data: undefined,
  });
});

export default app;

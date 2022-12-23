import express, { Request, ErrorRequestHandler } from "express";

import { body } from "express-validator";
import * as carshop from "../carshop/router/CarShop.router";

const app = express();

app.use(express.json());

app.use(`/carshop`, carshop.router);

// app.get("/cars", async (req, res) => {
//   res.json(await Car.find());
//   // res.end("cars\n");
// });

// app.get("/cars/:id", (req, res) => {
//   res.end(`car - ${req.params.id}\n`);
// });

app.use(<ErrorRequestHandler>((err: Error, req, res, next) => {
  if (app.get("env") !== "test") console.error(err.stack);
  res.status(500).json({ error: err.message });
}));

export { app };

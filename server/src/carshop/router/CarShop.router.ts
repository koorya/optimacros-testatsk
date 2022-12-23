import express from "express";
import * as carController from "../controller/Car.controller";

const router = express.Router();

router.post(`/addCar`, carController.addCar);

export { router };

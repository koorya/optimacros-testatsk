import express from "express";
import * as carController from "../controller/Car.controller";

const router = express.Router();

router.post(`/car`, carController.addCar);
router.get(`/cars`, carController.listCar);
router.get(`/cars/:id`, carController.getCarById);
router.delete(`/cars/:id`, carController.deleteCarById);

export { router };

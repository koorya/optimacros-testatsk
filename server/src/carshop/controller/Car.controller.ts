import { RequestHandler } from "express";
import { CarType } from "../model/Car.model";
import { createCar } from "../service/Car.service";

export const addCar: RequestHandler<{}, {}, CarType> = async (
  req,
  res,
  next
) => {
  try {
    const { carId } = await createCar(req.body);
    res.json({ carId });
  } catch (error) {
    next(error as Error);
  }
};

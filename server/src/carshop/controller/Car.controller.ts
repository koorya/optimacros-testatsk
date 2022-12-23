import { RequestHandler } from "express";
import { Car, CarType } from "../model/Car.model";

export const addCar: RequestHandler<{}, {}, CarType> = async (
  req,
  res,
  next
) => {
  try {
    const car = new Car(req.body);
    const newCar = await car.save();
    res.json({ carId: newCar._id });
  } catch (error) {
    next(error as Error);
  }
};

export const listCar: RequestHandler<{ id: string }, {}, {}> = async (
  req,
  res,
  next
) => {
  try {
    res.json(await Car.find());
  } catch (error) {
    next(error);
  }
};

export const getCarById: RequestHandler<{}, {}, CarType> = async (
  req,
  res,
  next
) => {
  throw Error("Method indefined");
};

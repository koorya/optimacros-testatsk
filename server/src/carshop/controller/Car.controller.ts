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

export const listCar: RequestHandler<{}, {}, {}, { sort?: string }> = async (
  req,
  res,
  next
) => {
  const { sort } = req.query;
  if (sort) {
    sort.matchAll(/(\+|\-)?(price|name|year),?/g);
  }
  try {
    const result = await Car.find();
    res.json(
      result.map(({ _id, brand, name, price, production_year }) => ({
        id: _id,
        brand,
        name,
        price,
        production_year,
      }))
    );
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

import { RequestHandler } from "express";
import { SortOrder } from "mongoose";
import { parseSortStr } from "../../ulils/queryStringParser";
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

export const listCar: RequestHandler<
  {},
  {},
  {},
  { sort?: string; limit?: string; offset?: string }
> = async (req, res, next) => {
  const { sort, offset, limit } = req.query;
  try {
    const sortObj = sort ? parseSortStr(sort) : null;
    const result = await Car.find()
      .sort(sortObj)
      .skip(parseInt(offset || "0"))
      .limit(parseInt(limit || "0"));
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

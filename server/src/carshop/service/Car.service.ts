import { Car, CarType } from "../model/Car.model";

export const createCar = async (carParams: CarType) => {
  const car = new Car(carParams);
  const newCar = await car.save();
  return { carId: newCar._id };
};

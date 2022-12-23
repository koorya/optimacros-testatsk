import { createCar } from "../../../carshop/service/Car.service";
import { Car, CarType } from "../../../carshop/model/Car.model";
import { useMongoMemoryServer } from "../../testutils/mongo.hook";

describe("Car created when", () => {
  useMongoMemoryServer();
  it("First car", async () => {
    const carProps: CarType = {
      brand: "volga",
      name: "021",
      price: 1000,
      production_year: 1986,
    };
    const { carId } = await createCar(carProps);
    const car = await Car.findById(carId);
    expect(car?.brand).toBe(carProps.brand);
  });
  it("Second car", async () => {
    const carProps: CarType = {
      brand: "lada",
      name: "020",
      price: 1100,
      production_year: 1985,
    };
    const { carId } = await createCar(carProps);
    const car = await Car.findById(carId);
    expect(car?.brand).toBe(carProps.brand);
  });
});

describe("Car validation", () => {
  it("should error when year invalid", async () => {
    const carProps: CarType = {
      brand: "lada",
      name: "020",
      price: 1100,
      production_year: 985,
    };
    expect(() => createCar(carProps)).rejects.toThrow(/(985)/);
  });
  it("should error when name undefined", async () => {
    const carProps = {
      brand: "lada",
      price: 1100,
      production_year: 1985,
    };
    expect(() => createCar(carProps as CarType)).rejects.toThrow(/(name)/);
  });
});

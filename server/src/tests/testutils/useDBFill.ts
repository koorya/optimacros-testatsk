import { Car } from "../../carshop/model/Car.model";

export const useDBFill = () => {
  beforeEach(async () => {
    await new Car({
      brand: "volga",
      name: "332",
      price: 2000,
      production_year: 1988,
    }).save();
  });
};

import { Car, CarType } from "../../src/carshop/model/Car.model";

export const fillDB = async (qty: number) => {
  const brands = ["volga", "lada", "toyota", "nissan"];
  const names = ["221", "421", "022", "331"];
  const production_years = [1998, 1985, 1990, 2010];
  const getRandomItem = <T>(arr: T[]): T =>
    arr[Math.round(Math.random() * (arr.length - 1))];
  const cars: CarType[] = [];
  for (let i = 0; i < qty; i++) {
    cars.push({
      brand: getRandomItem(brands),
      name: getRandomItem(names),
      production_year: getRandomItem(production_years),
      price: Math.round(Math.random() * 1000000),
    });
  }

  await Promise.all(cars.map((car) => new Car(car).save()));
  return cars;
};

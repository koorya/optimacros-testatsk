import { Car, IsRenderer } from "./types";

export class CarRenderer implements IsRenderer<Car> {
  render(car: Car): void {
    console.log("Found car");

    console.log(`year\tname\tbrand\tprice`);
    [car].map(({ brand, name, price, production_year }) =>
      console.log(`${production_year}\t${name}\t${brand}\t${price}`)
    );
  }
  renderList(cars: Car[]): void {
    console.log("Car list");
    console.log(`\tid\t\t\tyear\tname\tbrand\tprice`);
    cars.map(({ id, brand, name, price, production_year }) =>
      console.log(`${id}\t${production_year}\t${name}\t${brand}\t${price}`)
    );
  }
  success(message: string, value?: Car | undefined): void {
    console.log(`${message} ${value ? JSON.stringify(value, null, 2) : ""}`);
  }
}

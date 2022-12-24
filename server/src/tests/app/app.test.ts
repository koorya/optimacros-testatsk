import { app } from "../../app/app";

import request from "supertest";
import { useMongoMemoryServer } from "../testutils/mongo.hook";
import { fillDB } from "../testutils/useDBFill";
import { isArraySorted } from "../testutils/isAlreadySorted";
import { CarType } from "../../carshop/model/Car.model";

describe("create car", () => {
  useMongoMemoryServer();
  it("should return new car id", async () => {
    const response = await request(app).post("/carshop/car").send({
      name: "22",
      price: 200000,
      brand: "toyota",
      production_year: 2000,
    });
    expect(response.body).toHaveProperty("carId");
  });
  it("when brand is not passed should validation error", async () => {
    const response = await request(app).post("/carshop/car").send({
      name: "22",
      price: 200000,
      // brand: "toyota",
      production_year: 2000,
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toMatch(/brand/);
  });
});

describe("remove car", () => {
  useMongoMemoryServer();
  fillDB(1);
  it("should return removed carId", async () => {});
  it("should return error invalid carId", async () => {});
});

describe("list cars", () => {
  const totalQty = 15;
  const getData = useMongoMemoryServer(() => fillDB(totalQty));
  it("should return full car list", async () => {
    const response = await request(app).get("/carshop/cars");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(totalQty);
  });
  it("should return car list sorted by price", async () => {
    const response = await request(app).get("/carshop/cars?sort=+price");
    expect(response.statusCode).toBe(200);
    expect(getData()).toHaveLength(totalQty);
    expect(response.body).toHaveLength(totalQty);

    const arr = response.body;

    expect(
      isArraySorted<CarType>(arr, ({ price: A }, { price: B }) => A - B)
    ).toBe(true);
  });
  it("should return car list sorted by year", async () => {});

  it("should return error unsupported sort", async () => {});
});

describe("fetch car by id", () => {
  useMongoMemoryServer();
  fillDB(5);
  it("should return car", async () => {
    // const response = await request(app).get("/carshop/cars/");
  });
  it("should return error invalid carId", async () => {});
});

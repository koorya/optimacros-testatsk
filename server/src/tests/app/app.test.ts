import { app } from "../../app/app";

import request from "supertest";
import { useMongoMemoryServer } from "../testutils/mongo.hook";
import { useDBFill } from "../testutils/useDBFill";

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
  useDBFill();
  it("should return removed carId", async () => {
    // throw Error("test undefined");
  });
  it("should return error invalid carId", async () => {
    // throw Error("test undefined");
  });
});

describe("list cars", () => {
  useMongoMemoryServer();
  useDBFill();
  it("should return car list", async () => {
    const response = await request(app).get("/carshop/cars");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);

    // throw Error("test undefined");
  });
  it("should return car list sorted by price", async () => {
    // throw Error("test undefined");
  });
  it("should return car list sorted by year", async () => {
    // throw Error("test undefined");
  });

  it("should return error unsupported sort", async () => {
    // throw Error("test undefined");
  });
});

describe("fetch car by id", () => {
  useMongoMemoryServer();
  useDBFill();
  it("should return car", async () => {
    // const response = await request(app).get("/carshop/cars/");
    // throw Error("test undefined");
  });
  it("should return error invalid carId", async () => {
    // throw Error("test undefined");
  });
});

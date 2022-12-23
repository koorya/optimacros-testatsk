import { app } from "../../app/app";

import request from "supertest";
import { useMongoMemoryServer } from "../testutils/mongo.hook";

describe("Carshop api", () => {
  useMongoMemoryServer();
  it("should create car", async () => {
    const response = await request(app).post("/carshop/addCar").send({
      name: "22",
      price: 200000,
      brand: "toyota",
      production_year: 2000,
    });
    expect(response.body).toHaveProperty("carId");
  });
  it("when brand is not passed should return validation error", async () => {
    const response = await request(app).post("/carshop/addCar").send({
      name: "22",
      price: 200000,
      // brand: "toyota",
      production_year: 2000,
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toMatch(/brand/);
  });
});

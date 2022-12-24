import { app } from "../../src/app/app";

import request from "supertest";
import { useMongoMemoryServer } from "../testutils/mongo.hook";
import { fillDB } from "../testutils/useDBFill";
import { isArraySorted } from "../testutils/isAlreadySorted";
import { CarType } from "../../src/carshop/model/Car.model";

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

describe("list cars", () => {
  const totalQty = 15;
  const getData = useMongoMemoryServer(() => fillDB(totalQty));
  it("should return full car list", async () => {
    const response = await request(app).get("/carshop/cars");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(totalQty);
  });
  it("should return limited car list", async () => {
    const response1 = await request(app).get("/carshop/cars?offset=5&limit=3");
    expect(response1.statusCode).toBe(200);
    expect(response1.body).toHaveLength(3);

    const response2 = await request(app).get("/carshop/cars?offset=7&limit=2");
    expect(response2.statusCode).toBe(200);
    expect(response2.body).toHaveLength(2);

    expect(response1.body[2].id).toBe(response2.body[0].id);
  });

  it("should return car list sorted by price", async () => {
    const response = await request(app).get("/carshop/cars?sort=price");
    expect(response.statusCode).toBe(200);
    expect(getData()).toHaveLength(totalQty);
    expect(response.body).toHaveLength(totalQty);

    const arr = response.body;

    expect(
      isArraySorted<CarType>(arr, ({ price: A }, { price: B }) => A - B)
    ).toBe(true);
  });
  it("should return car list sorted by year and price desc", async () => {
    const response = await request(app).get(
      "/carshop/cars?sort=production_year,-price"
    );
    expect(response.statusCode).toBe(200);
    expect(getData()).toHaveLength(totalQty);
    expect(response.body).toHaveLength(totalQty);

    const arr = response.body;

    expect(
      isArraySorted<CarType>(
        arr,
        (
          { price: pA, production_year: yA },
          { price: pB, production_year: yB }
        ) => (yA - yB < 0 ? -1 : yA == yB ? pB - pA : 1)
      )
    ).toBe(true);
  });

  it("should return error Invalid sort query", async () => {
    const response = await request(app).get(
      "/carshop/cars?sort=price,yye,-name"
    );
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("Invalid sort query");
  });
});

describe("fetch car by id", () => {
  const totalQty = 5;
  const getData = useMongoMemoryServer(() => fillDB(totalQty));
  it("should return car", async () => {
    const response = await request(app).get("/carshop/cars");
    expect(response.statusCode).toBe(200);
    const carId: string = response.body[2].id;
    expect(carId.length).toBeGreaterThan(1);
    const { body: car } = await request(app).get(`/carshop/cars/${carId}`);
    expect(car).toHaveProperty("name");
    expect(car).toStrictEqual(response.body[2]);
  });
  it("should return error invalid carId", async () => {
    const {
      statusCode,
      body: { error },
    } = await request(app).get(`/carshop/cars/${"63a736f204481a5b638000cc"}`);
    expect(statusCode).toBe(404);
    expect(error).toBe("Not found");
  });
});

describe("remove car", () => {
  const totalQty = 5;
  const getData = useMongoMemoryServer(() => fillDB(totalQty));
  it("should return removed carId", async () => {
    const response = await request(app).get("/carshop/cars");
    expect(response.statusCode).toBe(200);
    const carId: string = response.body[2].id;
    expect(carId.length).toBeGreaterThan(1);
    const {
      body: { removedCarId },
    } = await request(app).delete(`/carshop/cars/${carId}`);
    expect(removedCarId).toBe(carId);

    const { body: carsAfterDelete } = await request(app).get("/carshop/cars");
    expect(carsAfterDelete).toHaveLength(4);
    expect(
      !carsAfterDelete.find(({ id }: { id: string }) => id === carId)
    ).toBe(true);
  });
  it("should return error invalid carId", async () => {
    const {
      statusCode,
      body: { error },
    } = await request(app).delete(
      `/carshop/cars/${"63a736f204481a5b638000cc"}`
    );
    expect(statusCode).toBe(404);
    expect(error).toBe("Not found");
  });
});

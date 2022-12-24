import { parseSortStr } from "../../src/ulils/queryStringParser";

describe("query string", () => {
  it("should return search object", () => {
    expect(parseSortStr("+price")).toStrictEqual([["price", 1]]);
  });

  it("should return search object", () => {
    expect(parseSortStr("+price,-name,production_year")).toStrictEqual([
      ["price", 1],
      ["name", -1],
      ["production_year", 1],
    ]);
  });
  it("should return search object", () => {
    expect(parseSortStr("production_year,-price")).toStrictEqual([
      ["production_year", 1],
      ["price", -1],
    ]);
  });
  it("should return error", () => {
    expect(() => parseSortStr("invalid_value,-price")).toThrowError();
  });
});

import { parseSortStr } from "../../ulils/queryStringParser";

describe("query string", () => {
  it("should return search object", () => {
    expect(parseSortStr("+price,-name,year")).toStrictEqual([
      ["price", 1],
      ["name", -1],
      ["year", 1],
    ]);
  });
});

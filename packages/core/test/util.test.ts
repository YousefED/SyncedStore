import { filterArray } from "../src/util";

describe("util", () => {
  it("filters arrays", () => {
    let array = [0, 1, 2, 3];
    filterArray(array, el => el % 2 === 0);
    expect(array).toEqual([0, 2]);
  });
});

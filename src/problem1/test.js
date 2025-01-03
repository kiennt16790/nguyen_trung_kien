import { sumToN, sumToNReduce, sumToNRecursive } from "./index";

// write test with jest
describe("sumToN", () => {
  it("should throw error for input less than 0", () => {
    expect(() => sumToN(-1)).toThrow("Input must be a positive integer");
    expect(() => sumToNReduce(-1)).toThrow("Input must be a positive integer");
    expect(() => sumToNRecursive(-1)).toThrow("Input must be a positive integer");
  });
  it("should return 0 for input 0", () => {
    expect(sumToN(0)).toBe(0);
    expect(sumToNReduce(0)).toBe(0);
    expect(sumToNRecursive(0)).toBe(0);
  });
  it("should return 1 for input 1", () => {
    expect(sumToN(1)).toBe(1);
    expect(sumToNReduce(1)).toBe(1);
    expect(sumToNRecursive(1)).toBe(1);
  });
  it("should return 15 for input 5", () => {
    expect(sumToN(5)).toBe(15);
    expect(sumToNReduce(5)).toBe(15);
    expect(sumToNRecursive(5)).toBe(15);
  });

  it("should return 50005000 for input 10000", () => {
    expect(sumToN(10000)).toBe(50005000);
    expect(sumToNReduce(10000)).toBe(50005000);
    expect(sumToNRecursive(10000)).toBe(50005000);
  });
});

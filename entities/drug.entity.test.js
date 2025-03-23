import { Drug } from "./drug.entity";

describe("Drug", () => {
  it("should create a drug with the given name, expiresIn, and benefit", () => {
    const name = "Test Drug";
    const expiresIn = 10;
    const benefit = 20;

    const drug = new Drug(name, expiresIn, benefit);

    expect(drug.name).toBe(name);
    expect(drug.expiresIn).toBe(expiresIn);
    expect(drug.benefit).toBe(benefit);
  });

  it("should allow setting of name, expiresIn, and benefit through constructor", () => {
    const drug = new Drug("Test Drug", 10, 20);
    expect(drug.name).toBe("Test Drug");
    expect(drug.expiresIn).toBe(10);
    expect(drug.benefit).toBe(20);
  });
});

import { Pharmacy } from "./pharmacy";

import { Drug } from "./entities/drug.entity";

import {
  HERBAL_TEA,
  FERVEX,
  MAGIC_PILL,
  DAFALGAN,
  DAFALGAN_DEGRADE_RATE,
  DEGRADE_RATE_AFTER_EXPIRATION,
  INCREASE_RATE_AFTER_EXPIRATION,
} from "./shared/constants";

describe("Pharmacy", () => {
  it("should update benefit value of a normal drug", () => {
    const drug = new Drug("Normal Drug", 2, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(9);
    expect(drug.expiresIn).toBe(1);
  });

  it("should decrease benefit twice as fast when expired (normal drug)", () => {
    const drug = new Drug("Normal Drug", -1, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(10 - DEGRADE_RATE_AFTER_EXPIRATION);
  });

  it("should not decrease benefit below 0 (normal drug)", () => {
    const drug = new Drug("Normal Drug", 2, 0);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(0);
  });

  it("should update benefit value of Herbal Tea", () => {
    const drug = new Drug(HERBAL_TEA, 2, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(11);
    expect(drug.expiresIn).toBe(1);
  });

  it("should increase benefit of Herbal Tea twice as fast when expired", () => {
    const drug = new Drug(HERBAL_TEA, -1, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(10 + INCREASE_RATE_AFTER_EXPIRATION);
  });

  it("should not increase benefit above 50 (Herbal Tea)", () => {
    const drug = new Drug(HERBAL_TEA, 2, 50);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(50);
  });

  it("should update benefit value of Fervex", () => {
    const drug = new Drug(FERVEX, 5, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(13);
    expect(drug.expiresIn).toBe(4);
  });

  it("should increase Fervex benefit by 2 when expiresIn < 11", () => {
    const drug = new Drug(FERVEX, 10, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(12);
  });

  it("should increase Fervex benefit by 3 when expiresIn < 6", () => {
    const drug = new Drug(FERVEX, 5, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(13);
  });

  it("should drop Fervex benefit to 0 when expired", () => {
    const drug = new Drug(FERVEX, -1, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(0);
    expect(drug.expiresIn).toBe(-2);
  });

  it("should not change benefit or expiresIn of Magic Pill", () => {
    const drug = new Drug(MAGIC_PILL, 2, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(10);
    expect(drug.expiresIn).toBe(2);
  });

  it("should handle multiple drugs", () => {
    const herbalTea = new Drug(HERBAL_TEA, 2, 10);
    const normalDrug = new Drug("Normal Drug", 2, 10);
    const fervex = new Drug(FERVEX, 5, 10);
    const pharmacy = new Pharmacy([herbalTea, normalDrug, fervex]);
    pharmacy.updateBenefitValue();
    expect(herbalTea.benefit).toBe(11);
    expect(normalDrug.benefit).toBe(9);
    expect(fervex.benefit).toBe(13);
  });

  it("should limit benefit to 50", () => {
    const drug = new Drug(HERBAL_TEA, 2, 49);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(50);

    drug.benefit = 50;
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(50);
  });

  it("should decrease normal drug benefit correctly when expired", () => {
    const drug = new Drug("Normal Drug", -1, 2);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(0);
  });

  it("should handle Fervex benefit correctly when benefit is near the limit", () => {
    const drug = new Drug(FERVEX, 5, 48);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(50);
  });

  it("should update benefit value of Dafalgan", () => {
    const drug = new Drug(DAFALGAN, 2, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(10 - DAFALGAN_DEGRADE_RATE);
    expect(drug.expiresIn).toBe(1);
  });

  it("should not decrease benefit below 0 (Dafalgan)", () => {
    const drug = new Drug(DAFALGAN, 2, 1);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(0);
  });

  it("should update Dafalgan benefit value with expiration", () => {
    const drug = new Drug(DAFALGAN, -1, 10);
    const pharmacy = new Pharmacy([drug]);
    pharmacy.updateBenefitValue();
    expect(drug.benefit).toBe(10 - DAFALGAN_DEGRADE_RATE);
  });
});

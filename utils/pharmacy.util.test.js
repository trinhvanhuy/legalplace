import { PharmacyUtil } from "./pharmacy.util";
import {
  HERBAL_TEA,
  FERVEX,
  MAGIC_PILL,
  DAFALGAN,
  DAFALGAN_DEGRADE_RATE,
  DEGRADE_RATE_AFTER_EXPIRATION,
  LIMIT_BENEFIT,
  INCREASE_RATE_AFTER_EXPIRATION,
} from "../shared/constants";

describe("PharmacyUtil", () => {
  describe("updateDrugBenefit", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should call updateHerbalTeaBenefit for herbal tea", () => {
      const drug = { name: HERBAL_TEA, expiresIn: 5, benefit: 10 };
      const updateHerbalTeaBenefit = jest.spyOn(
        PharmacyUtil,
        "updateHerbalTeaBenefit",
      );
      PharmacyUtil.updateDrugBenefit(drug);
      expect(updateHerbalTeaBenefit).toHaveBeenCalledWith(drug);
    });

    it("should call updateFervexBenefit for fervex", () => {
      const drug = { name: FERVEX, expiresIn: 5, benefit: 10 };
      const updateFervexBenefit = jest.spyOn(
        PharmacyUtil,
        "updateFervexBenefit",
      );
      PharmacyUtil.updateDrugBenefit(drug);
      expect(updateFervexBenefit).toHaveBeenCalledWith(drug);
    });

    it("should call updateDafalganBenefit for dafalgan", () => {
      const drug = { name: DAFALGAN, expiresIn: 5, benefit: 10 };
      const updateDafalganBenefit = jest.spyOn(
        PharmacyUtil,
        "updateDafalganBenefit",
      );
      PharmacyUtil.updateDrugBenefit(drug);
      expect(updateDafalganBenefit).toHaveBeenCalledWith(drug);
    });

    it("should call updateNormalDrugBenefit for normal drugs", () => {
      const drug = { name: "Normal Drug", expiresIn: 5, benefit: 10 };
      const updateNormalDrugBenefit = jest.spyOn(
        PharmacyUtil,
        "updateNormalDrugBenefit",
      );
      PharmacyUtil.updateDrugBenefit(drug);
      expect(updateNormalDrugBenefit).toHaveBeenCalledWith(drug);
    });

    it("should not call updateNormalDrugBenefit for magic pill", () => {
      const drug = { name: MAGIC_PILL, expiresIn: 5, benefit: 10 };
      const updateNormalDrugBenefit = jest.spyOn(
        PharmacyUtil,
        "updateNormalDrugBenefit",
      );
      PharmacyUtil.updateDrugBenefit(drug);
      expect(updateNormalDrugBenefit).not.toHaveBeenCalled();
    });
  });

  describe("updateNormalDrugBenefit", () => {
    it("should decrease benefit by 1 when expires in is positive", () => {
      const drug = { name: "Normal Drug", expiresIn: 5, benefit: 10 };
      PharmacyUtil.updateNormalDrugBenefit(drug);
      expect(drug.benefit).toBe(9);
    });

    it("should decrease benefit by DEGRADE_RATE_AFTER_EXPIRATION when expires in is negative", () => {
      const drug = {
        name: "Normal Drug",
        expiresIn: -1,
        benefit: 10,
      };
      PharmacyUtil.updateNormalDrugBenefit(drug);
      expect(drug.benefit).toBe(10 - DEGRADE_RATE_AFTER_EXPIRATION);
    });

    it("should not decrease benefit below 0", () => {
      const drug = { name: "Normal Drug", expiresIn: 5, benefit: 0 };
      PharmacyUtil.updateNormalDrugBenefit(drug);
      expect(drug.benefit).toBe(0);
    });
  });

  describe("updateHerbalTeaBenefit", () => {
    it("should increase benefit by 1 when expires in is positive", () => {
      const drug = { name: HERBAL_TEA, expiresIn: 5, benefit: 10 };
      PharmacyUtil.updateHerbalTeaBenefit(drug);
      expect(drug.benefit).toBe(11);
    });

    it("should increase benefit by INCREASE_RATE_AFTER_EXPIRATION when expires in is negative", () => {
      const drug = {
        name: HERBAL_TEA,
        expiresIn: -1,
        benefit: 10,
      };
      PharmacyUtil.updateHerbalTeaBenefit(drug);
      expect(drug.benefit).toBe(10 + INCREASE_RATE_AFTER_EXPIRATION);
    });

    it("should not increase benefit above LIMIT_BENEFIT", () => {
      const drug = { name: HERBAL_TEA, expiresIn: 5, benefit: LIMIT_BENEFIT };
      PharmacyUtil.updateHerbalTeaBenefit(drug);
      expect(drug.benefit).toBe(LIMIT_BENEFIT);
    });
  });

  describe("updateFervexBenefit", () => {
    it("should set benefit to 0 when expires in is negative", () => {
      const drug = { name: FERVEX, expiresIn: -1, benefit: 10 };
      PharmacyUtil.updateFervexBenefit(drug);
      expect(drug.benefit).toBe(0);
    });

    it("should increase benefit by 1 when expires in is greater than 10", () => {
      const drug = { name: FERVEX, expiresIn: 11, benefit: 10 };
      PharmacyUtil.updateFervexBenefit(drug);
      expect(drug.benefit).toBe(11);
    });

    it("should increase benefit by 2 when expires in is between 6 and 10", () => {
      const drug = { name: FERVEX, expiresIn: 10, benefit: 10 };
      PharmacyUtil.updateFervexBenefit(drug);
      expect(drug.benefit).toBe(12);
    });

    it("should increase benefit by 3 when expires in is between 0 and 5", () => {
      const drug = { name: FERVEX, expiresIn: 5, benefit: 10 };
      PharmacyUtil.updateFervexBenefit(drug);
      expect(drug.benefit).toBe(13);
    });

    it("should not increase benefit above LIMIT_BENEFIT", () => {
      const drug = { name: FERVEX, expiresIn: 5, benefit: LIMIT_BENEFIT - 1 };
      PharmacyUtil.updateFervexBenefit(drug);
      expect(drug.benefit).toBe(LIMIT_BENEFIT);
    });
  });

  describe("updateDafalganBenefit", () => {
    it("should decrease benefit by DAFALGAN_DEGRADE_RATE", () => {
      const drug = { name: DAFALGAN, expiresIn: 5, benefit: 10 };
      PharmacyUtil.updateDafalganBenefit(drug);
      expect(drug.benefit).toBe(10 - DAFALGAN_DEGRADE_RATE);
    });

    it("should not decrease benefit below 0", () => {
      const drug = { name: DAFALGAN, expiresIn: 5, benefit: 0 };
      PharmacyUtil.updateDafalganBenefit(drug);
      expect(drug.benefit).toBe(0);
    });
  });

  describe("updateDrugExpiration", () => {
    it("should decrease expires in by 1 for non-magic pill drugs", () => {
      const drug = { name: "Normal Drug", expiresIn: 5, benefit: 10 };
      PharmacyUtil.updateDrugExpiration(drug);
      expect(drug.expiresIn).toBe(4);
    });

    it("should not decrease expires in for magic pill drugs", () => {
      const drug = { name: MAGIC_PILL, expiresIn: 5, benefit: 10 };
      PharmacyUtil.updateDrugExpiration(drug);
      expect(drug.expiresIn).toBe(5);
    });
  });

  describe("increaseBenefit", () => {
    it("should increase benefit by the given rate", () => {
      expect(PharmacyUtil.increaseBenefit(5, 2)).toBe(7);
    });

    it("should not increase benefit above LIMIT_BENEFIT", () => {
      expect(PharmacyUtil.increaseBenefit(LIMIT_BENEFIT, 2)).toBe(
        LIMIT_BENEFIT,
      );
    });

    it("should increase benefit by 1 if no rate is provided", () => {
      expect(PharmacyUtil.increaseBenefit(5)).toBe(6);
    });
  });

  describe("decreaseBenefit", () => {
    it("should decrease benefit by the given rate", () => {
      expect(PharmacyUtil.decreaseBenefit(5, 2)).toBe(3);
    });

    it("should not decrease benefit below 0", () => {
      expect(PharmacyUtil.decreaseBenefit(0, 2)).toBe(0);
    });

    it("should decrease benefit by 1 if no rate is provided", () => {
      expect(PharmacyUtil.decreaseBenefit(5)).toBe(4);
    });
  });
});

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export const LIMIT_BENEFIT = 50;
export const HERBAL_TEA = "Herbal Tea";
export const FERVEX = "Fervex";
export const MAGIC_PILL = "Magic Pill";

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      Pharmacy.updateDrugBenefit(drug);
      Pharmacy.updateDrugExpiration(drug);
      Pharmacy.handleExpiredDrug(drug);
    }

    return this.drugs;
  }

  static updateDrugBenefit(drug) {
    if (drug.name !== HERBAL_TEA && drug.name !== FERVEX) {
      if (drug.benefit > 0 && drug.name !== MAGIC_PILL) {
        drug.benefit = Pharmacy.decreaseBenefit(drug.benefit);
      }
    } else {
      if (drug.benefit < LIMIT_BENEFIT) {
        drug.benefit = Pharmacy.increaseBenefit(drug.benefit);
        if (drug.name === FERVEX) {
          if (drug.expiresIn < 11) {
            drug.benefit = Pharmacy.increaseBenefit(drug.benefit);
          }
          if (drug.expiresIn < 6) {
            drug.benefit = Pharmacy.increaseBenefit(drug.benefit);
          }
        }
      }
    }
  }

  static updateDrugExpiration(drug) {
    if (drug.name !== MAGIC_PILL) {
      drug.expiresIn--;
    }
  }

  static handleExpiredDrug(drug) {
    if (drug.expiresIn < 0) {
      if (drug.name !== HERBAL_TEA) {
        if (drug.name !== FERVEX) {
          if (drug.benefit > 0 && drug.name !== MAGIC_PILL) {
            drug.benefit = Pharmacy.decreaseBenefit(drug.benefit);
          }
        } else {
          drug.benefit = 0; // Benefit drops to 0
        }
      } else {
        drug.benefit = Pharmacy.increaseBenefit(drug.benefit);
      }
    }
  }

  static increaseBenefit(benefit) {
    return Math.min(LIMIT_BENEFIT, benefit + 1); // Benefit cannot exceed 50
  }

  static decreaseBenefit(benefit) {
    return Math.max(0, benefit - 1); // Benefit cannot be negative
  }
}

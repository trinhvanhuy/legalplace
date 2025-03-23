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
export const DAFALGAN = "Dafalgan";
export const DAFALGAN_DEGRADE_RATE = 2; // Degrades twice as fast as normal drugs

export const DEGRADE_RATE_AFTER_EXPIRATION = 2; // Degrades twice as fast after expiration
export const INCREASE_RATE_AFTER_EXPIRATION = 2; // Increases twice as fast after expiration

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      Pharmacy.updateDrugBenefit(drug);
      Pharmacy.updateDrugExpiration(drug);
    }

    return this.drugs;
  }

  static updateDrugBenefit(drug) {
    if (drug.name === HERBAL_TEA) {
      Pharmacy.updateHerbalTeaBenefit(drug);
    } else if (drug.name === FERVEX) {
      Pharmacy.updateFervexBenefit(drug);
    } else if (drug.name === DAFALGAN) {
      Pharmacy.updateDafalganBenefit(drug);
    } else if (drug.name !== MAGIC_PILL) {
      Pharmacy.updateNormalDrugBenefit(drug);
    }
  }

  static updateNormalDrugBenefit(drug) {
    let degradeRate = 1;
    if (drug.expiresIn < 0) {
      degradeRate = DEGRADE_RATE_AFTER_EXPIRATION; // Degrades twice as fast after expiration
    }
    drug.benefit = Pharmacy.decreaseBenefit(drug.benefit, degradeRate);
  }

  static updateHerbalTeaBenefit(drug) {
    let increaseRate = 1;
    if (drug.expiresIn < 0) {
      increaseRate = INCREASE_RATE_AFTER_EXPIRATION; // Increases twice as fast after expiration
    }
    drug.benefit = Pharmacy.increaseBenefit(drug.benefit, increaseRate);
  }

  static updateFervexBenefit(drug) {
    if (drug.expiresIn < 0) {
      drug.benefit = 0;
      return;
    }

    let increaseRate = 1;
    if (drug.expiresIn < 6) {
      increaseRate = 3;
    } else if (drug.expiresIn < 11) {
      increaseRate = 2;
    }

    drug.benefit = Pharmacy.increaseBenefit(drug.benefit, increaseRate);
  }

  static updateDafalganBenefit(drug) {
    drug.benefit = Pharmacy.decreaseBenefit(
      drug.benefit,
      DAFALGAN_DEGRADE_RATE,
    );
  }

  static updateDrugExpiration(drug) {
    if (drug.name !== MAGIC_PILL) {
      drug.expiresIn--;
    }
  }

  static increaseBenefit(benefit, rate = 1) {
    return Math.min(LIMIT_BENEFIT, benefit + rate);
  }

  static decreaseBenefit(benefit, rate = 1) {
    return Math.max(0, benefit - rate);
  }
}

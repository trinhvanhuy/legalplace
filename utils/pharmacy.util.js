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

export class PharmacyUtil {
  static updateDrugBenefit(drug) {
    if (drug.name === HERBAL_TEA) {
      PharmacyUtil.updateHerbalTeaBenefit(drug);
    } else if (drug.name === FERVEX) {
      PharmacyUtil.updateFervexBenefit(drug);
    } else if (drug.name === DAFALGAN) {
      PharmacyUtil.updateDafalganBenefit(drug);
    } else if (drug.name !== MAGIC_PILL) {
      PharmacyUtil.updateNormalDrugBenefit(drug);
    }
  }

  static updateNormalDrugBenefit(drug) {
    let degradeRate = 1;
    if (drug.expiresIn < 0) {
      degradeRate = DEGRADE_RATE_AFTER_EXPIRATION; // Degrades twice as fast after expiration
    }
    drug.benefit = PharmacyUtil.decreaseBenefit(drug.benefit, degradeRate);
  }

  static updateHerbalTeaBenefit(drug) {
    let increaseRate = 1;
    if (drug.expiresIn < 0) {
      increaseRate = INCREASE_RATE_AFTER_EXPIRATION; // Increases twice as fast after expiration
    }
    drug.benefit = PharmacyUtil.increaseBenefit(drug.benefit, increaseRate);
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

    drug.benefit = PharmacyUtil.increaseBenefit(drug.benefit, increaseRate);
  }

  static updateDafalganBenefit(drug) {
    drug.benefit = PharmacyUtil.decreaseBenefit(
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

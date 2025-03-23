import { PharmacyUtil } from "./utils/pharmacy.util";

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      PharmacyUtil.updateDrugBenefit(drug);
      PharmacyUtil.updateDrugExpiration(drug);
    }
    return this.drugs;
  }
}

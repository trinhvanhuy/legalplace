## ATTENTION!

⚠️⚠️⚠️ **IMPORTANT NOTE ABOUT BRANCHING** ⚠️⚠️⚠️

**IN A REAL PROJECT, I WOULD *NEVER* PUSH DIRECTLY TO THE `master` (or `main`) BRANCH!**

The proper workflow is to create a *feature branch* for each set of changes, test the changes thoroughly, and then submit a pull request for review.  This allows for collaboration, code review, and prevents breaking the main branch.

**HOWEVER,** in this *isolated test scenario*, there's only one developer (me!), and only one straightforward feature to implement.  Therefore, I've made a **BAD EXCEPTION** and pushed directly to `master`.

**DO NOT EMULATE THIS WORKFLOW IN A REAL-WORLD PROJECT!**  Always use feature branches, pull requests, and code review to ensure quality and collaboration.

This decision was solely made to simplify the process for this specific exercise.


## Features

*   **Drug Types:**
    *   Normal Drugs: Benefit degrades over time, degrading twice as fast after the expiration date.
    *   Herbal Tea: Benefit increases over time, increasing twice as fast after the expiration date.
    *   Fervex: Benefit increases as the expiration date approaches: +1 normally, +2 when expiresIn < 11, +3 when expiresIn < 6. Benefit drops to 0 after the expiration date.
    *   Magic Pill: Benefit and expiration date never change.
    *   Dafalgan: Benefit degrades twice as fast as normal drugs.
*   **Benefit Limits:** The benefit of a drug is never negative and never exceeds 50.
*   **Expiration Handling:** Correctly manages benefit updates based on expiration dates.
*   **Constants:** Uses constants for drug names, benefit limits, and degradation/increase rates for maintainability.

## Code Structure

*   **`Drug` Class:** Represents a drug with properties for name, expiration date, and benefit.
*   **`Pharmacy` Class:** Contains a list of drugs and methods for updating their benefit values.
    *   **`updateBenefitValue()`:** Iterates through all drugs and calls `PharmacyUtil.updateDrugBenefit` and `PharmacyUtil.updateDrugExpiration`.
*   **`PharmacyUtil` Class:** Contains methods for updating their benefit values.
    *   **`updateDrugBenefit()`:** Uses a strategy pattern to update the benefit based on the drug type:
        *   `updateNormalDrugBenefit()`
        *   `updateHerbalTeaBenefit()`
        *   `updateFervexBenefit()`
        *   `updateDafalganBenefit()`
    *   **`updateDrugExpiration()`:** Decreases the expiration date for all drugs except "Magic Pill".
    *   **`increaseBenefit()` and `decreaseBenefit()`:** Helper methods to increase or decrease the benefit while respecting the benefit limits.
*   **Constants:** Defines constants for drug names (`HERBAL_TEA`, `FERVEX`, `MAGIC_PILL`, `DAFALGAN`), benefit limit (`LIMIT_BENEFIT`), and degradation/increase rates.

## Unit Tests

A comprehensive suite of unit tests is included to ensure the correctness of the benefit update logic.  The tests cover:

*   All drug types.
*   Expiration scenarios (before and after expiration).
*   Boundary conditions (benefit limits).
*   Specific business rules for each drug type.

Tests ensure each type of Drug is treated correctly, and they check behavior under edge cases.

Run the tests by running `npm run test`.

## Installation

1.  Clone the repository.
2.  Install the dependencies: `npm install`
3.  Run the tests: `npm test`

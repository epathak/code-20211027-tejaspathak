import { BmiInput, BmiOutput } from "./bmi.models";

/**
 * Framework independent implementation of services.
 * @export
 * @class BmiModule
 */
export class BmiModule {

  /**
   *Creates an instance of BmiModule.
   * @memberof BmiModule
   */
  constructor() {
    
  }
  /**
   * Returns BMI result in standard api response format: status-code and data.
   * @returns
   * @memberof BmiModule
   */
  getBmiDetails(params: any) {
    const result = params.body.map((record: BmiInput) => {
      const bmi = computeBmi(record.WeightKg, (record.HeightCm / 100));
      const [bmiCategory, healthRisk] = computeBmiCategoryAndHealthRisk(bmi);
      return {
        ...record,
        BMI: bmi,
        BMICategory: bmiCategory,
        HealthRisk: healthRisk
      };
    });
    return { status: 200, data: result };
  }

}

/**
 * A general purpose function which returns the BMI.
 * Todo: Could be moved later to a library for reuse.
 * @param {number} weight
 * @param {number} height
 * @returns {number}
 */
function computeBmi(weight:number, height:number):number {
  return  weight / ( height ** 2);
}

/**
 * A general purpose function which returns the BMI related parameters.
 * Todo: Could be moved later to a library for reuse.
 * @param {number} bmi
 * @returns {string[]}
 */
function computeBmiCategoryAndHealthRisk(bmi: number): string[] {
  if (bmi < 18.5) { return ['Underweight', 'Malnutrition risk']; }
  if (bmi >= 18.5 && bmi < 25) { return ['Normal weight', 'Low risk']; }
  if (bmi >= 25 && bmi < 30) { return ['Overweight', 'Enhanced risk']; }
  if (bmi >= 30 && bmi < 35) { return ['Moderately obese', 'Medium risk']; }
  if (bmi >= 35 && bmi < 40) { return ['Severely obese', 'High risk']; }
  return ['Very severely obese', 'Very high risk'];
}
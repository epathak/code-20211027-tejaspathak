/**
 * The model of input record for API
 * @export
 * @interface BmiInput
 */
export interface BmiInput {
  Gender: string;
  HeightCm: number;
  WeightKg: number;
}

/**
 * The model of output record for API
 * @export
 * @interface BmiOutput
 */
export interface BmiOutput {
  Gender: string;
  HeightCm: number;
  WeightKg: number;
  BMI: number;
  BMICategory: string;
  HealthRisk: string;
}
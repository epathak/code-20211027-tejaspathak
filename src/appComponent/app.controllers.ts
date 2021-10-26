import { BmiModule } from "../bmiComponent/bmi.module";
import { BmiController } from "../bmiComponent/bmi.controller";
import { Controller } from "./app.models";

/** A single point for defining all sub-applications. */
const appControllers: Controller[] = [
  new BmiController(new BmiModule())
];

export default appControllers;
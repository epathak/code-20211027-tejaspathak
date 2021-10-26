import express, { Router, Request, Response } from "express";
import { BmiModule } from "./bmi.module";

/**
 * This bmi controller uses a route configuration to map routes to services.
 * Sample module is generic here, and has no dependencies on express, isolating buisness logic.
 * @export
 * @class BmiController
 */
export class BmiController {
  /**
   * The root mount path for all the routes of the module(sub-application)
   * @type {string}
   * @memberof BmiController
   */
  public path: string;
  /**
   * The router object for holding all the routes to services of the module.
   * @type {Router}
   * @memberof BmiController
   */
  public router: Router;

  /**
   * Creates an instance of BmiController.
   * @param {BmiModule} bmiModule Set of services which can be mapped to routes.
   * @memberof BmiController
   */
  constructor(bmiModule: BmiModule) {
    this.path = '/bmi';
    this.router = Router();

    const configs = [
      { method: 'post', route: '/', handler: bmiModule.getBmiDetails }
    ];

    configs.forEach((config: any) => {
      (this.router as any)[config.method](config.route, async (req: any, res: any) => {
        const requestDetails = parseExpressRequest(req);
        const { status, data } = await config.handler(requestDetails);

        res.status(status).send(data);
      })
    })
  }
}

/**
 * This function converts an express request into a generic object.
 * @param {Request} req
 * @returns
 */
function parseExpressRequest(req: any) {
  return {
    headers: req.headers,
    path: req.params,
    query: req.query,
    body: req.body
  };
}
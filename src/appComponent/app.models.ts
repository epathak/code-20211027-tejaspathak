import { Router } from "express";

/**
 * The interface which models a controller for all sub-applications.
 * @export
 * @interface Controller
 */
export interface Controller{
  /**
   * The root mount path for all the routes of the module(sub-application)
   * @type {string}
   * @memberof Controller
   */
  path: string;
  /**
   * The router object for holding all the routes to services of the module.
   * @type {Router}
   * @memberof Controller
   */
  router: Router;
}
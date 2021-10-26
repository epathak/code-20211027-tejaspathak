/**
 * Framework independent implementation of services.
 * @export
 * @class BmiModule
 */
export class BmiModule {

  /**
   * Returns result in standard api response format: status-code and data.
   * @returns
   * @memberof BmiModule
   */
  sayHelloWorld() {
    return { status: 200, data: 'Hello World!' };
  }

}
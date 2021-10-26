import * as http from 'http';
import * as path from 'path';
import express from 'express';
import compression from 'compression';
import { log } from '../logComponent/log.module';
import { STATIC_FILES_PATH } from '../config';
import { Controller } from './app.models';

/**
 * The AppModule acts as an entrypoint as well as encapsulates express app specifics.
 * Apart from mounting api routes also provides basic support for serving static files.
 * @export
 * @class AppModule
 */
export class AppModule {
  /**
   * The variable that holds the express application.
   * @private
   * @type {express.Application}
   * @memberof AppModule
   */
  private readonly app: express.Application;
  /**
   * The variable that holds the base mount path for api routes.
   * @private
   * @type {string}
   * @memberof AppModule
   */
  private readonly path: string;
  /**
   * The variable that holds the instance of application through its lifecycle.
   * @private
   * @type {http.Server}
   * @memberof AppModule
   */
  private server!: http.Server;

  /**
   * Creates an instance of AppModule.
   * @param {Controller[]} controllers Each controller contains a subapp(sub route)
   * @memberof AppModule
   */
  constructor(controllers: Controller[]) {
    this.app = express();
    this.path = '/api';

    this.initialiseMiddleware();
    this.initialiseControllers(controllers)
  }

  /**
   * Does what it says, mounts standard middleware.
   * @memberof AppModule
   */
  initialiseMiddleware() {
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: '32mb' }));
  }

  /**
   * Does what it says, mounts controllers(sub-applications).
   * @memberof AppModule
   */
  initialiseControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      const route = `${this.path}${controller.path}`;

      this.app.use(route, controller.router);
      log(`Route registered: ${route}`, 'INFO');
    })

    this.app.get('/health', (req: express.Request, res: express.Response) => res.status(200).end());
    this.app.use('/', express.static(path.join(__dirname, '..', '..', STATIC_FILES_PATH)));
  }

  /**
   * Instantiates the server and begins listening for requests.
   * @returns instance of app
   * @memberof AppModule
   */
  start() {
    this.server = this.app.listen(process.env.PORT, () => {
      log(`The server is listening @ http://localhost:${process.env.PORT}`);
    });
    return this.server;
  }

  /**
   * Primarily used during testing, isused to stop server.
   * @returns instance of app
   * @memberof AppModule
   */
  stop() {
    log(`The server is being closed...`);
    return this.server.close();
  }
}

import * as path from 'path';
import * as fs from 'fs';
import { ENV_FILE_PATH } from './config';
import { AppModule } from './appComponent/app.module';
import appControllers from './appComponent/app.controllers';
import { log } from './logComponent/log.module';

/** Call the function to initialize environment before any other action in application. */
initialiseEnvironment();

/** Create and start the server(instance of application module). */
const server = new AppModule(appControllers);
server.start();

/**
 * This function acts as a bootstrapper for preparing environment for application.
 * Also loads the env for local development using json file path imported from config file.
 */
function initialiseEnvironment(): void {
  if (process.env.NODE_ENV !== 'production') {
    loadEnvFromJsonFile(path.join(__dirname, '..', ENV_FILE_PATH));
  };
}

/**
 * Reads the JSON from file and loads its variables in the environment.
 * Uses a helper function for reading JSON file.
 * @param {string} filePath path of the environment file.
 */
function loadEnvFromJsonFile(filePath: string): void {
  const envJson: object = safeReadJsonFile(filePath);
  if (envJson) { Object.keys(envJson).forEach((key: string) => process.env[key] = envJson[key as keyof object]); }
}

/**
 * This function provides resilience if a file is not in JSON syntax.
 * Also handles the file read related errors like "file does not exist".
 * @param {string} filePathpath of the environment file.
 * @returns
 */
function safeReadJsonFile(filePath: string): any {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    log(`${error}`, 'ERROR');
    return;
  }
}
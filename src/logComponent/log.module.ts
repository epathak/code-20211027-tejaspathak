/**
 * A custom logger with basic support for log levels.
 * Log level is also configurable via an environment variable.
 * @export
 * @class LogComponent
 */
export default class LogComponent {
  /**
   * The default system log levels available for logging within application.
   * @private
   * @memberof LogComponent
   */
  private readonly logLevels = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];
  /**
   * A log level to be used by default if not set via environment variable.
   * @private
   * @memberof LogComponent
   */
  private readonly defaultLogLevel = 'ERROR';
  /**
   * A variable that holds the configured system log level.
   * @private
   * @memberof LogComponent
   */
  private readonly sysLogLevel;

  /**
   *Creates an instance of LogComponent.
   * @memberof LogComponent
   */
  constructor() {
    this.sysLogLevel = process.env.LOG_LEVEL || this.defaultLogLevel;
  }

  /**
   * Primary logging function to be called from other modules, uses sensible defaults.
   * @param {string} logMessage
   * @param {string} [msgLogLevel='ERROR']
   * @param {*} [logTime=new Date().toISOString()]
   * @memberof LogComponent
   */
  log(logMessage: string, msgLogLevel = 'ERROR', logTime = new Date().toISOString()) {
    if (this.logLevels.indexOf(msgLogLevel) <= this.logLevels.indexOf(this.sysLogLevel)) {

      if (this.sysLogLevel === 'TRACE') { console.trace(`${logTime} - ${logMessage}`); }
      else { (console as any)[msgLogLevel.toLowerCase()](`${logTime} - ${logMessage}`); }
      
    }
  }

}

/** The instance of log component which is used like singleton(single object is created ever) */
const logComponent = new LogComponent();
/** The instance of log component's log function which is exported for use in other modules */
export const log = logComponent.log.bind(logComponent);

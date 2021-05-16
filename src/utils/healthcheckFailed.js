const core = require("@actions/core");
const { rollback } = require("../heroku/rollback");

export const healthcheckFailed = (config) => {
  const { rollbackonhealthcheckfailed } = config;

  if (rollbackonhealthcheckfailed) {
    const { app_name, appdir } = config

    rollback(app_name, appdir);
  } else {
    const message = "Health Check Failed. Error deploying Server. Please check your logs on Heroku to try and diagnose the problem";

    core.setFailed(message);
  }
};

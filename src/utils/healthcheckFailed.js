const core = require("@actions/core");
const { execSync } = require("child_process");

const rollback = (app_name, appdir) => {
  const command = `heroku rollback --app ${app_name}`;
  const options = appdir ? { cwd: appdir } : null;

  execSync(command, options);

  const message = "Health Check Failed. Error deploying Server. Deployment has been rolled back. Please check your logs on Heroku to try and diagnose the problem";

  core.setFailed(message);
};

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

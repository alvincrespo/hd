const { execSync } = require("child_process");

export const rollback = (app_name, appdir) => {
  const command = `heroku rollback --app ${app_name}`;
  const options = appdir ? { cwd: appdir } : null;

  execSync(command, options);

  const message = "Health Check Failed. Error deploying Server. Deployment has been rolled back. Please check your logs on Heroku to try and diagnose the problem";

  core.setFailed(message);
};

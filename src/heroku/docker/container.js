const { execSync } = require("child_process");

export const push = (dockerHerokuProcessType, dockerBuildArgs, app_name, appdir) => {
  const command = `heroku container:push ${dockerHerokuProcessType} --app ${app_name} ${dockerBuildArgs}`;
  const options = appdir ? { cwd: appdir } : null;

  execSync(command, options);
};

export const release = (dockerHerokuProcessType, app_name, appdir) => {
  const command = `heroku container:release ${dockerHerokuProcessType} --app ${app_name}`;
  const options = appdir ? { cwd: appdir } : null;

  execSync(command, options);
};

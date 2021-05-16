const { deployBranch, deployMaster } = require('./git/deploy');
const { release, push } = require('./heroku/docker/container');
const { getRemoteBranch } = require('./git/remote');
const { install } = require('./heroku/plugins');
const { reset }  = require('./heroku/repo');

const deployWithDocker = (app_name, appdir, dockerHerokuProcessType, dockerBuildArgs) => {
  push(dockerHerokuProcessType, dockerBuildArgs, app_name, appdir);
  release(dockerHerokuProcessType, app_name, appdir)
};

const resetRemote = (app_name) => {
  install();
  reset(app_name);
};

const deployWithGit = (app_name, appdir, branch, force) => {
  const remoteBranch = getRemoteBranch();

  if (remoteBranch === "master") resetRemote(app_name);

  if (appdir === "") {
    deployBranch(branch, force);
  } else {
    deployMaster(appdir, branch, force);
  }
}

export const deploy = (config) => {
  if (usedocker) {
    const { app_name, appdir, dockerHerokuProcessType, dockerBuildArgs } = config;

    deployWithDocker(app_name, appdir, dockerHerokuProcessType, dockerBuildArgs);
  } else {
    const { dontuseforce, app_name, branch, appdir } = config;
    const force = !dontuseforce ? "--force" : "";

    deployWithGit(app_name, appdir, branch, force);
  }
};

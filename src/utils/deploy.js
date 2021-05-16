const { execSync } = require("child_process");

const MAX_BUFFER = 104857600;

const pushContainer = (dockerHerokuProcessType, dockerBuildArgs, app_name, appdir) => {
  const command = `heroku container:push ${dockerHerokuProcessType} --app ${app_name} ${dockerBuildArgs}`;
  const options = appdir ? { cwd: appdir } : null;

  execSync(command, options);
};

const releaseContainer = (dockerHerokuProcessType, app_name, appdir) => {
  const command = `heroku container:release ${dockerHerokuProcessType} --app ${app_name}`;
  const options = appdir ? { cwd: appdir } : null;

  execSync(command, options);
};

const deployWithDocker = (app_name, appdir, dockerHerokuProcessType, dockerBuildArgs) => {
  pushContainer(dockerHerokuProcessType, dockerBuildArgs, app_name, appdir);
  releaseContainer(dockerHerokuProcessType, app_name, appdir)
};

const resetRemote = (app_name) => {
  execSync("heroku plugins:install heroku-repo");
  execSync("heroku repo:reset -a " + app_name);
};

const getRemoteBranch = () => {
  const command = "git remote show heroku | grep 'HEAD' | cut -d':' -f2 | sed -e 's/^ *//g' -e 's/ *$//g'";
  const remote_branch = execSync(command).toString().trim();

  return remote_branch;
};

const deployBranch = (branch, force) => {
  const command = `git push heroku ${branch}:refs/heads/main ${force}`;

  execSync(command, { maxBuffer: MAX_BUFFER });
};

const deployMaster = (appdir, branch, force) => {
  const command = `git push ${force} heroku \`git subtree split --prefix=${appdir} ${branch}\`:refs/heads/main`;

  execSync(command, { maxBuffer: MAX_BUFFER });
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

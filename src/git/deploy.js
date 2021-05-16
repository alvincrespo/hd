const MAX_BUFFER = 104857600;

export const deployBranch = (branch, force) => {
  const command = `git push heroku ${branch}:refs/heads/main ${force}`;

  execSync(command, { maxBuffer: MAX_BUFFER });
};

export const deployMaster = (appdir, branch, force) => {
  const command = `git push ${force} heroku \`git subtree split --prefix=${appdir} ${branch}\`:refs/heads/main`;

  execSync(command, { maxBuffer: MAX_BUFFER });
};

const { execSync } = require("child_process");

export const getRemoteBranch = () => {
  const command = "git remote show heroku | grep 'HEAD' | cut -d':' -f2 | sed -e 's/^ *//g' -e 's/ *$//g'";
  const remote_branch = execSync(command).toString().trim();

  return remote_branch;
};

const { execSync } = require("child_process");

export const install = () => {
  execSync("heroku plugins:install heroku-repo");
};

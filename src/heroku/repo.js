const { execSync } = require("child_process");

export const reset = (app_name) => {
  execSync("heroku repo:reset -a " + app_name);
};

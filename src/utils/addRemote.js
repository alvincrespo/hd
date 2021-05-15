const { execSync } = require("child_process");

export const addRemote = ({ app_name }) => {
  try {
    const command = `heroku git:remote --app ${app_name}`;

    execSync(command);

    console.log("Added remote.");
  } catch (err) {
    console.log("Unable to add remote.");
  }
};

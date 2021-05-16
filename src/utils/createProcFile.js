const fs = require("fs");
const { execSync } = require("child_process");

const FILENAME = "Procfile";

export const createProcfile = ({ procfile, appdir }) => {
  if (procfile) {
    fs.writeFileSync(path.join(appdir, FILENAME), procfile);

    execSync(`git add -A && git commit -m "Added Procfile"`);

    console.log("Written Procfile with custom configuration");
  }
};

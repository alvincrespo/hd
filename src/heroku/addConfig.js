const { execSync } = require("child_process");

const PREFIX = "HD_";

const loadEnvironmentVariables = () => {
  const envVars = [];

  for (let key in process.env) {
    if (key.startsWith(PREFIX)) {
      envVars.push(key.substring(3) + "='" + process.env[key] + "'");
    }
  }

  return envVars;
}

const loadEnvironmentVariablesFromFile = (env_file, appdir) => {
  const envVars = [];

  if (env_file) {
    const env = fs.readFileSync(path.join(appdir, env_file), "utf8");
    const variables = require("dotenv").parse(env);

    for (let key in variables) {
      envVars.push(key + "=" + variables[key]);
    }
  }

  return envVars;
}

export const addConfig = ({ app_name, env_file, appdir }) => {
  const envVars = loadEnvironmentVariables();
  const envVarsFromFile = loadEnvironmentVariablesFromFile(env_file, appdir);
  const configVars = [...envVars, ...envVarsFromFile];

  if (configVars.length !== 0) {
    execSync(`heroku config:set --app=${app_name} ${configVars.join(" ")}`);
  }
};

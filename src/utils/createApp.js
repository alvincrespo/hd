const { execSync } = require("child_process");

const UNDEFINED_FLAG_IDENTIFIER = '[REMOVE]';

const flags = {
  buildbpack: (buildpack) => buildpack ? ` --buildpack ${buildpack}` : UNDEFINED_FLAG_IDENTIFIER,
  region: (region) => region ? ` --region ${region}` : UNDEFINED_FLAG_IDENTIFIER,
  stack: (stack) => stack ? ` --stack ${stack}` : UNDEFINED_FLAG_IDENTIFIER,
  team: (team) => team ? ` --team ${team}` : UNDEFINED_FLAG_IDENTIFIER,
  create: ({ buildpack, region, stack, team }) => {
    return flags.clean(flags.buildbpack(buildpack) + flags.region(region) + flags.stack(stack) + flags.team(team))
  },
  clean: (str) => str.replaceAll(UNDEFINED_FLAG_IDENTIFIER)
}

export const createApp = ({ dontautocreate }) => {
  if (dontautocreate) throw err;
  
  const command = `heroku create ${app_name} ${flags.create(config)}`;
  
  execSync(command);
}

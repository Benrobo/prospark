import { program } from "commander";
import useGradinent from "../util/useGradient.js";

function showCliCommands() {
  const name = "create-prospark-app";
  const description =
    "Easily scaffold a new project with prefered technologies.";

  const cliCmds = `
    
    Usage: ${name} [options] [command]

    ${description}

    Options:
    -V, --version             output the version number
    -h, --help                display help for command

    Commands:
    --init  Begin project scaffolding.
    `;
  useGradinent({
    title: cliCmds,
    colors: ["#d0679d", "cyan", "#d0679d"],
  });
}

export default showCliCommands;

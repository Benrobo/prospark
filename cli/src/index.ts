#!/usr/bin/env node
import renderTitle from "./util/renderTitle.js";
import showCliCommands from "./helper/showCommand.js";
import initializePrompt from "./commands/prompt.js";
import { argv } from "process";
import chalk from "chalk";
import getPkgVersion from "./helper/getPkgVersion.js";

async function run() {
  const commands = argv;
  const mainCmd = commands[2] ?? "";

  const initialMsg = `\n Effortlessly Scaffold Any Project with ${chalk.green(
    "create-prospark-app"
  )} CLI Tool.`;

  switch (mainCmd) {
    case "--help":
    case "-h":
      showCliCommands();
      break;
    case "":
      renderTitle();
      console.log(chalk.white(initialMsg));
      break;
    case "--version":
    case "-v":
      const prosparkVersion = await getPkgVersion("create-prospark-app");
      console.log(chalk.whiteBright(prosparkVersion));
      break;
    case "--init":
      initializePrompt();
      break;
    default:
      renderTitle();
      console.log("\n");
      console.log(chalk.redBright("Command not found: " + mainCmd));
      break;
  }
}

run();

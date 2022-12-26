#!/usr/bin/env node
import logger from "./util/logger.js";
import checkPackageVersion from "./helper/checkPackageVersion.js";
import renderTitle from "./util/renderTitle.js";
import getCwd from "./util/getCwd.js";
import showCliCommands from "./helper/showCommand.js";
import initializePrompt from "./commands/prompt.js";
import initializeGit from "./helper/initGit.js";



async function run(){
    console.log("")

    // renderTitle()
    // showCliCommands()

    // initializePrompt()

    await initializeGit("/Users/benrobo/Documents/projects/prospark/cli/prosparkproject");
}

run()
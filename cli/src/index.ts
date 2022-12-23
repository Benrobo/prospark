#!/usr/bin/env node
import logger from "./util/logger.js";
import checkPackageVersion from "./helper/checkPackageVersion.js";
import renderTitle from "./util/renderTitle.js";
import getCwd from "./util/getCwd.js";



async function run(){
    console.log("")

    logger.success(getCwd())
}

run()
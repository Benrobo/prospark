import logger from "./util/logger.js";
import checkPackageVersion from "./helper/checkPackageVersion.js";
import renderTitle from "./util/renderTitle.js";


async function run(){
    // renderTitle()
    const res = checkPackageVersion("create-vite2")

    if(res.error) return logger.error("package not installed")
}

run()
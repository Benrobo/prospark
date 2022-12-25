import { execSync } from "child_process"
import showLoading from "../util/loader.js"
import sleep from "../util/sleep.js"


// install npm dependencies
async function installDependencies(dependecies: string[], devMode: boolean){
    if(dependecies.length === 0) return
    const Loading = await showLoading()
    const pkgs = dependecies.join(" ")
    const msg = devMode ? "Installing devDependencies" : "installing dependencies";
    const cmd = devMode ? `npm install -D ${pkgs}` : `npm install ${pkgs}`
    // start loading
    Loading.start(msg);
    execSync(cmd)
    await sleep(2)
    Loading.stop(msg, null);
}

export default installDependencies
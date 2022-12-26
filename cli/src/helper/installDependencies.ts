import {execa} from "execa"
import logger from "../util/logger.js";
import showLoading from "../util/loader.js";

// install npm dependencies
async function installDependencies(path: string,  devMode: boolean, dependecies?: string[]){
    const Loading = await showLoading()
    try {
        if((dependecies as string[]).length === 0) return
        const pkgs = (dependecies as string[]).join(" ")
        const cmd = [ devMode ? `install -D ${pkgs}` : `install ${pkgs}` ]
        Loading.start("Installing dependencies...")
        await execa("npm", cmd, { cwd: path, shell: true })
        Loading.stop("Successfully installed dependencies!", )
    } catch (e: any) {
        logger.error(e.message)
    }
}

export default installDependencies
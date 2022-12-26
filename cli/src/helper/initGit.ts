import { execSync } from "child_process";
import logger from "../util/logger.js";
import showLoading from "../util/loader.js";
import { execa } from "execa";
import fs from "fs-extra"
import chalk from "chalk";


async function initializeGit(path: string){
    const loader = await showLoading()
    const gitRepoExists = await checkIfGitRepositoryExists(path)

    if(gitRepoExists){
        return logger.warn(`A Git repository already exists at the specified path "${chalk.cyanBright(path)}" Please choose a different path or delete the existing repository before trying again.`)
    }

    if(isGitInstalled()){
        try {
            const msg = "project scaffolded using prospark-create";
            loader.start("Initializing git...")
            await execa("git", ["init"], { cwd: path, shell: true })
            await execa("git", ["add ."], { cwd: path, shell: true })
            await execa("git", [`commit -m "${msg}"`], { cwd: path, shell: true })
            loader.stop("git initialized successfully.", null)
        } catch (e: any) {
            loader.stop(null, "git initialization failed, could not initialized.")
        }
        return;
    }
    logger.error("'git' command not found..")
}

export default initializeGit

function isGitInstalled(){
    try {
        const cmd = `git --version`;
        execSync(cmd);
        return true;
    } catch (e) {
        return false;
    }
}

async function checkIfGitRepositoryExists(path: string){
    try {
        // use the git rev-parse command to check if the specified path is a Git repository
        await execa("git", ["rev-parse", "--git-dir"], { cwd: path, shell: true });
        return true;
    } catch (e) {
        return false;
    }
}
import fs from "fs-extra"
import logger from "../util/logger.js"
import inquirer from "inquirer";
import rimraf from "rimraf"
import sleep from "../util/sleep.js";
import showLoading from "../util/loader.js";
import chalk from "chalk";


function isDirectoryEmptySync(path: string) {
    try {
      const files = fs.readdirSync(path);
      return files.length === 0;
    } catch (err) {
      logger.error(err);
      return false;
    }
}

function emptyDirectory(path: string, cb?: Function){
    rimraf(path, async (err) => {
        if (err) {
            logger.error(err.message)
            return;
        }
        
        cb && cb();
    });
}

function copyNestedDirectoriesSync(src: string, dest: string){
    const excludedDir = ["node_modules", ".vscode", "temp", "logs"]
    try {
        const files = fs.readdirSync(src);
        for (const file of files) {
          const srcPath = `${src}/${file}`;
          const destPath = `${dest}/${file}`;
          const stat = fs.statSync(srcPath);
          if (stat.isDirectory()) {
            if(excludedDir.includes(file)) continue;
            fs.ensureDirSync(destPath);
            copyNestedDirectoriesSync(srcPath, destPath);
          } else {
            fs.copySync(srcPath, destPath);
          }
        }
    } catch (err) {
        logger.error(err);
    }
}

// create file
export function createFile(dest_path: string, fileName: string, content?: string){
    try {
        if(!fs.existsSync(dest_path)){
            logger.error(`failed to create file, destination path doesn't exists.`)
            return;
        }
        const file = `${dest_path}/${fileName}`;
        fs.writeFileSync(file, content as any);
    } catch (e: any) {
        logger.error(`failed to create file: ${e.message}`)
    }
}

// create folder
export async function createFolder(folderName: string, dest_path: string){
    
    const fullPath = `${dest_path}/${folderName}`
    const LOADING = await showLoading();
    try {
        if(!fs.existsSync(dest_path)){
            logger.error(`failed to create folder, dest_path (${dest_path}) path doesn't exists.`)
            return;
        }
        if(fs.existsSync(fullPath)){
            if(!isDirectoryEmptySync(fullPath)){
                // ask the user if he would like to empty the content inside
                const ans = await inquirer.prompt([{
                    type: 'confirm',
                    name: 'wouldClear',
                    message: 'Empty directory (y/n):',
                    prefix: chalk.greenBright("\n?")
                }])

                if(ans.wouldClear){
                    // empty directory
                    LOADING.start("clearing directory");
                    emptyDirectory(fullPath)
                    await sleep(2);
                    LOADING.stop("done clearing", null)
                    !fs.existsSync(fullPath) && fs.mkdirSync(fullPath);
                    return true;
                }
                logger.error(`project directory '${folderName}' already exists.`)
                return false;
            }
        }
        !fs.existsSync(fullPath) && fs.mkdirSync(fullPath);
        return true;
    } catch (e: any) {
        logger.error(`failed to create folder: ${e.message}`)
        return false;
    }
}

// copy directory
export async function copyDirectoryToDestination(from: string, to: string){
    try {
        const LOADING = await showLoading();
        if(!fs.existsSync(from)){
            logger.error(`directory (${from}) path doesn't exists.`)
            return;
        }
        if(!fs.existsSync(to)){
            logger.error(`directory (${to}) path doesn't exists.`)
            return;
        }

        // check if the directory is empty.
        // if(!isDirectoryEmptySync(to)){
        //     // ask the user if he would like to empty the content inside
        //     const ans = await inquirer.prompt([{
        //         type: 'confirm',
        //         name: 'wouldClear',
        //         message: 'Empty directory 2 (y/n):'
        //     }])

        //     if(ans.wouldClear){
        //         emptyDirectory(to);
                
        //         await sleep(1)
        //         !fs.existsSync(to) && fs.mkdirSync(to);
        //         copyNestedDirectoriesSync(from, to);
        //         return true;
        //     }
        //     (await showLoading()).stop(null, `failed: ${to} isn't empty `)
        //     return false;
        // }

        LOADING.start("setting template");
        copyNestedDirectoriesSync(from, to);
        await sleep(2)
        LOADING.stop("done setting template", null);
    } catch (e: any) {
        logger.error(`failed to copy directory: ${e.message}`)
    }
}

export function updateFileContent(path_to_file: string, content?: string){
    try {
        if(!fs.existsSync(path_to_file)){
            logger.error(`failed to update file, path_to_file (${path_to_file}) path doesn't exists.`)
            return;
        }
        const file = `${path_to_file}`;
        fs.writeFileSync(file, content as any);
    } catch (e: any) {
        logger.error(`failed to create file: ${e.message}`)
    }
}

export function readFileData(path_to_file: string){
    try {
        if(!fs.existsSync(path_to_file)){
            logger.error(`failed to read file, path_to_file (${path_to_file}) path doesn't exists.`)
            return;
        }
        const data = fs.readFileSync(path_to_file);
        return data.toString()
    } catch (e: any) {
        logger.error(`failed to read file: ${e.message}`)
    }
}
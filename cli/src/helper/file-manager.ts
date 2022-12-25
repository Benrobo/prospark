import fs from "fs-extra"
import logger from "../util/logger.js"
import inquirer from "inquirer";
import rimraf from "rimraf"

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
    rimraf(path, (err) => {
        if (err) {
          logger.error(err);
        }
        if (cb) {
          cb();
        }
    });
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
export function createFolder(folderName: string, dest_path: string){
    try {
        const fullPath = `${dest_path}/${folderName}`
        if(!fs.existsSync(dest_path)){
            logger.error(`failed to create folder, dest_path (${dest_path}) path doesn't exists.`)
            return;
        }
        if(fs.existsSync(fullPath)){
            if(!isDirectoryEmptySync(fullPath)){
                // ask the user if he would like to empty the content inside
                inquirer.prompt([{
                    type: 'confirm',
                    name: 'wouldClear',
                    message: 'Empty directory (y/n):'
                }]).then(ans=>{
                    if(ans.wouldClear){
                        // empty directory
                        emptyDirectory(fullPath, ()=>{
                            logger.success("directory cleared.")
                        })
                    }
                    logger.error(`project directory '${folderName}' already exists.`)
                    return;
                })
            }
            // logger.error(`directory '${folderName}' already exists.`)
            return;
        }
        fs.mkdirSync(fullPath);
    } catch (e: any) {
        logger.error(`f/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmlailed to create folder: ${e.message}`)
    }
}

// copy directory
export function copyDirectoryToDestination(from: string, to: string){
    try {
        if(!fs.existsSync(from)){
            logger.error(`directory (${from}) path doesn't exists.`)
            return;
        }
        if(!fs.existsSync(to)){
            logger.error(`directory (${to}) path doesn't exists.`)
            return;
        }

        // check if the directory is empty.
        if(!isDirectoryEmptySync(to)){
            // ask the user if he would like to empty the content inside
            inquirer.prompt([{
                type: 'confirm',
                name: 'wouldClear',
                message: 'Empty directory (y/n):'
            }]).then(ans=>{
                console.log(ans)
                if(ans.wouldClear){

                }
            })
        }

        // fs.mkdirSync(`${dest_path}/${folderName}`);
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
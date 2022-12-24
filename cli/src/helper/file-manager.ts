import fs from "fs-extra"
import logger from "../util/logger.js"

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
import path from "path";
import fs from "fs-extra"
import getCwd from "../util/getCwd.js";



function getPackageJsonData(){
    const cwd = getCwd();
    const packageJson = path.join(cwd, "package.json")
    const packageJsonData = fs.readJsonSync(packageJson);
    return packageJsonData;
}

export default getPackageJsonData

export function getPackageJsonDataFromPath(path: string){
    const isValidPath = fs.pathExistsSync(path as string);

    try {
        if(!isValidPath) return null;
        const data = fs.readJsonSync(path);
        return data;
    } catch (e) {
        return null;
    }
}


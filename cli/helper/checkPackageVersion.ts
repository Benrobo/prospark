// import {execa} from "execa"
import { execSync } from "child_process";


interface Output{
    error: boolean;
    version: null | string;
}

// check package version

function checkPackageVersion(packageName: string) : Output{
    
    const cmd = `npm view ${packageName} version`
    const out = {
        error: false,
        version: null || ""
    } as Output

    try {
        const stdout = execSync(cmd);
        let version = stdout.toString();
        // const regexp = /[0-9]/
        out["error"] = false;
        out["version"] = version.replace("\n", "");
        return (out);
    } catch (e:any) {
        out["error"] = true;
        out["version"] = null;
        return (out);
    }
    
}

export default checkPackageVersion
import { execSync } from "child_process";


interface Output{
    error: boolean;
    version: null | string;
}

// check package version

function checkPackageVersion(packageName: string) : Output{
    
    const out = {
        error: false,
        version: null || ""
    } as Output
    
    try {
        // 2> simply resirect the stderr output to a log file present in `./logs/error.log`
        const cmd = `npm view ${packageName} version 2> ./logs/error.log`
        const stdout = execSync(cmd);
        let version = stdout.toString();
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
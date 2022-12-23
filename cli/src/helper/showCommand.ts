import { program } from "commander";
import getPackageJsonData from "./getPackageJson.js";
import useGradinent from "../util/useGradient.js";


function showCliCommands(){
    const pkgData = getPackageJsonData();
    const name = pkgData["name"] || "prospark";
    const description = pkgData["description"] || ""

    const cliCmds = `
    
    Usage: ${name} [options] [command]

    ${description}

    Options:
    -V, --version             output the version number
    -h, --help                display help for command

    Commands:
    split [options] <string>  Split a string into substrings and display as an array
    help [command]            display help for command
    `
    useGradinent({
        title: cliCmds,
        colors: ["#d0679d", "cyan", "#d0679d"]
    })
}

export default showCliCommands
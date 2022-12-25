import { CLIENT_TEMPLATE_DIR, SCRIPT_TITLE } from "../../config/index.js";
import ProjectOptions from "../../@types/project.js";
import path from "path";
import fs from "fs-extra"
import { getPackageJsonDataFromPath } from "../../helper/getPackageJson.js";
import getCwd from "../../util/getCwd.js";
import getPkgVersion from "../../helper/getPkgVersion.js";
import { createFolder, readFileData, updateFileContent } from "../../helper/file-manager.js";
import pretty from "pretty"
import cleanUpProjectName from "../../util/cleanProjectName.js";

/**
 * 
 * @param promptInput 
 * 
{
  projectName: 'prospark-project',
  projectType: 'Blank',
  architecture: 'Poly-repo',
  stack: 'frontend',
  variant: 'Javascript',
  frontendFramework: 'React',
  frontendStyling: 'tailwindcss (vanilla, nextjs, react, vue)'
}
*/

enum Variant{
    JS="javascript",
    TS="typescript"
}

class SetupFrontend{
    
    protected variant;
    protected scaffoldDesc = "Scaffolded using prospark"
    public constructor(promptInput: ProjectOptions){
        this.variant = promptInput.variant;
        this.variant.toLowerCase() === "javascript" && this.handleJavascriptSetup(promptInput);
        this.variant.toLowerCase() === "typescript" && this.handleTypescriptSetup(promptInput);
    }

    public handleJavascriptSetup(promptInput: ProjectOptions){
        console.log(promptInput)
    
        const {frontendFramework, frontendStyling} = promptInput;

        if(frontendFramework?.toLowerCase() === "vanilla" && frontendStyling?.toLowerCase() === "tailwindcss"){
            return this.isVanillaAndTailwind(promptInput)
        } 
    }

    public handleTypescriptSetup(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        console.log("TS SUPPORT")
    }

    // if the frontend framework choosen is vanilla and styling used is tailwindcss
    protected isVanillaAndTailwind(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        const templatePath = variant.toLowerCase() === Variant.JS ? `/js_support/vanilla/` : `/ts_support/vanilla/`
        const vanillaDir = path.join("./",CLIENT_TEMPLATE_DIR, templatePath);
        const cleanProjectName = cleanUpProjectName(projectName)

        // create project directory from project name
        const dest_path = getCwd();
        cleanProjectName !== "." && createFolder(cleanProjectName, dest_path)
        
        // if clean projectname isn't found in curr dir, then we can set it up there
        // else set it up in clean project folder.
        const projDirPath = `${getCwd()}/${cleanProjectName}`;
        const from = vanillaDir;
        const to = projDirPath;

        return;
        if(fs.existsSync(projDirPath)){
            // copy all template folder to proj dir
            fs.copyFileSync(from, to);
        }
        // copy all template to curr dir

        // copy template folder to cwd where this command is been initiated.
        console.log("SETUP IN CURR DIR")
        return;
        let pkgJsonData = getPackageJsonDataFromPath(vanillaDir+"package.json");
        pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName
        pkgJsonData["description"] = this.scaffoldDesc;
        
        // update index.html file in 'vanilla' client template
        const htmlFilePath = path.join(getCwd(),CLIENT_TEMPLATE_DIR, `/js_support/vanilla/index.html`);
        const newHtmlData = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${projectName}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                    <h1 class="text-3xl font-bold underline">
                    Vanilla + Tailwindcss
                    </h1>
                    <p>
                    ${
                        projectType.toLowerCase() === "blank" ?
                        "Blank Project"
                        :
                        "Starter Project" 
                    }
                    </p>
                    <div id="app"></div>
                    <script type="module" src="/main.js"></script>
                </body>
            </html>
        `;

        // update html file to include tailwindcss config
        updateFileContent(htmlFilePath, pretty(newHtmlData,{ocd: true}));

        // update package.json
        updateFileContent(vanillaDir+"package.json", JSON.stringify(pkgJsonData));

                    
    }

    protected isReactAndTailwind(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        const templatePath = variant.toLowerCase() === Variant.JS ? `/js_support/vanilla/` : `/ts_support/vanilla/`
        const vanillaDir = path.join(getCwd(),CLIENT_TEMPLATE_DIR, templatePath);
        let pkgJsonData = getPackageJsonDataFromPath(vanillaDir+"package.json");
        pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName
        pkgJsonData["description"] = this.scaffoldDesc;
        // get package versions
        // let tailwindVersion = getPkgVersion("tailwindcss"),
        // postcss = getPkgVersion("postcss"),
        // autoprefixer = getPkgVersion("autoprefixer")

        // setup tailwindcss for vanilla js and html


        // update dependencies
        // pkgJsonData["devDependencies"] = {
        //     ...pkgJsonData["devDependencies"], 
        //     "tailwindcss" : tailwindVersion,
        //     "postcss" : postcss,
        //     "autoprefixer" : autoprefixer,
        // }
    }

    protected createTailwindcssFiles(){
        // files and file content
        let postcssFilename = `postcss.config.js`,
        postcssCont = `
        module.exports = {
            plugins: {
              tailwindcss: {},
              autoprefixer: {},
            }
        }
        `,
        tailwindFilename = `tailwind.config.js`,
        tailwindCont = `
        module.exports = {
            content: ["./src/**/*.{html,js}"],
            theme: {
                extend: {},
            },
            plugins: [],
        }
        `,
        mainCssname = `main.css`,
        mainCssCont = `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        `
    }
}

export default SetupFrontend

import { CLIENT_TEMPLATE_DIR, SCRIPT_TITLE } from "../../config/index.js";
import ProjectOptions from "../../@types/project.js";
import path from "path";
import { getPackageJsonDataFromPath } from "../../helper/getPackageJson.js";
import getCwd from "../../util/getCwd.js";
import { copyDirectoryToDestination, createFile, createFolder, readFileData, updateFileContent } from "../../helper/file-manager.js";
import pretty from "pretty"
import cleanUpProjectName from "../../util/cleanProjectName.js";
import logger from "../../util/logger.js";
import showLoading from "../../util/loader.js";
import { installDepInPkgJson } from "../../helper/installDependencies.js";
import chalk from "chalk";
import { VANILLA_CSS_CONTENT, VANILLA_HTML_CONTENT } from "../../data/template.js";
import { vanillSetupMessage } from "../../const/index.js";
import initializeGit from "../../helper/initGit.js";
import ProjectBaseSetup from "./base_setup.js";
import sleep from "../../util/sleep.js";
import fs from "fs-extra";

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

class SetupFrontend extends ProjectBaseSetup{
    
    protected variant;
    public constructor(promptInput: ProjectOptions){
        super()
        this.variant = promptInput.variant;
        this.variant.toLowerCase() === "javascript" && this.handleJavascriptSetup(promptInput);
        this.variant.toLowerCase() === "typescript" && this.handleTypescriptSetup(promptInput);
    }


    protected async configureReactTailwindCss(path: string){
        
        if(!fs.pathExistsSync(path)) return;
        
        const Loader = await showLoading()
        
        try {
            // files and file content
            let postcssFilename = `postcss.config.cjs`,
            postcssCont = {
                plugins: {
                tailwindcss: {},
                autoprefixer: {},
                }
            },
            tailwindFilename = `tailwind.config.cjs`,
            tailwindCont = {
                content: [ "./index.html","./src/**/*.{html,js,jsx,ts,tsx}"],
                theme: {
                    extend: {},
                },
                plugins: [],
            },
            indexCssname = `index.css`,
            indexCssCont = `
            @tailwind base;
            @tailwind components;
            @tailwind utilities;
            `.replace(/^\s+/gm, '')

            Loader.start("setting up tailwindcss...")
            createFile(path, postcssFilename, `module.exports=${JSON.stringify(postcssCont, null, 2)}`);
            createFile(path, tailwindFilename, `module.exports=${JSON.stringify(tailwindCont, null, 2)}`);
            createFile(path+"/src", indexCssname, indexCssCont);
            Loader.stop("tailwindcss successfully setup.", null);

        } catch (e: any) {
            logger.error(e)
        }
    }

    protected async configureSvelteTailwindCss(path: string){
        
        if(!fs.pathExistsSync(path)) return;
        
        const Loader = await showLoading()
        
        try {
            // files and file content
            let postcssFilename = `postcss.config.cjs`,
            postcssCont = {
                plugins: {
                tailwindcss: {},
                autoprefixer: {},
                }
            },
            tailwindFilename = `tailwind.config.cjs`,
            tailwindCont = {
                content: ['./src/**/*.{html,js,svelte,ts}'],
                theme: {
                    extend: {},
                },
                plugins: [],
            },
            appCssname = `app.css`,
            appCssCont = `
            @tailwind base;
            @tailwind components;
            @tailwind utilities;
            `.replace(/^\s+/gm, ''),
            svelteConfigName = "svelte.config.js",
            svelteConfigCont = `
            import adapter from '@sveltejs/adapter-auto';
            import { vitePreprocess } from '@sveltejs/kit/vite';

            /** @type {import('@sveltejs/kit').Config} */
            const config = {
            kit: {
                adapter: adapter()
            },
            preprocess: vitePreprocess()
            };

            export default config;
            `

            Loader.start("setting up tailwindcss...")
            createFile(path, postcssFilename, `module.exports=${JSON.stringify(postcssCont, null, 2)}`);
            createFile(path, tailwindFilename, `module.exports=${JSON.stringify(tailwindCont, null, 2)}`);
            createFile(path+"/src", appCssname, appCssCont);
            createFile(path, svelteConfigName, pretty(svelteConfigCont));
            Loader.stop("tailwindcss successfully setup.", null);

        } catch (e: any) {
            logger.error(e)
        }
    }

    public handleFrontendSetup(promptInput: ProjectOptions) {
        const {frontendFramework, frontendStyling} : any = promptInput;
      
        switch (`${frontendFramework.toLowerCase()}-${frontendStyling.toLowerCase()}`) {
          case "vanilla-tailwindcss":
            return this.isVanillaAndTailwind(promptInput);
          case "vanilla-css module":
            return this.isVanillaAndCssModule(promptInput);
          case "react-tailwindcss":
            return this.isReactAndTailwind(promptInput);
          case "react-css module":
            return this.isReactAndCssModule(promptInput);
        case "svelte-tailwindcss":
            return this.isSvelteAndTailwindCss(promptInput);
          default:
            // code to handle other cases or an error
        }
    }

    public handleJavascriptSetup(promptInput: ProjectOptions){
        return this.handleFrontendSetup(promptInput)
    }

    public handleTypescriptSetup(promptInput: ProjectOptions){
        return this.handleFrontendSetup(promptInput)
    }

    protected async isVanillaAndTailwind(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        const templatePath = variant.toLowerCase() === Variant.JS ? `/js_support/vanilla` : `/ts_support/vanilla`
        const vanillaDir = path.join("./",CLIENT_TEMPLATE_DIR, templatePath);
        const cleanProjectName = cleanUpProjectName(projectName)

        const dest_path = getCwd();

        if(cleanProjectName !== "."){
            await createFolder(cleanProjectName, dest_path)
        }
        
        try {
            const projDirPath = `${getCwd()}/${cleanProjectName}`;
            const from = vanillaDir;
            const to = projDirPath;
            
            // copy template folder to cwd where this command is been initiated.
            await copyDirectoryToDestination(from, to);

            let pkgJsonData = getPackageJsonDataFromPath(to+"/package.json");
            pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName
            pkgJsonData["description"] = this.scaffoldDesc;
            
            // update index.html file in 'vanilla' client template
            const htmlFilePath = variant.toLowerCase() === "typescript" ? path.join(to, `/index.html`) : path.join(to, `/index.html`)
            const scriptPath = variant.toLowerCase() === "typescript" ? "./src/main.ts" : "./main.js";
            const newHtmlData = VANILLA_HTML_CONTENT
                .replace("{{projectName}}", projectName)
                .replace("{{script_logic}}", `${
                    projectType.toLowerCase() === "blank" ?
                    "Blank Project"
                    :
                    "Starter Project" 
                }`)
                .replace("{{styling_logic}}", `<script src="https://cdn.tailwindcss.com" defer></script>`)
                .replace("{{script_tag}}", `<script type="module" src="${scriptPath}"></script>`)
                .replace(
                    "{{vanilla_markup_content}}", 
                    `
                    <div class="w-full h-[100vh] bg-[#123468] text-[#fff] flex flex-col items-center justify-center text-center">
                        <h3 class="text-white-200 text-[25px] font-extrabold">Vanilla(${variant}) + Tailwindcss</h3>
                        <br />
                        <button id="counter" class="px-3 py-2 rounded-md bg-blue-400 text-white-100" type="button">Counter</button>
                    </div>
                    `
                )

            // update html file to include tailwindcss config
            await updateFileContent(htmlFilePath, pretty(newHtmlData,{ocd: true}), false);
            // update package.json
            await updateFileContent(to+"/package.json", JSON.stringify(pkgJsonData, null, 2));
            

            // ask for packages to be installed
            const shouldInstall = await this.askDependenciesInstalled();
            let hasInstalled = false;

            if(shouldInstall){
                await installDepInPkgJson(to);
                hasInstalled = true;
            }

            // ask for git initialization
            const shouldInitializeGit = await this.askForGitInit();
            
            if(shouldInitializeGit){
                await initializeGit(to);
            }

            // show welcome message
            console.log(chalk.cyanBright(
                hasInstalled ? 
                vanillSetupMessage
                .replace("{{to}}", to)
                .replace("{{projectName}}", projectName)
                .replace("{{command}}", "npm run dev")
                :
                vanillSetupMessage
                .replace("{{to}}", to)
                .replace("{{projectName}}", projectName)
                .replace("{{command}}", `npm install\nnpm run dev`)
            ))

        } catch (e: any) {
            logger.error(e)
        }
    }

    protected async isVanillaAndCssModule(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        const templatePath = variant.toLowerCase() === Variant.JS ? `/js_support/vanilla` : `/ts_support/vanilla`
        const vanillaDir = path.join("./",CLIENT_TEMPLATE_DIR, templatePath);
        const cleanProjectName = cleanUpProjectName(projectName)

        // create project directory from project name
        const dest_path = getCwd();

        if(cleanProjectName !== "."){
            await createFolder(cleanProjectName, dest_path)
        }

        try {
            const projDirPath = `${getCwd()}/${cleanProjectName}`;
            const from = vanillaDir;
            const to = projDirPath;
            
            // copy template folder to cwd where this command is been executed.
            await copyDirectoryToDestination(from, to);

            let pkgJsonData = getPackageJsonDataFromPath(to+"/package.json");
            pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName
            pkgJsonData["description"] = this.scaffoldDesc;
            
            // update index.html file in 'vanilla' client template
            const htmlFilePath = variant.toLowerCase() === "typescript" ? path.join(to, `/index.html`) : path.join(to, `/index.html`)
            const stylePath = variant.toLowerCase() === "typescript" ? "./src/styles/main.css" : "./styles/main.css";
            const scriptPath = variant.toLowerCase() === "typescript" ? "./src/main.ts" : "./main.js";
            const newHtmlData = VANILLA_HTML_CONTENT
                .replace("{{projectName}}", projectName)
                .replace("{{script_logic}}", `${
                    projectType.toLowerCase() === "blank" ?
                    "Blank Project"
                    :
                    "Starter Project" 
                }`)
                .replace("{{styling_logic}}", `<link rel="stylesheet" href="${stylePath}" />`)
                .replace("{{script_tag}}", `<script type="module" src="${scriptPath}"></script>`)
                .replace(
                    "{{vanilla_markup_content}}", 
                    `
                    <div>
                        <h3 class="heading">Vanilla(${variant}) + CssModule</h3>
                        <div class="card">
                            <button id="counter" type="button">Counter</button>
                        </div>
                    </div>
                    `
                )

            // update html file to include tailwindcss config
            await updateFileContent(htmlFilePath, pretty(newHtmlData,{ocd: true}), false);
            // update package.json
            await updateFileContent(to+"/package.json", JSON.stringify(pkgJsonData, null, 2));

            // setup css module
            await this.setupCssModule(promptInput, to);

            // ask for packages to be installed
            const shouldInstall = await this.askDependenciesInstalled();
            let hasInstalled = false;
            
            if(shouldInstall){
                // start installation
                await installDepInPkgJson(to);
                hasInstalled = true;
            }
            
            // ask for git initialization
            const shouldInitializeGit = await this.askForGitInit();
            
            if(shouldInitializeGit){
                await initializeGit(to);
            }

            // show welcome message
            console.log(chalk.cyanBright(
                hasInstalled ? 
                vanillSetupMessage
                .replace("{{to}}", to)
                .replace("{{projectName}}", projectName)
                .replace("{{command}}", "npm run dev")
                :
                vanillSetupMessage
                .replace("{{to}}", to)
                .replace("{{projectName}}", projectName)
                .replace("{{command}}", `npm install\nnpm run dev`)
            ))

        } catch (e: any) {
            logger.error(e)
        }
    }

    protected async isReactAndTailwind(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        const templatePath = variant.toLowerCase() === Variant.JS ? `/js_support/react/` : `/ts_support/react/`
        const reactDir = path.join("./",CLIENT_TEMPLATE_DIR, templatePath);
        const cleanProjectName = cleanUpProjectName(projectName)
        const dest_path = getCwd();

        if(cleanProjectName !== "."){
            await createFolder(cleanProjectName, dest_path)
        }

        try {
            const projDirPath = `${getCwd()}/${cleanProjectName}`;
            const from = reactDir;
            const to = projDirPath;
            const newPkgJsonPath = `${to}/package.json`
            
            await copyDirectoryToDestination(from, to);
            
            const pkgJsonData : any = await this.configureReactPkgJson(newPkgJsonPath, projectName, frontendStyling as string);

            if(pkgJsonData === null && Object.entries(pkgJsonData).length === 0) return;
            
            await this.updateFrameworkTemplateFiles(promptInput, to);
            await updateFileContent(newPkgJsonPath, JSON.stringify(pkgJsonData, null, 2));
            
            await this.configureReactTailwindCss(to)

            const shouldInstall = await this.askDependenciesInstalled();
            let hasInstalled = false;
            
            if(shouldInstall){
                await installDepInPkgJson(to);
                hasInstalled = true;
            }

            const shouldInitializeGit = await this.askForGitInit();
            
            if(shouldInitializeGit){
                await initializeGit(to);
            }

            this.showWelcomeMessage(vanillSetupMessage, hasInstalled, cleanProjectName, to);

        } catch (e: any) {
            logger.error(e)
        }
    }

    protected async isReactAndCssModule(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        const templatePath = variant.toLowerCase() === Variant.JS ? `/js_support/react/` : `/ts_support/react/`
        const reactDir = path.join("./",CLIENT_TEMPLATE_DIR, templatePath);
        const cleanProjectName = cleanUpProjectName(projectName)
        const dest_path = getCwd();

        if(cleanProjectName !== "."){
            await createFolder(cleanProjectName, dest_path)
        }

        try {
            const projDirPath = `${getCwd()}/${cleanProjectName}`;
            const from = reactDir;
            const to = projDirPath;
            const newPkgJsonPath = `${to}/package.json`
            
            await copyDirectoryToDestination(from, to);
            
            const pkgJsonData : any = await this.configureReactPkgJson(newPkgJsonPath, projectName, frontendStyling as string);

            if(pkgJsonData === null && Object.entries(pkgJsonData).length === 0) return;
            
            await this.updateFrameworkTemplateFiles(promptInput, to);
            await updateFileContent(newPkgJsonPath, JSON.stringify(pkgJsonData, null, 2));
            
            const shouldInstall = await this.askDependenciesInstalled();
            let hasInstalled = false;
            
            if(shouldInstall){
                await installDepInPkgJson(to);
                hasInstalled = true;
            }

            const shouldInitializeGit = await this.askForGitInit();
            
            if(shouldInitializeGit){
                await initializeGit(to);
            }

            this.showWelcomeMessage(vanillSetupMessage, hasInstalled, cleanProjectName, to);

        } catch (e: any) {
            logger.error(e)
        }
    }

    protected async isSvelteAndTailwindCss(promptInput: ProjectOptions){
        const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
        const templatePath = variant.toLowerCase() === Variant.JS ? `/js_support/svelte/` : `/ts_support/svelte/`
        const reactDir = path.join("./",CLIENT_TEMPLATE_DIR, templatePath);
        const cleanProjectName = cleanUpProjectName(projectName)
        const dest_path = getCwd();

        if(cleanProjectName !== "."){
            await createFolder(cleanProjectName, dest_path)
        }

        try {
            const projDirPath = `${getCwd()}/${cleanProjectName}`;
            const from = reactDir;
            const to = projDirPath;
            const newPkgJsonPath = `${to}/package.json`
            
            await copyDirectoryToDestination(from, to);
            
            const pkgJsonData : any = await this.configureSveltePkgJson(newPkgJsonPath, projectName, frontendStyling as string);

            if(pkgJsonData === null && Object.entries(pkgJsonData).length === 0) return;
            
            await this.updateFrameworkTemplateFiles(promptInput, to);
            await updateFileContent(newPkgJsonPath, JSON.stringify(pkgJsonData, null, 2));
            
            await this.configureSvelteTailwindCss(to)

            const shouldInstall = await this.askDependenciesInstalled();
            let hasInstalled = false;
            
            if(shouldInstall){
                await installDepInPkgJson(to);
                hasInstalled = true;
            }

            const shouldInitializeGit = await this.askForGitInit();
            
            if(shouldInitializeGit){
                await initializeGit(to);
            }

            this.showWelcomeMessage(vanillSetupMessage, hasInstalled, cleanProjectName, to);

        } catch (e: any) {
            logger.error(e)
        }
    }
}

export default SetupFrontend

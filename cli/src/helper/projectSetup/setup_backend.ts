import { SERVER_TEMPLATE_DIR, SCRIPT_TITLE } from "../../config/index.js";
import ProjectOptions from "../../@types/project.js";
import path from "path";
import { getPackageJsonDataFromPath } from "../../helper/getPackageJson.js";
import getCwd from "../../util/getCwd.js";
import {
  copyDirectoryToDestination,
  createFile,
  createFolder,
  readFileData,
  updateFileContent,
} from "../../helper/file-manager.js";
import pretty from "pretty";
import cleanUpProjectName from "../../util/cleanProjectName.js";
import logger from "../../util/logger.js";
import showLoading from "../../util/loader.js";
import { installDepInPkgJson } from "../../helper/installDependencies.js";
import chalk from "chalk";
import {
  VANILLA_CSS_CONTENT,
  VANILLA_HTML_CONTENT,
} from "../../data/template.js";
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
  architecture: 'Poly-repo',
  stack: 'backend',
  variant: 'Javascript',
  backendRestWithJavascript: 'Nodejs/Express',
  backendDatabase: true,
  backendDatabaseType: 'Mysql'
}
*/

enum Variant {
  JS = "javascript",
  TS = "typescript",
}

class SetupBackend extends ProjectBaseSetup {
  protected variant;
  public constructor(promptInput: ProjectOptions) {
    super();
    this.variant = promptInput.variant;
    this.variant.toLowerCase() === "javascript" &&
      this.handleJavascriptSetup(promptInput);
    this.variant.toLowerCase() === "typescript" &&
      this.handleTypescriptSetup(promptInput);
  }

  protected async configureReactTailwindCss(path: string) {
    if (!fs.pathExistsSync(path)) return;

    const Loader = await showLoading();

    try {
      // files and file content
      let postcssFilename = `postcss.config.cjs`,
        postcssCont = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        },
        tailwindFilename = `tailwind.config.cjs`,
        tailwindCont = {
          content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
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
            `.replace(/^\s+/gm, "");

      Loader.start("setting up tailwindcss...");
      createFile(
        path,
        postcssFilename,
        `module.exports=${JSON.stringify(postcssCont, null, 2)}`
      );
      createFile(
        path,
        tailwindFilename,
        `module.exports=${JSON.stringify(tailwindCont, null, 2)}`
      );
      createFile(path + "/src", indexCssname, indexCssCont);
      Loader.stop("tailwindcss successfully setup.", null);
    } catch (e: any) {
      logger.error(e);
    }
  }

  protected async configureSvelteTailwindCss(path: string) {
    if (!fs.pathExistsSync(path)) return;

    const Loader = await showLoading();

    try {
      // files and file content
      let postcssFilename = `postcss.config.cjs`,
        postcssCont = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        },
        tailwindFilename = `tailwind.config.cjs`,
        tailwindCont = {
          content: ["./src/**/*.{html,js,svelte,ts}"],
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
            `.replace(/^\s+/gm, "");

      Loader.start("setting up tailwindcss...");
      createFile(
        path,
        postcssFilename,
        `module.exports=${JSON.stringify(postcssCont, null, 2)}`
      );
      createFile(
        path,
        tailwindFilename,
        `module.exports=${JSON.stringify(tailwindCont, null, 2)}`
      );
      createFile(path + "/src", appCssname, appCssCont);
      Loader.stop("tailwindcss successfully setup.", null);
    } catch (e: any) {
      logger.error(e);
    }
  }

  public handleBackendSetup(promptInput: ProjectOptions) {
    const { backendPreset }: any = promptInput;

    switch (`${backendPreset.toLowerCase()}`) {
      case "nodejs/express":
        return this.isNodejsAndExpress(promptInput);
      case "vanilla-css module":
      // code to handle other cases or an error
    }
  }

  public async handleJavascriptSetup(promptInput: ProjectOptions) {
    return this.handleBackendSetup(promptInput);
  }

  public handleTypescriptSetup(promptInput: ProjectOptions) {
    return this.handleBackendSetup(promptInput);
  }

  public isNodejsAndExpress(promptInput: ProjectOptions) {
    const { projectName, backendDatabase, stack, variant } = promptInput;
    const templatePath =
      variant.toLowerCase() === Variant.JS
        ? `/js_support/node_exp/`
        : `/ts_support/node_exp/`;
  }
}

export default SetupBackend;

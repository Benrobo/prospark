import { SERVER_TEMPLATE_DIR, SCRIPT_TITLE } from "../../config/index.js";
import ProjectOptions from "../../@types/project.js";
import path from "path";
import {
  ReturnPackageJson,
  getPackageJsonDataFromPath,
} from "../../helper/getPackageJson.js";
import getCwd from "../../util/getCwd.js";
import {
  copyDirectoryToDestination,
  createFile,
  createFolder,
  readFileData,
  removeFile,
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
  backendPreset: 'Nodejs/Express',
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

  protected async cleanUpNonDbFilesConfig(path: string) {
    if (!fs.pathExistsSync(path)) return;

    const Loader = await showLoading();

    try {
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

  public async isNodejsAndExpress(promptInput: ProjectOptions) {
    const {
      projectName,
      backendDatabase,
      stack,
      variant,
      backendDatabaseType,
    } = promptInput;
    const templatePath =
      variant.toLowerCase() === Variant.JS
        ? `/js_support/node_exp/`
        : `/ts_support/node_exp/`;
    const nodeExpDir = path.join("./", SERVER_TEMPLATE_DIR, templatePath);
    const cleanProjectName = cleanUpProjectName(projectName);
    const dest_path = getCwd();

    if (cleanProjectName !== ".") {
      await createFolder(cleanProjectName, dest_path);
    }
    try {
      const projDirPath = `${getCwd()}/${cleanProjectName}`;
      const from = nodeExpDir;
      const to = projDirPath;
      const newPkgJsonPath = `${to}/package.json`;
      const shouldUseDB =
        typeof backendDatabase !== "undefined" ? backendDatabase : false;
      const DBType =
        typeof backendDatabaseType !== "undefined" ? backendDatabaseType : null;

      await copyDirectoryToDestination(from, to);

      const pkgJsonData = (await this.configureNodeExpPkgJson(
        newPkgJsonPath,
        projectName,
        shouldUseDB,
        DBType
      )) as ReturnPackageJson;

      if (pkgJsonData === null && Object.entries(pkgJsonData).length === 0)
        return;

      await this.updateBackendTemplateFiles(
        promptInput,
        DBType as string,
        shouldUseDB,
        to
      );

      console.log("Done..");
    } catch (e: any) {
      logger.error(e);
    }
  }
}

export default SetupBackend;

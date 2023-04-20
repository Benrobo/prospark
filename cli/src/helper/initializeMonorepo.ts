import fs from "fs-extra";
import logger from "../util/logger.js";
import { createFile, createFolder, updateFileContent } from "./file-manager.js";
import sleep from "../util/sleep.js";

const gitIgnoreContent = `
/node_modules

# packages node_modules
/packages/**/node_modules
/packages/**/node_modules
`;

const pkgJsonContent = `{
    "name": "prospark-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "private": true,
    "workspaces": [
        "packages/*"
    ],
    "scripts": {
        "test": "",
        "start": "cd packages/{{proj_type}} && node ./dist/server.js",
        "{{proj_type}}": "yarn workspace {{proj_name}} run dev",
        "build": "yarn workspaces run build",
        "watch": "yarn workspaces run watch"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
`;

const readmeMdContent = `
Project scaffolded with *create-prospark-app*
`;

export default class InitializeMonorepo {
  public constructor() {}

  public async yarnWorkspace(
    projectName: string,
    dest_path: string,
    stack: string
  ): Promise<string> {
    try {
      if (!fs.pathExists(dest_path)) {
        logger.error(`Workspace destination path ${dest_path} does not exist`);
        return "";
      }

      const sanitizedProjName = projectName.replace(/\s/g, "").toLowerCase();
      const PATH = dest_path;
      const workspaceFolderName = "packages";
      const projType = stack === "backend" ? "api" : "app";

      // add contents to this files.
      const updatedPkgjsonCont = pkgJsonContent
        .replace(/{{proj_type}}/g, projType)
        .replace(/{{proj_name}}/g, sanitizedProjName);

      createFolder(workspaceFolderName, PATH);
      createFile(PATH, ".gitignore", gitIgnoreContent);
      createFile(PATH, "README.md", readmeMdContent);
      createFile(PATH, "package.json", updatedPkgjsonCont);

      // create `proj-type` workspace folder
      createFolder(projType, `${PATH}/${workspaceFolderName}`);
      createFolder("ui", `${PATH}/${workspaceFolderName}`);

      await sleep(1);

      createFile(
        `${PATH}/${workspaceFolderName}/ui`,
        "README.md",
        `## UI components.`
      );

      const fullWorkspacePath = `${PATH}/${workspaceFolderName}`;
      return fullWorkspacePath;
    } catch (e: any) {
      logger.error(`Error setting yarn workspace: ${e.message}`);
      return "";
    }
  }
}

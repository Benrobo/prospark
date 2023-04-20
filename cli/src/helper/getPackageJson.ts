import path from "path";
import fs from "fs-extra";
import getCwd from "../util/getCwd.js";
import logger from "../util/logger.js";

export interface ReturnPackageJson {
  name: string;
  version: string;
  main: string;
  scripts: {
    [key: string]: string;
  };
  keywords: string[];
  author: string;
  license: string;
  description: string;
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
  prisma?: object;
}

function getPackageJsonData(): ReturnPackageJson {
  const cwd = getCwd();
  const packageJson = path.join(cwd, "package.json");
  const packageJsonData = fs.readJsonSync(packageJson);
  return packageJsonData;
}

export default getPackageJsonData;

export function getPackageJsonDataFromPath(
  path: string
): ReturnPackageJson | null {
  const isValidPath = fs.pathExistsSync(path as string);

  try {
    if (!isValidPath) return null;
    const data = fs.readJsonSync(path);
    return data;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

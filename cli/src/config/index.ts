import path from "path";
import { fileURLToPath } from "url";

export const SCRIPT_TITLE = "ProSpark";

// client and server templates
const tempDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "templates"
);
export const CLIENT_TEMPLATE_DIR = `${tempDir}/client`;
export const SERVER_TEMPLATE_DIR = `${tempDir}/server`;

import ProjectOptions from "../@types/project.js";
import SetupBackend from "./projectSetup/setup_backend.js";
import SetupFrontend from "./projectSetup/setup_frontend.js";

function parsePrompt(promptInput: ProjectOptions) {
  const { stack } = promptInput;
  if (stack === "frontend") new SetupFrontend(promptInput);
  if (stack === "backend") new SetupBackend(promptInput);
}

export default parsePrompt;

import ProjectOptions from "../@types/project.js";
import SetupBackend from "./projectSetup/setup_backend.js";
import SetupFrontend from "./projectSetup/setup_frontend.js";
import setupFullStack from "./projectSetup/setup_fullstack.js";

/**
 * 
 * @param promptInput 
 * 
{
    projectName: 'my-project-name',
    projectType: 'Blank',
    architecture: 'Poly-repo',
    stack: 'fullstack',
    variant: 'Javascript',
    backendRestWithJavascript: 'Nodejs && Express',
    backendDatabase: true,
    backendDatabaseType: 'Mongodb'
}
*/




function parsePrompt(promptInput: ProjectOptions) {
    const { stack } = promptInput;

    if (stack === "frontend") {
        return new SetupFrontend(promptInput);
    }
    if (stack === "backend") {
        return new SetupBackend(promptInput);
    }
    if (stack === "fullstack") {
        return setupFullStack(promptInput);
    }

}

export default parsePrompt

import ProjectOptions from "../../@types/project.js";



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


function setupFrontend(promptInput: ProjectOptions){

    const {variant} = promptInput;

    variant.toLowerCase() === "javascript" && handleJavascriptSetup(promptInput);
    variant.toLowerCase() === "typescript" && handleTypescriptSetup(promptInput);
}

export default setupFrontend

function handleJavascriptSetup(promptInput: ProjectOptions){
    const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
    
    
}

function handleTypescriptSetup(promptInput: ProjectOptions){
    const {projectName, projectType, architecture, stack, variant, frontendFramework, frontendStyling} = promptInput;
    console.log("TS SUPPORT")
}

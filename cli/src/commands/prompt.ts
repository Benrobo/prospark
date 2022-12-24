import inquirer from "inquirer";
import scaffoldQuestions from "../util/questions.js";
import parsePrompt from "../helper/parsePrompt.js";


function initializePrompt(){
    inquirer.prompt(scaffoldQuestions).then((answers) => {
        parsePrompt(answers)
    });
}

export default initializePrompt
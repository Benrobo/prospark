import inquirer from "inquirer";
import scaffoldQuestions from "../util/questions.js";


function initializePrompt(){
    inquirer.prompt(scaffoldQuestions).then((answers) => {
        console.log(answers);
    });
}

export default initializePrompt
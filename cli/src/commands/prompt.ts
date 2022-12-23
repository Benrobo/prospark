import inquirer from "inquirer";
import inquirerQestions from "../util/questions.js";


function startPrompt(){
    inquirer.prompt(inquirerQestions).then((answers) => {
        console.log(answers);
    });
}

export default startPrompt
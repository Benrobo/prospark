import { SCRIPT_TITLE } from "../config/index.js";
import figlet from "figlet";
import useGradinent from "./useGradient.js";


function renderTitle(){

    const figletConfig : any = {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    };

    useGradinent({
        title: figlet.textSync(SCRIPT_TITLE, figletConfig)
    })
}

export default renderTitle
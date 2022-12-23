import { SCRIPT_TITLE } from "../config";
import gradient from "gradient-string";
import figlet from "figlet";



const poimandresTheme = {
    blue: "#add7ff",
    cyan: "#89ddff",
    green: "#5de4c7",
    magenta: "#fae4fc",
    red: "#d0679d",
    yellow: "#fffac2",
};

function useGradinent(title: any){
    const titleColor = Object.values(poimandresTheme)
    const prosparkTitle = gradient(titleColor)(title);
    console.log(prosparkTitle)
}

function renderTitle(){

    const figletConfig : any = {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    };

    useGradinent(figlet.textSync(SCRIPT_TITLE, figletConfig))
}

export default renderTitle
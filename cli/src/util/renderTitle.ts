import { SCRIPT_TITLE } from "../config/index.js";
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

const color2 = {
    red: "red",
    blue: "blue",
    cyan: "cyan"
}

function useGradinent(title: any){
    const titleColor = Object.values(color2)
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
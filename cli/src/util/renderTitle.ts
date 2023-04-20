import { SCRIPT_TITLE } from "../config/index.js";
import figlet from "figlet";
import useGradinent from "./useGradient.js";
import chalk from "chalk";

function renderTitle() {
  const figletConfig: any = {
    font: "big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  };

  useGradinent({
    title: figlet.textSync("Prospark", figletConfig),
  });
}

export default renderTitle;

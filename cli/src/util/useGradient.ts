import gradient from "gradient-string";
import figlet from "figlet";

interface UseGradient {
  title: string;
  colors?: string[];
}

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
  cyan: "cyan",
};

const useGradinent = (opt: UseGradient): void => {
  const titleColor = opt.colors ?? Object.values(color2);
  const prosparkTitle = gradient(titleColor)(opt.title ?? "");
  console.log(prosparkTitle);
};

export default useGradinent;

import gradient from "gradient-string";
import figlet from "figlet";

interface UseGradient {
  title: string;
  colors?: string[];
}

const color2 = {
  red: "#FF0900",
  orange: "#FF7F00",
  yellow: "#FFEF00",
  blue: "#0079FF",
};

const useGradinent = (opt: UseGradient): void => {
  const titleColor = opt.colors ?? Object.values(color2);
  const prosparkTitle = gradient(titleColor)(opt.title ?? "");
  console.log(prosparkTitle);
};

export default useGradinent;

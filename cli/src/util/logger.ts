import chalk from "chalk";

const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args) + "\n");
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args) + "\n");
  },
  info(...args: unknown[]) {
    console.log(chalk.cyan(...args) + "\n");
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args) + "\n");
  },
};

export default logger;
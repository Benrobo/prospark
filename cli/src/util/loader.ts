import ora from "ora";

async function showLoading() {
  let spinner: any;
  return {
    start: (message: string) => {
      spinner = ora(message).start();
    },
    stop: (successMessage?: string | null, errorMessage?: string | null) => {
      if (spinner) {
        if (errorMessage) {
          spinner.fail(errorMessage);
        } else {
          spinner.succeed(successMessage);
        }
      }
    },
  };
}

export default showLoading;

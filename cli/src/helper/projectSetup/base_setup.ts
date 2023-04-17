import ProjectOptions from "../../@types/project.js";
import chalk from "chalk";
import inquirer from "inquirer";
import showLoading from "../../util/loader.js";
import {
  APP_SVELTE,
  COUNTER_SVELTE,
  NEXT_INDEX_JS,
  REACT_APP_JSX,
  REACT_INDEX_HTML,
  SVELTE_INDEX_HTML,
  VANILLA_CSS_CONTENT,
} from "../../data/template.js";
import {
  createFolder,
  createFile,
  updateFileContent,
} from "../../helper/file-manager.js";
import pretty from "pretty";
import logger from "../../util/logger.js";
import { getPackageJsonDataFromPath } from "../../helper/getPackageJson.js";
import getPkgVersion from "../../helper/getPkgVersion.js";
import { SCRIPT_TITLE } from "../../config/index.js";

class ProjectBaseSetup {
  protected scaffoldDesc = "Scaffolded using prospark";

  protected getIndexScriptExt(promptInput: ProjectOptions) {
    const { frontendFramework, variant } = promptInput;
    const combo = `${frontendFramework}-${variant}`.toLowerCase();
    let fileExt = "";
    switch (combo) {
      case "react-javascript":
        fileExt = "jsx";
        break;
      case "react-typescript":
        fileExt = "tsx";
        break;
      case "svelte-javascript":
        fileExt = "js";
        break;
      case "svelte-typescript":
        fileExt = "ts";
        break;
      case "nextjs-javascript":
        fileExt = "js";
        break;
      case "nextjs-typescript":
        fileExt = "tsx";
        break;
      case "vanilla-javascript":
        fileExt = "js";
        break;
      case "vanilla-typescript":
        fileExt = "ts";
        break;
      default:
        logger.error(`invalid framework and variant `);
        break;
    }
    return fileExt;
  }

  public async askDependenciesInstalled() {
    const ans = await inquirer.prompt([
      {
        type: "confirm",
        name: "shouldInstall",
        message: "Install npm dependencies?:",
        prefix: chalk.greenBright("\n?"),
      },
    ]);

    return ans.shouldInstall;
  }

  public async askForGitInit() {
    const ans = await inquirer.prompt([
      {
        type: "confirm",
        name: "shouldInit",
        message: "Initialize git reppository?:",
        prefix: chalk.greenBright("\n?"),
      },
    ]);

    return ans.shouldInit;
  }

  public showWelcomeMessage(
    vanillSetupMessage: string,
    hasInstalled: boolean,
    projectName: string,
    dest_path: string
  ) {
    // show welcome message
    console.log(
      chalk.cyanBright(
        hasInstalled
          ? vanillSetupMessage
              .replace("{{to}}", dest_path)
              .replace("{{projectName}}", projectName)
              .replace("{{command}}", "npm run dev")
          : vanillSetupMessage
              .replace("{{to}}", dest_path)
              .replace("{{projectName}}", projectName)
              .replace("{{command}}", `npm install\nnpm run dev`)
      )
    );
  }

  protected async configureReactPkgJson(
    path: string,
    projectName: string,
    styling: string
  ) {
    const loader = await showLoading();
    try {
      const pkgJsonData = getPackageJsonDataFromPath(path);

      pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName;
      pkgJsonData["description"] = this.scaffoldDesc;

      loader.start("updating package.json...");

      if (styling === "tailwindcss") {
        let tailwindcss = await getPkgVersion("tailwindcss"),
          postcss = await getPkgVersion("postcss"),
          autoprefixer = await getPkgVersion("autoprefixer");

        pkgJsonData["devDependencies"] = {
          ...pkgJsonData["devDependencies"],
          tailwindcss: tailwindcss,
          postcss: postcss,
          autoprefixer: autoprefixer,
        };
      }

      loader.stop("package.json updated.", null);

      return pkgJsonData;
    } catch (e: any) {
      loader.stop(null, e.message);
      logger.error(e);
      return null;
    }
  }

  protected async configureNextjsPkgJson(
    path: string,
    projectName: string,
    styling: string
  ) {
    const loader = await showLoading();
    try {
      const pkgJsonData = getPackageJsonDataFromPath(path);

      pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName;
      pkgJsonData["description"] = this.scaffoldDesc;

      loader.start("updating package.json...");

      if (styling === "tailwindcss") {
        let tailwindcss = await getPkgVersion("tailwindcss"),
          postcss = await getPkgVersion("postcss"),
          autoprefixer = await getPkgVersion("autoprefixer");

        pkgJsonData["devDependencies"] = {
          ...pkgJsonData["devDependencies"],
          tailwindcss: tailwindcss,
          postcss: postcss,
          autoprefixer: autoprefixer,
        };
      }

      loader.stop("package.json updated.", null);

      return pkgJsonData;
    } catch (e: any) {
      console.log("hey", e);
      loader.stop(null, e.message);
      logger.error(e);
      return null;
    }
  }

  protected async configureSveltePkgJson(
    path: string,
    projectName: string,
    styling: string
  ) {
    const loader = await showLoading();
    try {
      const pkgJsonData = getPackageJsonDataFromPath(path);

      pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName;
      pkgJsonData["description"] = this.scaffoldDesc;

      loader.start("updating package.json...");

      if (styling === "tailwindcss") {
        let tailwindcss = await getPkgVersion("tailwindcss"),
          postcss = await getPkgVersion("postcss"),
          autoprefixer = await getPkgVersion("autoprefixer");

        pkgJsonData["devDependencies"] = {
          ...pkgJsonData["devDependencies"],
          tailwindcss: tailwindcss,
          postcss: postcss,
          autoprefixer: autoprefixer,
        };
      }

      loader.stop("package.json updated.", null);

      return pkgJsonData;
    } catch (e: any) {
      loader.stop(null, e.message);
      logger.error(e);
      return null;
    }
  }

  public async setupCssModule(promptInput: ProjectOptions, dest_path: string) {
    const { frontendFramework, variant } = promptInput;
    const Loader = await showLoading();
    if (
      frontendFramework?.toLowerCase() === "vanilla" &&
      variant.toLowerCase() === "javascript"
    ) {
      const styleDir = `${dest_path}/styles`;
      const styleFile = `main.css`;
      const styleContent = VANILLA_CSS_CONTENT;

      Loader.start("setting up css module...");
      // create directory
      await createFolder("styles", dest_path);
      // setup css module file
      createFile(styleDir, styleFile, styleContent);
      Loader.stop("css module setuped successfully.", null);
    }
    if (
      frontendFramework?.toLowerCase() === "vanilla" &&
      variant.toLowerCase() === "typescript"
    ) {
      const styleDir = `${dest_path}/src/styles`;
      const styleFile = `main.css`;
      const styleContent = VANILLA_CSS_CONTENT;

      Loader.start("setting up css module...");
      // console.log(dest_path+"/src")
      // create directory
      await createFolder("styles", dest_path + "/src");
      // setup css module file
      createFile(styleDir, styleFile, styleContent);
      Loader.stop("css module setuped successfully.", null);
    }
  }

  public async updateFrameworkTemplateFiles(
    promptInput: ProjectOptions,
    dest_path: string
  ) {
    const { frontendFramework, variant, frontendStyling } = promptInput;
    const mainDir = `${dest_path}`;
    const fileExt = this.getIndexScriptExt(promptInput);
    const appJsx = mainDir + `/src/App.${fileExt}`,
      nextIndexJs = mainDir + `/pages/index.${fileExt}`,
      htmlFile = mainDir + `/index.html`,
      appSvelte = mainDir + `/src/App.svelte`,
      counterSvelte = mainDir + `/src/lib/Counter.svelte`,
      svelteHtmlFile = mainDir + `/index.html`;
    if (frontendFramework?.toLowerCase() === "react") {
      try {
        if (frontendStyling === "tailwindcss") {
          const AppJsx = REACT_APP_JSX.replace("{{styling}}", "").replace(
            "{{markup_content}}",
            `
                    <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-blue-400 text-[#fff] ">
                        <h3 className="text-white-200 text-[25px] font-extrabold">React(${variant}) + Tailwindcss</h3>
                        <br />
                        <button className='px-4 py-2 rounded-md bg-blue-600' onClick={() => setCount((count) => count + 1)}>
                            count is {count}
                        </button>
                        <br />
                    </div>
                    `
          );

          const reactIndexHtml = REACT_INDEX_HTML.replace(
            "{{title}}",
            "Prospark App"
          ).replace("{{script_link}}", `./src/main.${fileExt}`);

          await updateFileContent(appJsx, pretty(AppJsx), false);
          await updateFileContent(htmlFile, pretty(reactIndexHtml), false);
        }

        if (frontendStyling === "css module") {
          const AppJsx = REACT_APP_JSX.replace(
            "{{styling}}",
            "import './App.css'\n"
          ).replace(
            "{{markup_content}}",
            `
                    <div className="card">
                        <h3>React(${variant}) + CssModule</h3>
                        <br />
                        <button onClick={() => setCount((count) => count + 1)}>
                            count is {count}
                        </button>
                        <br />
                    </div>
                    `
          );

          const reactIndexHtml = REACT_INDEX_HTML.replace(
            "{{title}}",
            "Prospark App"
          ).replace("{{script_link}}", `./src/main.${fileExt}`);

          await updateFileContent(appJsx, pretty(AppJsx), false);
          await updateFileContent(htmlFile, pretty(reactIndexHtml), false);
        }
      } catch (e: any) {
        logger.error(e);
      }
    }
    if (frontendFramework?.toLowerCase() === "svelte") {
      try {
        if (frontendStyling === "tailwindcss") {
          const CounterSvelte = COUNTER_SVELTE.replace(
            "{{styling}}",
            'class="px-3 py-2 rounded-md text-[#fff] bg-[#535bf2] mt-4 "'
          );

          const AppSvelte = APP_SVELTE.replace(
            "{{markup}}",
            `
                    <div class="w-full h-[100vh] flex flex-col items-center justify-center bg-[#242424] ">
                    <h3 class="text-[#fff] text-[25px] font-bold">Svelte(${variant}) + Tailwindcss</h3>
                        <div class="card">
                            <Counter />
                        </div>
                        <br />
                    </div>
                    `
          );

          const svelteIndexHtmlCont = SVELTE_INDEX_HTML.replace(
            "{{title}}",
            "Prospark App"
          ).replace("{{script_link}}", `./src/main.${fileExt}`);

          await updateFileContent(counterSvelte, pretty(CounterSvelte), false);
          await updateFileContent(appSvelte, pretty(AppSvelte), false);
          await updateFileContent(
            svelteHtmlFile,
            pretty(svelteIndexHtmlCont),
            false
          );
        }

        if (frontendStyling === "css module") {
          const CounterSvelte = COUNTER_SVELTE.replace("{{styling}}", "");

          const AppSvelte = APP_SVELTE.replace(
            "{{markup}}",
            `
            <h3 class="heading">Svelte(${variant}) + CssModule</h3>
            <Counter />
            `
          );

          const svelteIndexHtmlCont = SVELTE_INDEX_HTML.replace(
            "{{title}}",
            "Prospark App"
          ).replace("{{script_link}}", `./src/main.${fileExt}`);

          await updateFileContent(counterSvelte, pretty(CounterSvelte), false);
          await updateFileContent(appSvelte, pretty(AppSvelte), false);
          await updateFileContent(
            svelteHtmlFile,
            pretty(svelteIndexHtmlCont),
            false
          );
        }
      } catch (e: any) {
        logger.error(e);
      }
    }

    if (frontendFramework?.toLowerCase() === "nextjs") {
      try {
        if (frontendStyling === "tailwindcss") {
          const IndexJs = NEXT_INDEX_JS.replace(
            "{{markup_content}}",
            `
                        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-blue-400 text-[#fff] ">
                            <h3 className="text-white-200 text-[25px] font-extrabold">Nextjs(${variant}) + Tailwindcss</h3>
                            <br />
                            <button className='px-4 py-2 rounded-md bg-blue-600' onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </button>
                            <br />
                        </div>
                        `
          );

          await updateFileContent(nextIndexJs, pretty(IndexJs), false);
        }

        if (frontendStyling === "css module") {
          const IndexJs = NEXT_INDEX_JS.replace(
            "{{styling}}",
            "import style './styles/Home.module.css'\n"
          ).replace(
            "{{markup_content}}",
            `
                    <div className="card">
                        <h3>Nextjs(${variant}) + CssModule</h3>
                        <br />
                        <button onClick={() => setCount((count) => count + 1)}>
                            count is {count}
                        </button>
                        <br />
                    </div>
                    `
          );

          await updateFileContent(nextIndexJs, pretty(IndexJs), false);
        }
      } catch (e: any) {
        logger.error(e);
      }
    }
  }
}

export default ProjectBaseSetup;

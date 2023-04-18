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
  removeFile,
  emptyDirectory,
} from "../../helper/file-manager.js";
import pretty from "pretty";
import logger from "../../util/logger.js";
import {
  ReturnPackageJson,
  getPackageJsonDataFromPath,
} from "../../helper/getPackageJson.js";
import getPkgVersion from "../../helper/getPkgVersion.js";
import { SCRIPT_TITLE } from "../../config/index.js";
import {
  NodeExp_APP_JS,
  NodeExp_ENV,
  NodeExp_ENV_CONT,
  NodeExp_MongoDb_DB_ENV_PROP,
  PRISMA_SCHEMA,
} from "../../data/backend_templates.js";

class ProjectBaseSetup {
  protected scaffoldDesc = "Scaffolded using prospark";

  protected getFrontendFileExt(promptInput: ProjectOptions) {
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

  protected getBackendFileExt(promptInput: ProjectOptions) {
    const { backendPreset, variant } = promptInput;
    const combo = `${backendPreset}-${variant}`.toLowerCase();
    let fileExt = "";
    switch (combo) {
      case "nodejs/express-javascript":
        fileExt = "js";
        break;
      case "nodejs/express-typescript":
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
      const pkgJsonData = getPackageJsonDataFromPath(path) as ReturnPackageJson;

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
      const pkgJsonData = getPackageJsonDataFromPath(path) as ReturnPackageJson;

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
      const pkgJsonData = getPackageJsonDataFromPath(path) as ReturnPackageJson;

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

  protected async configureNodeExpPkgJson(
    path: string,
    projectName: string,
    shouldUseDB: boolean,
    databaseType: string | null
  ) {
    const loader = await showLoading();
    try {
      const pkgJsonData = getPackageJsonDataFromPath(path) as ReturnPackageJson;

      if (!shouldUseDB) {
        if (
          typeof pkgJsonData.dependencies !== "undefined" &&
          typeof pkgJsonData.devDependencies !== "undefined"
        )
          delete pkgJsonData.dependencies["mongoose"];
        delete pkgJsonData.devDependencies["prisma"];
        delete pkgJsonData.scripts["migrate:prisma"];
      }

      if (shouldUseDB && databaseType?.toLowerCase() === "mongodb") {
        delete pkgJsonData.devDependencies["prisma"];
        delete pkgJsonData.scripts["migrate:prisma"];
      }

      pkgJsonData["name"] = projectName === "." ? SCRIPT_TITLE : projectName;
      pkgJsonData["description"] = this.scaffoldDesc;

      loader.start("updating package.json...");

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
    const fileExt = this.getFrontendFileExt(promptInput);
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
          const IndexJs = NEXT_INDEX_JS.replace("{{container_style}}", `"App"`)
            .replace("{{styling}}", "")
            .replace(
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
            "{{container_style}}",
            "{style.main}"
          )
            .replace(
              "{{styling}}",
              "import style from '../styles/Home.module.css'\n"
            )
            .replace(
              "{{markup_content}}",
              `
                    <div className="card">
                        <h3>Nextjs(${variant}) + CssModule</h3>
                        <br />
                        <button style={{padding: "10px 25px",borderRadius: 10,border: "none",outline: "none",color: "#fff",backgroundColor: "#0070f3",cursor: "pointer",fontSize: 15}} onClick={() => setCount((count) => count + 1)}>
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

  public async updateBackendTemplateFiles(
    promptInput: ProjectOptions,
    DBType: string,
    shouldUseDB: boolean,
    dest_path: string
  ) {
    const {} = promptInput;
    const mainDir = `${dest_path}`;
    const fileExt = this.getBackendFileExt(promptInput);

    // * Files to be updated / deleted.
    const prismaFolder = mainDir + `/prisma`;
    const appJs = mainDir + `/src/app.${fileExt}`,
      mongodbJs = mainDir + `/src/config/mongodb.${fileExt}`,
      prismaSchema = mainDir + `/prisma/schema.prisma`,
      envJs = mainDir + `/src/config/env.${fileExt}`;

    let envContent = "";

    if (!shouldUseDB) {
      // remove every db config file.
      removeFile(mainDir + `/src/config`, `mongodb.${fileExt}`);
      removeFile(mainDir + `/src/config`, `prisma.${fileExt}`);
      // * create .env file
      envContent = NodeExp_ENV_CONT.replace("{{DB_URL}}", "");
      createFile(dest_path, ".env", envContent);
    }

    if (shouldUseDB) {
      if (DBType.toLowerCase() === "mongodb") {
        try {
          // * remove prisma config file first
          removeFile(mainDir + `/src/config`, `prisma.${fileExt}`);
          emptyDirectory(prismaFolder);

          const dbConnMethodImport = `const connectMongodb = require("./config/mongodb.js")`,
            connMethodCall = `connectMongodb(ENV.mongoUrl)`,
            localConnUrl = `const LOCAL_DB_CONN = "mongodb://localhost:27020/prospark-db";`;

          //* create .env file
          envContent = NodeExp_ENV_CONT.replace(
            "{{DB_URL}}",
            "mongodb://localhost:27020/prospark-db"
          );
          createFile(dest_path, ".env", envContent);

          // * update connection db method and env props
          const updatedAppjs = NodeExp_APP_JS.replace(
            "{{db_conn_method_import}}",
            dbConnMethodImport
          ).replace("{{init_db_func_call}}", connMethodCall);

          const updatedEnv = NodeExp_ENV.replace(
            "{{LOCAL_CONN_URL}}",
            localConnUrl
          ).replace("{{DB_ENV_PROP}}", NodeExp_MongoDb_DB_ENV_PROP);

          await updateFileContent(appJs, updatedAppjs);
          await updateFileContent(envJs, updatedEnv);
        } catch (e) {
          logger.error(e);
        }
      }
      if (
        DBType.toLowerCase() === "mysql" ||
        DBType.toLowerCase() === "postgresql"
      ) {
        try {
          // * remove mongodb config file first
          removeFile(mainDir + `/src/config`, `mongodb.${fileExt}`);

          //* create .env file
          const DB_URL =
            DBType.toLowerCase() === "mysql"
              ? "DATABASE_URL='mysql://root:@localhost:3306/prospark-db'"
              : "DATABASE_URL='postgresql://root:@localhost:5432/prospark-db'";
          envContent = NodeExp_ENV_CONT.replace("{{DB_URL}}", DB_URL);
          createFile(dest_path, ".env", envContent);

          const prismaProvider = `provider     = "${DBType.toLowerCase()}"`,
            prismaRelationMode =
              DBType.toLowerCase() === "mysql" ? `relationMode = "prisma"` : "";

          // * update connection db method and env props
          const updatedPrismajs = PRISMA_SCHEMA.replace(
            "{{provider}}",
            prismaProvider
          ).replace("{{relationMode}}", prismaRelationMode);

          await updateFileContent(prismaSchema, updatedPrismajs);
        } catch (e) {
          logger.error(e);
        }
      }
    }
  }
}

export default ProjectBaseSetup;

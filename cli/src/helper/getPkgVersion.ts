
import { execSync } from "child_process";
import { execa } from "execa";
import logger from "../util/logger.js";


async function getPkgVersion(pkg_name: string) {
    try {
        const version = await execa("npm", ["view", pkg_name, "version"]);
        return version?.stdout.trim();
    } catch (e: any) {
        logger.error(e)
    }
}

export default getPkgVersion


// function checkForLatestVersion(pkg: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//         https.get(
//             `https://registry.npmjs.org/-/pkg/${pkg}/dist-tags`,
//             (res) => {
//                 if (res.statusCode !== 200) {
//                     reject();
//                     return;
//                 }

//                 let body = '';
//                 res.on('data', (data) => (body += data));
//                 res.on('end', () => {
//                     try {
//                         const latestVersion = JSON.parse(body).latest;
//                         resolve(latestVersion);
//                     } catch (e) {
//                         console.log(e)
//                         reject(e);
//                     }
//                 });
//             }
//         ).on('error', (error) => {
//             logger.error('Unable to check for latest version.', error);
//             reject(error);
//         });
//     });
// }
import checkPackageVersion from "./helper/checkPackageVersion";
import renderTitle from "./util/renderTitle";





async function run(){
    // renderTitle()

    const res = checkPackageVersion("create-vite")

    console.log(res)
}

run()
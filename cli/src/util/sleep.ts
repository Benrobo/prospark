

function sleep(sec: number){
    return new Promise((res)=>{
        setTimeout(res, sec * 1000)
    })
}

export default sleep;
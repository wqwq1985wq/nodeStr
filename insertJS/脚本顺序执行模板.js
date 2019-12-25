
let run = function(cb)
{
    console.log("test1..........")
    setTimeout(() => {
        console.log("test1 over..........")
        cb && cb()
    }, 3000);
}

exports.run = run; 
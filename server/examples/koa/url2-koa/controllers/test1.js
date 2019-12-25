
var users = require("../users")
var fn_test1 = async (ctx, next) => {
    console.log("get test1 process")
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};
var fn_test2 = async (ctx, next) => {
    console.log("process test1")
    //http://localhost:3000/test1?name=root1&pass=1
    // console.log(ctx.querystring); // color=blue&size=small
    // console.log(ctx.query); // { color: 'blue', size: 'small' }
    let params = ctx.query
    var name = params.name
    //用户名至少要有
    if(params && params.name && params.pass)
    {
        var pass = users[params.name]
        if(!pass)
        {
            console.log(`登录失败，用户${params.name}不存在`)
            ctx.response.body = {
                ret:2
            }
            return;
        }
        if( pass != params.pass)
        {
            console.log(`登录失败，用户${params.name}密码错误`)
            ctx.response.body = {
                ret:1
            }
            return;
        }
    }else if(params && params.name && params.name.startsWith("wq")){
        // console.log(`wq系列登录`)
    }else{
        console.log(`登录失败,没有填用户名或者密码`)
        ctx.response.body = {
            ret:1
        }
        return;
    }
    
    
    console.log(`用户${name}登录成功`)
    ctx.response.body = ctx.response.body = {
        ret:0
    }
};
module.exports = {
    'GET /test1/:name': fn_test1,
    'GET /test1/': fn_test2
};

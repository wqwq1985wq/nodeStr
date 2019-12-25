// index:
//http://localhost:3000/login?name=111&pass=123
const url = require('url');
module.exports = {
    'GET /login': async (ctx, next) => {
        console.log("login process")
        let location = url.parse(ctx.url, true);
        console.log(location)
        var name = location.query.name
        var pass = location.query.pass
        if (name && name == "wq1") {
            ctx.response.type = 'text/html';
            let str = JSON.stringify({ret:0,name:name})
            ctx.response.body = str;
        } else {
            ctx.response.type = 'text/html';
            let str = JSON.stringify({ret:1,name:name})
            ctx.response.body = str;
            //跳转到别的页面处理
            // ctx.response.redirect('/signin');
        }
    }
};

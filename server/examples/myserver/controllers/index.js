// index:
//http://localhost:3000/login?name=111&pass=123
const url = require('url');
module.exports = {
    'GET /index': async (ctx, next) => {
        console.log("index process")
        let location = url.parse(ctx.url, true);
        console.log(location)
        var name = location.query.name
        var pass = location.query.pass
        ctx.response.type = 'text/html';
        ctx.response.body = `hello${name}`;
    }
};

const url = require('url');

const ws = require('ws');

const Cookies = require('cookies');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');


const WebSocketServer = ws.Server;

const app = new Koa();

// log request URL:
// http://localhost:3000/?name=111&pass=123
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    
    await next();
});

// parse user from cookie:
app.use(async (ctx, next) => {
    await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));


// add controller middleware:
app.use(controller());

let server = app.listen(3001);
console.log('app started at port 3000...');
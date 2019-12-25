const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

//middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
//如果一个middleware没有调用await next()，后续的middleware将不再执行了
// 例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
    console.log("4444")
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    console.log("11111")
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    console.log("2222")
    await next();
    console.log("3333")
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});



app.listen(3000);
console.log('app started at port 3000...');
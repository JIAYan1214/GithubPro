const koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const dev = process.env.NODE_ENV!='producton';
const app = next({
    dev
});
const handle = app.getRequestHandler();

    const server = new koa();
    app.prepare().then(()=>{
        const server = new koa();
        server.use(async (ctx,next)=>{
            await next();
        })
        server.use(async (ctx,next)=>{
            await handle(ctx.req,ctx.res);
            ctx.respond = false
        })
        server.listen(3000,()=>{
            console.log('koa server listening on 3000');
        })
    })
    // const router = new Router();
    // router.get('/test/:id',(ctx)=>{
    //     // ctx.body = `<p>request /test${ctx.params.id}</p>`;
    //     //若是返回json格式
    //     ctx.body = {success:true};
    //     ctx.set('header','application/json');
    // })
    // //koa中间键 核心方法
    // server.use(async (ctx,next)=>{
    //     await next();//执行下一个中间件
    // });

    // server.use(router.routes());
    
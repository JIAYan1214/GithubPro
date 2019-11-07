const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
//auth授权
const auth = require('./server/auth');
//git api
const api = require('./server/api');
//post请求的数据处理；
const KoaBody = require('koa-body');
//atob，markdown 转换成文本格式
const atob = require('atob');

const RedisSessionStore = require('./server/session-store');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


//创建redis   client
const redis = new Redis();
//设置nodejs 全局增加一个atob方法
global.atob = atob;

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    server.keys = ['YAN develop github App'];
    //post请求的数据处理；
    //ctx的request中可以获取到请求的body
    server.use(KoaBody());
    const SESSION_CONFIG = {
        key: 'Yan',
        // maxAge:10*1000,//过期时间
        store: new RedisSessionStore(redis)
    };
    server.use(session(SESSION_CONFIG, server))
    //处理github oAuth登录
    auth(server);
    api(server);

    server.use(async (ctx,next)=>{
        // console.log('session is:',ctx.session)
        await next();
    })

    router.get('/a/:id', async (ctx) => {
        const id = ctx.params.id;
        await handle(ctx.req, ctx.res, {
            path: '/a',
            query: {
                id
            },
        });
        ctx.respond = false;
    });
    /**
     * 2.增加一个api获取用户info
     */
    router.get('/api/user/info', async (ctx) => {
        const user = ctx.session.userInfo;
        if(!user){
            ctx.status = 401;
            ctx.body = '用户需要先登录';
        }else {
            ctx.body = user;
            ctx.set('Content-type','application/json');
        }



    });
    /***
     * 1.测试获取用户信息--begin
     */
    /*router.get('/delete/user', async (ctx) => {
        ctx.session = null;
        ctx.body = 'set session success';
    });

    router.get('/set/user', async (ctx) => {
        ctx.session.user = {
            name: 'Yan',
            age: 20
        };
        ctx.body = 'set session success';
    });*/
    /***
     * 测试获取用户信息--end
     */
    server.use(router.routes());

    //koa中间键 核心方法
    server.use(async (ctx, next) => {
        // ctx.cookies.set('id','userid:xxxx')
        //
        ctx.req.session = ctx.session;
        await handle(ctx.req, ctx.res);
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('koa server listening on 3000');
    })
})

    
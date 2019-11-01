const axios = require('axios')
const Router = require('koa-router')

const { requestGithub } = require('../lib/api')

const github_base_url = 'https://api.github.com'

module.exports = server => {
    server.use(async (ctx, next) => {
        const path = ctx.path
        const method = ctx.method

        if (path.startsWith('/github/')) {
            console.log(ctx.request.body)
            const session = ctx.session
            const githubAuth = session && session.githubAuth
            const headers = {}
            if (githubAuth && githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${
                    githubAuth.access_token
                    }`
            }
            const result = await requestGithub(
                method,
                ctx.url.replace('/github/', '/'),
                ctx.request.body || {},
                headers,
            )

            ctx.status = result.status
            ctx.body = result.data
        } else {
            await next()
        }
    })
}
/*
版本1
module.exports= (server)=>{
    server.use(async(ctx,next)=>{
        const path = ctx.path;
        if(path.startsWith('/github/')){
            console.log('api session:',ctx.session)
            const githubAuth = ctx.session.githubAuth;
            const githubPath = `${GITHUB_BASE_URL}${ctx.url.replace('/github/','/')}`;
            const token = githubAuth && githubAuth.access_token;
            let headers = {};
            if(token){
                headers['Authorization'] = `${githubAuth.token_type} ${token}`;
            }
            try {
                const result = await axios({
                    method:'GET',
                    url:githubPath
                });
                if(result.status===200){
                    ctx.body = result.data;
                    ctx.set('Content-type','application/json');
                }else{
                    ctx.status = result.status;
                    ctx.body = {
                        success:false,
                    }
                    ctx.set('Content-type','application/json');
                }
            }catch (e) {
                console.error(e)
                ctx.body = {
                    success:false,
                }
                ctx.set('Content-type','application/json');
            }

        }else{
            await next();
        }
    })
}*/

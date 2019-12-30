/**
 * 处理gitInitialProps种，请求接口得相关服务
 **/
/**
 * 请求
 * @param method 请求方式
 * @param url 请求地址
 * @param data 请求参数
 * @param req
 * @param res
 */
const axios = require('axios')

const github_base_url = 'https://api.github.com'

async function requestGithub(method, url, data, headers) {
    return await axios({
        method,
        url: `${github_base_url}${url}`,
        data,
        headers,
    })
}

const isServer = typeof window === 'undefined';
async function request({ method = 'GET', url, data = {} }, req, res) {
    console.log('request--')
    if (!url) {
        throw Error('url must provide')
    }
    if (isServer) {
        const session = req && req.session || {}
        const githubAuth = session.githubAuth || {}
        const headers = {}
        if (githubAuth&&githubAuth.access_token) {
            headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
        }
        return await requestGithub(method, url, data, headers)
    } else {
        // /search/respos
        return await axios({
            method,
            url: `/github${url}`,
            data,
        })
    }
}

module.exports = {
    request,
    requestGithub,
}
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'user';
const client_id='73fe338f59903dc1fece';
module.exports = {
    github:{
        request_token_url:'https://github.com/login/oauth/access_token',
        client_id,
        client_secret:'55e3a2bd6bd0bbfa62dd29e1a49b7a01c638e4bc'
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL:`${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
}
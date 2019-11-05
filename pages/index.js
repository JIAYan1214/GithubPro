import { useEffect } from 'react';
import {Icon,Tabs} from 'antd';
import getConfig from 'next/config';
import {connect} from 'react-redux';
import Router,{ withRouter } from 'next/router';
//缓存
import LRU from 'lru-cache';
//仓库概述组件
import Repo from '../components/Repo';

const cache = new LRU({
    maxAge:1000*60*10,//缓存10分钟
})

const api = require('../lib/api');
const {publicRuntimeConfig} = getConfig();
//判断是否是服务端渲染
const isServer = typeof window==='undefined';

//缓存数据
// let cachedUserRepos,cachedUserStarredRepos;
 function Index({userRepos,userStarredRepos,user,router}) {
     const tabsKey = router.query.key || '1';
     if(!user || !user.id){
         return (
             <div className="root">
                 <p>您还未登录哦！</p>
                 <a className="login-btn" href={publicRuntimeConfig.OAUTH_URL}>点击登录</a>
                 <style jsx>
                     {`
                        .root{
                            height:400px;
                            display:flex;
                            flex-direction:column;
                            justify-content:center;
                            align-items:center;
                        }
                        .login-btn{
                            line-height:32px;
                            display:inline-block;
                            font-weight:400;
                            white-space:nowrap;
                            color: #fff;
                            background-color: #1890ff;
                            border-color: #1890ff;
                            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
                            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
                            cursor: pointer;
                            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                            user-select: none;
                            touch-action: manipulation;
                            height: 32px;
                            padding: 0 15px;
                            font-size: 14px;
                            border-radius: 4px;
                        }
                     `}
                 </style>
             </div>
         )
     }
     const handleTabsEvent = (tabsKey)=>{
         Router.push(`/?key=${tabsKey}`)
     };

     useEffect(()=>{
         if(!isServer){
             // cachedUserRepos = userRepos;
             // cachedUserStarredRepos = userStarredRepos;
             if(userRepos){
                 cache.set('userRepos',userRepos);
             }
             if(userStarredRepos){
                 cache.set('userStarredRepos',userStarredRepos);
             }
         }
     },[])

     return(
         <div className="root">
             <div className="user-info">
                 <img src={user.avatar_url} alt="user avatar" className="avatar"/>
                 <span className="login">{user.login}</span>
                 <span className="name">{user.name}</span>
                 <span className="bio">{user.bio}</span>
                 <p className="email">
                     <Icon type="mail" style={{marginRight:'10px'}}/>
                     <a href={`mailto:${user.email}`}>{user.email}</a>
                 </p>
             </div>
             <div className={"user-repos"}>

                 <Tabs defaultActiveKey={tabsKey} animated={false} onChange={handleTabsEvent}>
                     <Tabs.TabPane tab="仓库" key="1">
                         {
                             userRepos.map((item, ind) => <Repo repo={item} key={item.id}/>)
                         }
                     </Tabs.TabPane>
                     <Tabs.TabPane tab="关注的仓库" key="2">
                         {
                             userStarredRepos.map((item, ind) => <Repo repo={item} key={item.id}/>)
                         }
                     </Tabs.TabPane>
                 </Tabs>
             </div>
             <style jsx>
                 {`
                 .root{
                    display:flex;
                    align-items:flex-start;
                    padding:20px 0;
                 }
                 .user-info{
                    display:flex;
                    width:200px;
                    margin-right:40px;
                    flex-shrink:0;//禁止被压缩
                    flex-direction:column;
                    justify-content:center;
                 }
                 .login{
                    font-weight:800;
                    font-size:20px;
                    margin-top:20px;
                 }
                 .name{
                    font-size:16px;
                    color:#777;
                 }
                 .bio{
                    margin-top:20px;
                    color:#333;
                 }
                 .avatar{
                    width:100%;
                    border-radius:5px;
                 }
                 .user-repos{
                    flex-grow:1;
                 }
                 `}
             </style>
         </div>
     )
 }

 //getInitialProps页面进入的时候，调用
 Index.getInitialProps = async({ctx,reduxStore})=> {
     /*const result = axios.get('/github/search/repositories?q=react').then(res=>{
         console.log(res);
     },error=>{
         console.error(error)
     })*/
     //以上代码简化为封装后得request
     //ctx：服务端渲染得是和，有req，res
     // console.log(ctx)
     // const result = await api.request({url:`/search/repositories?q=react`},ctx.req,ctx.res);
     //判断用户是否登录
     const user = reduxStore.getState().user;
     if(!user  || !user.id){
         return {
             isLogin:false
         }
     }
     //不是服务端渲染的时候，进行存储，因为node环境下，会共享全局变量。
     if(!isServer){
         //如果有暂存的数据则
         if(cache.get('userRepos')&&cache.get('userStarredRepos')){
             return{
                 isLogin:true,
                 userRepos:cache.get('userRepos'),
                 userStarredRepos:cache.get('userStarredRepos')
             }
         }
         /*if(cachedUserRepos&& cachedUserStarredRepos){
             return{
                 isLogin:true,
                 userRepos:cachedUserRepos,
                 userStarredRepos:cachedUserStarredRepos
             }
         }*/
     }



     //用户所有的仓库
     const userRepos = await api.request({url:`/user/repos`},ctx.req,ctx.res);
     //自己创建的仓库
     const userStarredRepos = await api.request({url:`/user/starred`},ctx.req,ctx.res);

     return {
         isLogin:true,
         userRepos:userRepos.data,
         userStarredRepos:userStarredRepos.data
     }
 }
export default withRouter(connect(
    function mapState(state) {
        // console.log(state)
        return {
            user:state.user
        }
    }
)(Index));
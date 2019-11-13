import {useEffect} from 'react';
import Link from 'next/Link';
import {withRouter} from 'next/router';
import Repo from './Repo';
import api from '../lib/api';
import {get,cache} from '../lib/repo-basic-cache';
function makeQuery(queryObj){
    const query = Object.entries(queryObj).reduce((result,entry)=>{
        result.push(entry.join('='));
        return result;
    },[]).join('&');
    return `?${query}`;
}

/**
 *
 * @param Comp 组件
 * @param type 组件类型
 * @returns {*}
 */
const isServer = typeof window==='undefined';
export default function (Comp,type='index') {
    function WithDetail({repoBasic,router,...reset}) {
        useEffect(()=>{
            if(!isServer){
                cache(repoBasic);
            }
        })
        return (
            <div className="root">
                <div className="repo-basic">
                    <Repo repo={repoBasic}/>
                    <div className="tabs">
                        {
                            type === 'index'? <span className="tab">Readme</span> : <Link href={`/detail${makeQuery(router.query)}`}>
                                <a className="tab index">Readme</a>
                            </Link>
                        }
                        {
                            type==='issues' ? <span className="tab">Issues</span> : <Link href={`/detail/issues${makeQuery(router.query)}`}>
                                <a className="tab issues">Issues</a>
                            </Link>
                        }
                    </div>
                </div>
                <div><Comp {...reset}/></div>
                <style jsx>{`
                .root{
                    padding:20px 0;
                }
                .repo-basic{
                    padding:20px 0;
                    border:1px solid #eee;
                    margin-bottom:20px;
                    border-radius:5px;
                }
                .tab + .tab{
                    margin-left:20px;
                }
            `}</style>
            </div>
        )
    }
    WithDetail.getInitialProps=async(context)=>{
        // console.log(ctx)
        const {ctx} =context;
        const {owner,name} = ctx.query;
        //获取缓存数据
        const full_name = `${owner}/${name}`;

        let pageData ={};
        if(Comp.getInitialProps){
            pageData = await Comp.getInitialProps(context);
        }
        //数据缓存存在
        if(get(full_name)){
            return {
                repoBasic:get(full_name),
                ...pageData
            }
        }
        //没有找到对应的缓存数据
        const repoBasic = await api.request({url:`/repos/${owner}/${name}`},ctx.req,ctx.res);
        //缓存数据
        if(!isServer){
            cache(repoBasic.data);
        }
        return {
            repoBasic:repoBasic.data,
            ...pageData
        }
    }
    return withRouter(WithDetail);
}
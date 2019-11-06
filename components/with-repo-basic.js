import Link from 'next/Link';
import {withRouter} from 'next/router';
import Repo from './Repo';
import api from '../lib/api';

function makeQuery(queryObj){
    const query = Object.entries(queryObj).reduce((result,entry)=>{
        result.push(entry.join('='));
        return result;
    },[]).join('&');
    return `?${query}`;
}
export default function (Comp) {
    function WithDetail({repoBasic,router}) {
        return (
            <div className="root">
                <div className="repo-basic">
                    <Repo repo={repoBasic}/>
                    <div className="tabs">
                        <Link href={`/detail${makeQuery(router.query)}`}>
                            <a className="tab index">Readme</a>
                        </Link>
                        <Link href={`/detail/issues${makeQuery(router.query)}`}>
                            <a className="tab issues">Issues</a>
                        </Link>
                    </div>
                </div>
                <div><Comp/></div>
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
    WithDetail.getInitialProps=async({ctx})=>{
        // console.log(ctx)
        const {owner,name} = ctx.query;
        const repoBasic = await api.request({url:`/repos/${owner}/${name}`},ctx.req,ctx.res);
        return {
            repoBasic:repoBasic.data,
        }
    }
    return withRouter(WithDetail);
}
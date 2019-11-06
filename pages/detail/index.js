import withRepoBasic from '../../components/with-repo-basic';

function Detail(){
    return(
        <span>detail Index</span>
    )
}
Detail.getInitialProps = async({ctx})=>{
    return {
        test:123
    }
}
/*
import Link from 'next/Link';
import Repo from '../../components/Repo';
import api from '../../lib/api';

function makeQuery(queryObj){
    const query = Object.entries(queryObj).reduce((result,entry)=>{
        result.push(entry.join('='));
        return result;
    },[]).join('&');
    return `?${query}`;
}

function Detail({repoBasic,router}) {
    console.log(router)
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
            <div>Readme</div>
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
Detail.getInitialProps=async({ctx,router})=>{
    // console.log(ctx)
    const {owner,name} = ctx.query;
    const repoBasic = await api.request({url:`/repos/${owner}/${name}`},ctx.req,ctx.res);
    return {
        repoBasic:repoBasic.data,
        router
    }
}*/
export default withRepoBasic(Detail);


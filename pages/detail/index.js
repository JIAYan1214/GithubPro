import dynamic from 'next/dynamic';

import withRepoBasic from '../../components/with-repo-basic';

import api from '../../lib/api';
const MarkdownRender = dynamic(
    ()=>import('../../components/MarkdownRender'),
    // {
    //    loading:()=><p>loading...</p>//加载异步组件的时候，给用户友好提示
    // }
);

function Detail({readme}){
    return(
        <MarkdownRender content={readme.content} isBase64={true}/>
    )
}
Detail.getInitialProps = async({ctx:{query,req,res}})=>{

    const readmeRes = await api.request({url:`/repos/${query.owner}/${query.name}/readme`},req,res);
    return {
        readme:readmeRes.data
    }
}

export default withRepoBasic(Detail,'index');


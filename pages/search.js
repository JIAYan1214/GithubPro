import {withRouter} from 'next/router';
import { Row,Col,List } from 'antd';
import Router from 'next/router';
import Link from 'next/Link';
//仓库概述组件
import Repo from '../components/Repo';


const api = require('../lib/api');
/**
 * sort 排序方式
 * order 排序顺序
 * lang 仓库得项目开发语言
 * page分页
 */
const LANGUAGES = ['JavaScript','HTML','CSS','TypeScript','Java','Ruby','C#'];
const SORT_TYPES=[{
    name:'Best Match'
},
    {
        name:'Most Stars',
        value:'stars',
        order:'desc'
    },
    {
        name:'Fewest Stars',
        value:'Stars',
        order:'asc'
    },
    {
        name:'Most forks',
        value:'forks',
        order:'desc'
    },
    {
        name:'Fewest forks',
        value:'forks',
        order:'asc'
    },
    {
        name:'Recently updated',
        value:'updated',
        order:'desc'
    },

];
const selectedStyle= {
    borderLeft:'2px solid #e36209',
    fontWeight:'500'
}
function Search({router,repos}) {
    console.log('search--router',router);
    const {query,lang,sort,order} = router.query;
    const doSearch = (config)=>{
        Router.push({
            pathname:'/search',
            query:config
        })
    }
    /*const handleLangChanges = (language)=>{
        Router.push({
            pathname:'/search',
            query:{
                ...router.query,
                lang:language,
            }
        })
    };
    const handleSortChanges = (sort)=>{
        console.log('sort',sort)
        Router.push({
            pathname:'/search',
            query:{
                ...router.query,
                sort:sort.value,
                order:sort.order
            }
        })
    };*/
    return(
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        style={{marginBottom:'20px'}}
                        dataSource={LANGUAGES}
                        renderItem={ item=>{
                            const selected = lang===item;
                            return (<List.Item style={selected ?selectedStyle :null}>
                                {/*<Link href="/search">*/}
                                    <a onClick={()=>doSearch({query,lang:item,sort,order})}>{item}</a>
                                {/*</Link>*/}
                            </List.Item>)
                        }}
                    />
                    <List
                        bordered
                        header={<span className="list-header">排序</span>}
                        style={{marginBottom:'20px'}}
                        dataSource={SORT_TYPES}
                        renderItem={ item=>{
                            let selected = false;
                            if(item.name==='Best Match' && !sort){
                                selected = true;
                            }else if(item.name===sort &&item.order===order){
                                selected = true;
                            }
                            return (<List.Item style={selected ? selectedStyle : null}>
                                {/*<Link href="/search">*/}
                                    <a onClick={()=>doSearch({query,lang,sort:item.value || '',order:item.order || ''})}>{item.name}</a>
                                {/*</Link>*/}
                            </List.Item>)
                        }}
                    />
                </Col>

            </Row>
            {/*{*/}
                {/*repos.items.map((item,ind)=><Repo repo={item} key={item.id}/>)*/}
            {/*}*/}
            <style jsx>{`
                .root{
                    padding:40px 0;
                }
            `}</style>
        </div>
    )
}

/**
 * 获取搜索条件数据
 * @param ctx
 * @returns {Promise<void>}
 */
Search.getInitialProps= async ({ctx})=>{
    console.log('getInitialProps-ctx',ctx)
    const { query,sort,lang,order,page} = ctx.query;
    if(!query){
        return {
            repos:{
                total_count:0
            }
        }
    }
//?q=react+language:javascript&sort=starts&order=desc&page=2
    let queryString = `?q=${query}`;
    if(lang) queryString += `+language:${lang}`;
    if(sort) queryString += `&sort=${sort}&order=${order || 'desc'}`;
    if(page) queryString += `&page=${page}`;

    const result = await api.request({
        url:`/search/repositories${queryString}`
    });

    return {
        repos :result.data
    }
}
export default withRouter(Search);
/**
 * 自定义_app文件
 * 控制页面初始化；如：
 * 1.当页面变化时保持页面布局
 * 2.当路由变化时保持页面状态
 * 3.使用componentDidCatch自定义处理错误
 * 4.注入额外数据到页面里 (如 GraphQL 查询)
 */
import App,{Container} from 'next/app';
import React from 'react';
import Layout from '../components/Layout';

import 'antd/dist/antd.css';

class MyApp extends App{
    //每次页面切换都执行此方法
    static async getInitialProps({Component,router,ctx}){
        let pageProps={};
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }
        return {pageProps};
    }

    render(){
        const { Component,pageProps } = this.props;
        return (
            <Container>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </Container>
        )
    }
}

export default MyApp;
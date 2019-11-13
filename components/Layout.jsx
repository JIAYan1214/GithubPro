import {Layout} from 'antd';
import Container from './Container';
import LayoutHeader from './LayoutHeader';
import { withRouter } from 'next/router'
import Comp from './Comp';

const  {Content,Footer} = Layout;


function LayoutWrapper ({children}) {
    const footerSty={
        textAlign:'center'
    }

    return (<Layout className="layout">
        <LayoutHeader/>
        <Content>
            {/*render传入的是一个jsx的标签，等同于react.createElement('div')，返回的是一个element类型
            cloneElement：copy一个Element

            */}
            <Container render={<Comp />}>{children}</Container>
        </Content>
        <Footer style={footerSty}>Develop By Yan@<a href="mailto:2056587192@qq.com">2056587192@qq.com</a></Footer>

        <style jsx global>

            {
                `
                body{
                    padding:0;
                    margin:0;
                }
                #__next{
                    height:100%;
                }
                .ant-layout{
                    min-height:100%;
                }
                .ant-layout-header{
                    padding:0;
                }
                .ant-layout-content{
                    background-color:#fff;
                }
                `
            }
        </style>
    </Layout>)
}
export default withRouter(LayoutWrapper);

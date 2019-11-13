import {memo,useMemo} from 'react';

import MarkdownIt from 'markdown-it';
import 'github-markdown-css';
const md = new MarkdownIt({
    html:true,
    linkfy:true//转换链接
});
//解决atob中文乱码
function base64ToUtf8(str){
    return decodeURIComponent(escape(atob(str)))
}
export default memo(function MarkdownRender({content,isBase64}) {
    const mardown = isBase64 ? base64ToUtf8(content) : content;
    const html  = useMemo(()=>md.render(mardown),[mardown]);

    return(
        <div className="markdown-body"><div dangerouslySetInnerHTML={{__html:html}}></div></div>
    )
})
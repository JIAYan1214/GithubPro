import withRepoBasic from '../../components/with-repo-basic';

function Detail({test}){
    return(
        <span>detail Index{test}</span>
    )
}
Detail.getInitialProps = async({ctx})=>{
    return {
        test:123
    }
}

export default withRepoBasic(Detail,'index');


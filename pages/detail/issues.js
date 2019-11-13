import withRepoBasic from '../../components/with-repo-basic';

function Issues({test}){
    return(
        <span>Issues Index{test}</span>
    )
}
Issues.getInitialProps = async({ctx})=>{
    return {
        test:123
    }
}

export default withRepoBasic(Issues,'issues');


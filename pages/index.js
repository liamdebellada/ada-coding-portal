import AuthIndex from '../components/auth-index'
import Index from '../components/index'

function Home(props) {
  if (props.globalProps.session) {    
    return (
      <AuthIndex {...props}/>
    )
  } else {
    return (
      <Index {...props}/>
    )
  }
}

export async function getServerSideProps() {
  return {
    props: {
      title : "Ada Nucleus"
    }
  }
}

export default Home

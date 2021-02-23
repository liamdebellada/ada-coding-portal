import {getSession} from 'next-auth/client'
import getDataFromUrl from '../utils/apiHandler'
import AuthIndex from '../components/auth-index'
import Index from '../components/index'

function Home(props) {
  if (props.session) {    
    return (
      <AuthIndex {...props}/>
    )
  } else {
    return (
      <Index {...props}/>
    )
  }
}

export async function getServerSideProps(context) {
  var s = await getSession(context)
  if (s) {
    var staticContent = await getDataFromUrl('http://fbbsvr.ddns.net:5192/api/content/data/challenges')
  } else {
    var staticContent = []
  }
  return {
    props: {
      title : "Ada Nucleus",
      session: s,
      challenges: staticContent
    }
  }
}

export default Home

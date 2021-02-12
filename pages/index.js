import {getSession, session} from 'next-auth/client'
import axios from 'axios'

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
    var challenges = await axios.get('http://fbbsvr.ddns.net:5192/api/content/data/challenges')
    .then(response => {
        if (response.status != 200 ||  response.data.length == 0) {
          return []
        } else {
          return response.data
        }
    })
    .catch(() => {
      return []
    })
  } else {
    var challenges = []
  }

  return {
    props: {
      title : "Ada Nucleas",
      session: s,
      challenges: challenges
    }
  }
}

export default Home

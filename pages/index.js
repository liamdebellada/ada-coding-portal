import {getSession} from 'next-auth/client'

function Home() {
  return (
       <div>
         
         <text>Page content</text>
       </div>
  )
}

export async function getServerSideProps(context) {
  var s = await getSession(context)
  return {
    props: {
      title : "Ada Coding Home",
      session: s
    }
  }
}

export default Home

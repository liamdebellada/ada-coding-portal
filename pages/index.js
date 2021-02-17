import {getSession} from 'next-auth/client'
import getDataFromUrl from '../utils/apiHandler'
import AuthIndex from '../components/auth-index'
import Index from '../components/index'
import axios from 'axios'

import React, { useEffect } from 'react';

function Home(props) {
  useEffect(async () => {
    var token = localStorage.getItem("authToken")
    if (props.session && token == undefined) {
      localStorage.setItem("authToken", props.token)
    }
  }, [])

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
    var authToken = await axios.post('http://fbbsvr.ddns.net:5192/api/retrieveToken', s).then(response => {
      if (response.data) {
        return response.data //NEEDS TO BE FIXED TO REMOVE REPEAT REQUESTS
      }
    }).catch((error) => {
        console.log(error)
        return "error"
    })
  } else {
    var staticContent = []
    var authToken = ""
  }

  return {
    props: {
      title : "Ada Nucleas",
      session: s,
      challenges: staticContent,
      token: authToken
    }
  }
}

export default Home

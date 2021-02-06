import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async session(session, user) {  
        return user
    },
    async signIn(user, account, profile) {
        await axios.post('http://fbbsvr.ddns.net:5192/api/registerCheck', user).then(response => response).catch(error => error)
    },
  }
})
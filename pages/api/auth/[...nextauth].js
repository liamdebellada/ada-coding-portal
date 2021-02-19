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
        var state = await axios.post('http://fbbsvr.ddns.net:5192/api/registerCheck', user)
        .then(response => {
          if (response.status == 200) {
            return true
          } else {
            return false
          }
        }).catch(() => false)
        user.accessToken = account.accessToken
        return state
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    }
  }
})
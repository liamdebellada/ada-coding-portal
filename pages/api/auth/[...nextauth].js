import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],

  secret: process.env.SECRET,

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
      user.refreshToken = account.refreshToken
      return state
    },
    async jwt(token, user) {
      const refreshTime = Date(token.authTime + 60 * 60000);
      if (refreshTime - new Date().getTime() > 0) {
        await axios.post(`https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&refresh_token=${token.refreshToken}&grant_type=refresh_token`, {})
          .then(tokenResponse => {
            console.log(tokenResponse.data.access_token)
            token.accessToken = tokenResponse.data.access_token
          }).catch(error => console.log(error))
      }

      if (user) { //only ran on first login
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
    
      return token
    }
  }
})
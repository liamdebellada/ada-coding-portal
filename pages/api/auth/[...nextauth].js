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
      var state = await axios.post('http://fbbsvr.ddns.net:5192/api/users/registerCheck', {}, {
          headers: {
              'authorization': `Bearer ${account.accessToken}`
          }
      }).then(response => {
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
      var currentTime = new Date().getTime() //ms


      if (token.expiry - currentTime < 0) {
          await axios.post(`https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&refresh_token=${token.refreshToken}&grant_type=refresh_token`, {})
          .then(tokenResponse => {
            token.accessToken = tokenResponse.data.access_token //update access token
            token.expiry = currentTime + 3600000 //update refresh time to be 1h ahead of current time
          }).catch(error => console.log(error))
      }

      if (user) { //only ran on first login
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expiry = new Date().getTime() + 3600000 //login time + 1h = first refresh time
      }
      return token
    }
  }
})
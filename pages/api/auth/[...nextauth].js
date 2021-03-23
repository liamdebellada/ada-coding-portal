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

  pages: {
    error: '/auth/error'
  },

  secret: process.env.HOST,

  callbacks: {
    async session(session, user) {
      return user
    },
    async signIn(user, account, profile) {

      console.log(process.env.HOST);

      var state = await axios.post(`${process.env.HOST}/api/registerCheck`, {}, {
          headers: {
              'authorization': `Bearer ${account.accessToken}`
          }
      }).then((data) => {
          console.log(data);
          return true;
      }).catch((error) => { //catches status codes other than 200 aswell!!
          console.log(error);
          return false
      })

      user.accessToken = account.accessToken
      user.refreshToken = account.refreshToken
      return state;
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
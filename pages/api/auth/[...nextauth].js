import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: "497494013123-lqtk6lafe26khbsg9sgho3rv4fess7vm.apps.googleusercontent.com",
      clientSecret: "8oCGj8ea57K6g4G7yALsb-m1"
    }),
  ],
  callbacks: {
    async session(session, user) {  
        return user
    }
  }
})
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.googleclientid,
            clientSecret: process.env.googleclientsecret
          }),
      ],
      options:{
          site:'http://localhost:6969'
      }
});
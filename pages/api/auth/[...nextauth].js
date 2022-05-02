import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { clientId, clientSecret } from '../../../priv';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.googleclientid || clientId,
            clientSecret: process.env.googleclientsecret || clientSecret,
          }),
      ],
      options:{
          site:'http://localhost:6969'
      }
});
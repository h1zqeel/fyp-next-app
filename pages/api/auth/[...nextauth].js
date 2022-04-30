import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: '914783906742-t3ikor5mk2di2ppg0p6nk8m9cnsj6u8g.apps.googleusercontent.com',
            clientSecret: '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',
            options:{
                site:'http://localhost:6969'
            }
          }),
      ],
      options:{
          site:'http://localhost:6969'
      }
});
import NextAuth from 'next-auth';
import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_DOMAIN!}`,
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/login', 
  },
});
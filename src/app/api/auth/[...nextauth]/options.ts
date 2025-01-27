import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {      

        try {
          const res = await fetch(
            `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/sign-in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
      
          const data = await res.json();

          if (!res.ok || data.status !== "success") {
            console.error("Error from server:", data);
            return null;
          }
      
          const { accessToken, user } = data.data;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }

      return token;
    },

    async session({ session, token }) {
        if(token){
            session.accessToken = token.accessToken;
            session.user = token.user;
        }

      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60 
  },

  secret: process.env.NEXTAUTH_SECRET,
};
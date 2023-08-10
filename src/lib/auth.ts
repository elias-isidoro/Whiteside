import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "./db";
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: "Whiteside",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "text", placeholder: "Password" },
      },

      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if(!credentials?.email || !credentials.password){
          return null
        }

        const user = await db.user.findUnique({
          where:{
            email: credentials.email,
          }
        })

        if(!user || !user.password){
          return null
        }

        const passwordsMatch = await compare(credentials.password, user.password)

        if(!passwordsMatch){
          return null
        }
        
        return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
  ],
  callbacks: {
    async session({token,session}) {
      if(token){
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
        session.user.role = token.role
      }

      return session
    },
    
    async jwt ({token, user}) {

      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
        include:{
          role: true
        }
      })

      if(!dbUser){
        token.id = user!.id
        return token
      }

      const result = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        role: dbUser.role
      }

      return result
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
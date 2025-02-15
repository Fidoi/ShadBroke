import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
import Google from 'next-auth/providers/google';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: 'auth/login',
    newUser: 'auth/register',
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authorized({ auth, request: { nextUrl } }) {
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    session({ session, token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        if (!user.email) {
          throw new Error('El usuario no tiene un correo electrónico válido');
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const createdUser = await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email,
              image: user.image,
            },
          });
          user.id = createdUser.id;
          user.role = existingUser!.role;
        } else {
          user.id = existingUser.id;
          user.role = existingUser.role;
        }
      }
      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password!)) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

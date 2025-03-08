import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
import Google from 'next-auth/providers/google';
import { Role } from '@prisma/client';

interface JWTData {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string | null;
}

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
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.sub = user.id;
        token.data = {
          id: user.id!,
          name: user.name || '',
          email: user.email || '',
          role: (user.role as Role) || 'user',
          image: user.image || null,
        } satisfies JWTData;
      }

      if (trigger === 'update') {
        const updatedUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
          },
        });

        if (updatedUser) {
          token.data = {
            ...(token.data as JWTData),
            ...updatedUser,
            role: updatedUser.role as Role,
          } satisfies JWTData;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = {
        ...(token.data as JWTData),
      } as typeof session.user;

      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        if (!user.email) throw new Error('Email requerido');

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const createdUser = await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email,
              image: user.image,
              role: 'user',
              password: '',
            },
          });
          user.id = createdUser.id;
          user.name = createdUser.name;
          user.image = createdUser.image;
          user.role = createdUser.role;
        } else {
          user.id = existingUser.id;
          user.name = existingUser.name;
          user.image = existingUser.image;
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

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

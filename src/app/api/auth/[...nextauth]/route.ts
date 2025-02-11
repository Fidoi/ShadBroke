import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Proveedor para autenticación local (credenciales)
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'ejemplo@correo.com',
        },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) return null;

        // Validar la contraseña (suponiendo que la contraseña está hasheada)
        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        // Retorna el objeto usuario (NextAuth lo serializa)
        return user;
      },
    }),
    // Proveedor para autenticación con Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin', // Puedes crear una página de inicio de sesión personalizada
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

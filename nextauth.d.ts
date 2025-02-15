import NextAuth, { DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string;
      image?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    data?: DefaultUser & { role: string };
  }
}

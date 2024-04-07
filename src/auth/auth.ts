import { Lucia } from 'lucia';
import { prisma } from '@/db';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

interface IDatabaseUserAttributes {
  username: string;
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: IDatabaseUserAttributes;
  }
}

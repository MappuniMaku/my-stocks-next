import { cache } from 'react';
import type { Session, User } from 'lucia';
import { cookies } from 'next/headers';
import { lucia } from '@/auth/auth';
import { prisma } from '@/db';
import { isEmpty } from '@/helpers';
import { IUser } from '@types';

export const getCurrentSession = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {}
    return result;
  },
);

export const getCurrentUser = cache(async (): Promise<IUser | null> => {
  try {
    const { user } = await getCurrentSession();
    if (isEmpty(user)) {
      return null;
    }
    return prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });
  } catch (err) {
    console.error('Failed to get session user from DB', err);
    return null;
  }
});

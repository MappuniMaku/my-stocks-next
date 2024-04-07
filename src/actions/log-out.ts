'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentSession, lucia } from '@/auth';

export const logOut = async (): Promise<void> => {
  const { session } = await getCurrentSession();
  if (!session) {
    return;
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/log-in');
};

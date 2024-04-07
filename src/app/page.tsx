import { prisma } from '@/db';

export default async function HomePage() {
  const users = await prisma.user.findMany();
  console.log(users);
  return <div>Главная</div>;
}

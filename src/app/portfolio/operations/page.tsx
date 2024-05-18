import { Suspense } from 'react';
import { MdAdd } from 'react-icons/md';
import { redirectUnauthorizedUser } from '@/auth';
import { Button } from '@atoms';
import { Link } from '@nextui-org/react';
import { OperationsList } from '@organisms';

export default async function OperationsPage() {
  const userId = await redirectUnauthorizedUser();

  return (
    <>
      <h1 className="text-3xl font-semibold">Операции</h1>
      <Button
        className="mt-4"
        startContent={<MdAdd />}
        color="primary"
        as={Link}
        href="/portfolio/operations/add"
      >
        Добавить операцию
      </Button>
      <div className="mt-6">
        <Suspense fallback={<p>Загружаем операции...</p>}>
          <OperationsList userId={userId} />
        </Suspense>
      </div>
    </>
  );
}

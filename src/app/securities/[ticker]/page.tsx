import { Suspense } from 'react';
import { SecurityInfo } from '@organisms';

export default async function SecurityPage({ params: { ticker } }: { params: { ticker: string } }) {
  const uppercaseTicker = ticker.toUpperCase();

  return (
    <>
      <h1 className="text-3xl font-semibold">Информация по ценной бумаге {uppercaseTicker}</h1>
      <div className="mt-6">
        <Suspense fallback={<p>Загружаем данные...</p>}>
          <SecurityInfo ticker={uppercaseTicker} />
        </Suspense>
      </div>
    </>
  );
}

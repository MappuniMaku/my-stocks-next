import { SecuritySelect } from '@organisms';

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-semibold">MyStocks</h1>
      <p className="mt-4 text-medium">Добро пожаловать в приложение MyStocks!</p>
      <div className="mt-4">
        <SecuritySelect />
      </div>
    </>
  );
}

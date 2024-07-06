import { FC } from 'react';
import { isNotEmpty } from '@/helpers';
import { IPrice } from '@/types';

export interface IPriceProps {
  price?: IPrice;
}

export const Price: FC<IPriceProps> = ({ price }) => {
  if (!isNotEmpty(price)) {
    return <>&mdash;</>;
  }

  const { amount, currency } = price;

  return (
    <span>
      <span className="font-bold">{(Math.round(amount * 100) / 100).toLocaleString('ru')}</span>
      &nbsp;
      <span className="font-bold uppercase text-gray-500">{currency}</span>
    </span>
  );
};

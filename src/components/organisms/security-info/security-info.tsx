import { FC, ReactNode } from 'react';
import { NOT_FOUND_CODE } from '@/constants';
import { getSecuritySpecification, isNotEmpty } from '@/helpers';
import { Price } from '@atoms';

export interface ISecurityInfoProps {
  ticker: string;
}

export const SecurityInfo: FC<ISecurityInfoProps> = async ({ ticker }) => {
  try {
    const {
      secid,
      name,
      isin,
      typeName,
      groupName,
      listLevel,
      isForQualifiedInvestors,
      price,
      currency,
    } = await getSecuritySpecification(ticker);

    const tableRows: Array<{ name: string; value?: ReactNode }> = [
      { name: 'Тикер', value: secid },
      { name: 'Наименование', value: name },
      { name: 'ИСИН', value: isin },
      { name: 'Тип', value: typeName },
      { name: 'Группа', value: groupName },
      { name: 'Уровень листинга', value: listLevel },
      { name: 'Квал.', value: isForQualifiedInvestors ? '+' : '-' },
      {
        name: 'Цена',
        value: (
          <Price
            price={
              isNotEmpty(price) && isNotEmpty(currency) ? { amount: price, currency } : undefined
            }
          />
        ),
      },
    ];

    return (
      <table>
        <tbody>
          {tableRows.map(({ name, value }) => (
            <tr key={name}>
              <td className="border-1 border-gray-300 p-2">{name}</td>
              <td className="border-1 border-gray-300 p-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } catch (err: any) {
    console.error('Failed to load security page', err);
    if (err.message === NOT_FOUND_CODE) {
      return <div>Ценная бумага с тикером {ticker} не найдена</div>;
    }

    return <div>Произошла ошибка. Попробуйте обновить страницу</div>;
  }
};

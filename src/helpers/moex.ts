import { NOT_FOUND_CODE } from '@/constants';
import {
  IGetSecurityMetaDataResponse,
  IGetSecuritySpecificationResponse,
  ISecurityMetaData,
  ISecuritySpecification,
  ISecurityType,
} from '@types';

export const queryMoex = async <T>(url: string): Promise<T> => {
  const baseUrl = 'https://iss.moex.com/iss';
  const result = await fetch(`${baseUrl}/${url}.json`);

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return result.json();
};

export const getValueFromDataItem = (
  data: Array<never[]>,
  key: string,
): string | number | boolean | undefined => {
  const targetItem = data.find((item) => item[0] === key);
  if (targetItem === undefined) {
    return undefined;
  }

  const valueType = targetItem[3] as 'string' | 'number' | 'boolean';
  const value = targetItem[2];
  if (value === null) {
    return undefined;
  }

  switch (valueType) {
    case 'string':
      return value;
    case 'number':
      return Number(value);
    case 'boolean':
      return Boolean(Number(value));
  }
};

export const getValueFromColumnsData = (
  columns: string[],
  dataRow: never[],
  key: string,
): string | number | boolean | undefined => {
  const targetKeyIndex = columns.findIndex((col) => col === key);
  return dataRow[targetKeyIndex] ?? undefined;
};

export const getSecurityMetaData = async (ticker: string): Promise<ISecurityMetaData> => {
  const response = await queryMoex<IGetSecurityMetaDataResponse>(`securities/${ticker}`);
  const {
    description: { data: descriptionData },
    boards: { columns: boardsColumns, data: boardsData },
  } = response ?? {};

  const primaryBoardData = boardsData.find((board) =>
    Boolean(Number(getValueFromColumnsData(boardsColumns, board, 'is_primary'))),
  );

  if (descriptionData.length === 0 || primaryBoardData === undefined) {
    throw new Error(NOT_FOUND_CODE);
  }

  return {
    engine: getValueFromColumnsData(boardsColumns, primaryBoardData, 'engine') as string,
    market: getValueFromColumnsData(boardsColumns, primaryBoardData, 'market') as string,
    boardId: getValueFromColumnsData(boardsColumns, primaryBoardData, 'boardid') as string,
    currency: getValueFromColumnsData(boardsColumns, primaryBoardData, 'currencyid') as string,
    descriptionData,
  };
};

export const getSecuritySpecification = async (ticker: string): Promise<ISecuritySpecification> => {
  const { engine, market, boardId, currency, descriptionData } = await getSecurityMetaData(ticker);

  const marketResponse = await queryMoex<IGetSecuritySpecificationResponse>(
    `engines/${engine}/markets/${market}/securities/${ticker}`,
  );
  const { columns: marketColumns, data: marketData } = marketResponse?.marketdata ?? {};
  const primaryMarketDataRow =
    marketData.find((row) => getValueFromColumnsData(marketColumns, row, 'BOARDID') === boardId) ??
    [];

  const result = {
    secid: getValueFromDataItem(descriptionData, 'SECID') as string,
    name: getValueFromDataItem(descriptionData, 'NAME') as string,
    isin: getValueFromDataItem(descriptionData, 'ISIN') as string,
    listLevel: getValueFromDataItem(descriptionData, 'LISTLEVEL') as string,
    group: getValueFromDataItem(descriptionData, 'GROUP') as string,
    groupName: getValueFromDataItem(descriptionData, 'GROUPNAME') as string,
    type: getValueFromDataItem(descriptionData, 'TYPE') as ISecurityType,
    typeName: getValueFromDataItem(descriptionData, 'TYPENAME') as string,
    isForQualifiedInvestors: getValueFromDataItem(
      descriptionData,
      'ISQUALIFIEDINVESTORS',
    ) as boolean,
    price: (getValueFromColumnsData(marketColumns, primaryMarketDataRow, 'LAST') ||
      getValueFromColumnsData(marketColumns, primaryMarketDataRow, 'MARKETPRICE')) as number,
    currency,
  };

  if (result.type === 'ofz_bond' && result.price !== undefined) {
    result.price = result.price * 10;
  }

  return result;
};

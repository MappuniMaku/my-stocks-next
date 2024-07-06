export interface ISecurity {
  secid: string;
  name: string;
  isin: string;
}

export type ISecurityType =
  | 'common_share'
  | 'preferred_share'
  | 'ofz_bond'
  | 'exchange_bond'
  | 'exchange_ppif'
  | 'etf_ppif';

export interface IGetSecurityMetaDataResponse {
  description: {
    data: Array<never[]>;
  };
  boards: {
    columns: string[];
    data: Array<never[]>;
  };
}

export interface ISecurityMetaData {
  engine: string;
  market: string;
  boardId: string;
  currency: string;
  descriptionData: Array<never[]>;
}

export interface IGetSecuritySpecificationResponse {
  marketdata: {
    columns: string[];
    data: Array<never[]>;
  };
}

export interface ISecuritySpecification extends ISecurity {
  listLevel: string;
  group: string;
  groupName: string;
  type: ISecurityType;
  typeName: string;
  isForQualifiedInvestors: boolean;
  price?: number;
  currency: string;
}

export interface IGetSecuritiesResponse {
  securities: {
    columns: string[];
    data: Array<never[]>;
  };
}

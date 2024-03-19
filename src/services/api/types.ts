export interface IUserInfo {
  userId: number;
  email: string;
  roleName: string;
  roleType: string;
}

export interface IUser {
  accessToken: string;
  refreshToken: string;
  enableTfa: number;
  needVerified: number;
  user: IUserInfo;
}

export interface ICryptoPair {
  id: number;
  marketId: string;
  marketName: string;
  baseCurrency: string;
  marketCurrency: string;
  marketCurrencyLong: string;
  ceiling: string;
  floor: string;
  baseIncrement: string;
}

export interface IMarketInfo {
  title: string;
  list: ICryptoPair[];
}

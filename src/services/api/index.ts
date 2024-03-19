import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {IMarketInfo, IUser} from './types';
import {useUserStore} from '../../store/user';
const baseUrl = 'https://sso-backend.tokenize-dev.com';
const marketBaseUrl = 'https://api.tokenize-dev.com';

const getHeaders = async () => {
  const userAgent = await DeviceInfo.getUserAgent();
  const deviceId = DeviceInfo.getDeviceId();
  let headers: Record<string, string> = {
    // eslint-disable-next-line prettier/prettier
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=utf-8',
    'TOK-DEVICE-ID': deviceId,
  };
  if (userAgent) {
    headers['user-agent'] = userAgent;
  }
  const accessToken = useUserStore.getState().accessToken;
  if (accessToken) {
    headers['access-token'] = accessToken;
  }
  return headers;
};

export const login = async (
  email: string,
  password: string,
): Promise<IUser | void> => {
  const header = await getHeaders();
  const configuration = {
    method: 'post',
    url: `${baseUrl}/auth/login`,
    header,
    data: {
      email,
      password,
      captcha: 'internal_testing_captcha',
    },
  };
  try {
    const response = await axios(configuration);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// export const fetchMarketSummaries = async () => {
//   const header = await getHeaders();
//   const configuration = {
//     method: 'get',
//     url: `${baseUrl}/public/v1/market/get-summaries`,
//     header,
//   };
//   try {
//     const response = await axios(configuration);
//     console.log(response.data);
//   } catch (error) {
//     console.log('error', {error});
//   }
// };

export const fetchMarket = async (): Promise<IMarketInfo[] | void> => {
  const header = await getHeaders();
  const configuration = {
    method: 'get',
    url: `${marketBaseUrl}/mobile-api/market/getmarkets`,
    header,
  };
  try {
    const response = await axios(configuration);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

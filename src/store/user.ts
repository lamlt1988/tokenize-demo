import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  userId?: number;
  email?: string;
  accessToken?: string;
}

const initialState: UserState = {
  userId: undefined,
  email: undefined,
  accessToken: undefined,
};

export const useUserStore = create<UserState, [['zustand/persist', UserState]]>(
  persist(() => initialState, {
    name: 'user',
    storage: createJSONStorage(() => AsyncStorage),
    partialize(state) {
      return {
        accessToken: state.accessToken,
      };
    },
  }),
);

export const setAccessToken = (accessToken: string) => {
  useUserStore.setState({accessToken});
};
export const selectAccessToken = (state: UserState) => state.accessToken;

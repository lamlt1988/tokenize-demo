import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  isSavePassword: boolean;
  password: string;
  email: string;
}

const initialState: AppState = {
  isSavePassword: false,
  password: '',
  email: '',
};

export const useAppStore = create<AppState, [['zustand/persist', AppState]]>(
  persist(() => initialState, {
    name: 'app',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
export const setIsSavePassword = (isSavePassword: boolean) => {
  useAppStore.setState({isSavePassword});
};
export const selectIsSavePassword = (state: AppState) => state.isSavePassword;

export const savePassword = (password: string) => {
  useAppStore.setState({password});
};

export const selectPassword = (state: AppState) => state.password;

export const saveEmail = (email: string) => {
  useAppStore.setState({email});
};

export const selectEmail = (state: AppState) => state.email;

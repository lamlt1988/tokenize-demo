import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as localeEn from '../../assets/locales/en.json';

export const i18nInit = () => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: localeEn,
      },
    },
  });
};

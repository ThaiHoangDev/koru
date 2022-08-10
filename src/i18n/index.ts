import { initReactI18next } from 'react-i18next';
import i18n, { i18n as i18nInterface } from 'i18next';

export const DEFAULT_LOCALE = 'en';

export interface ILanguage {
  [index: string]: any;
}

export const loadLanguageAsync = async (lang: string, i18n: i18nInterface) => {
  if (i18n.hasResourceBundle(lang, 'default')) {
    return i18n.changeLanguage(lang);
  }

  return loadLocalLanguage(lang).then((value: { default: object }) => {
    Object.entries(value.default).forEach(([k, v]) => {
      i18n.addResourceBundle(lang, k, v);
    });
    return setI18nLanguage(lang, i18n);
  });
};

export const setI18nLanguage = function (lang: string, i18n: i18nInterface) {
  i18n.changeLanguage(lang);
};

export const loadLocalLanguage = async (lang: string) => {
  const languages: ILanguage = {
    de: await import('./locales/de'),
    en: await import('./locales/en'),
  };
  return languages[lang];
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: [],
    resources: {},
    lng: DEFAULT_LOCALE,
    keySeparator: '.', // we do not use keys in form messages.welcome
    fallbackLng: DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false, // react already safes from xss,
      format: function (value, format) {
        if (format === 'uppercase') {
          return value.toUpperCase();
        }
        return value;
      },
    },
  });

export default i18n;

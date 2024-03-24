import { GetStaticPropsContext } from 'next';
import i18nConfig from '../../next-i18next.config';

const getI18nPaths = () => i18nConfig.i18n.locales.map(locale => ({ params: { locale } }));

export const getStaticPaths = () => {
  return {
    paths: getI18nPaths(),
    fallback: false,
  };
};

export const getLocale = (ctx: GetStaticPropsContext): Language => {
  if (ctx.locale) return ctx.locale as Language;
  const localeParams = ctx.params?.locale ?? i18nConfig.i18n.defaultLocale;
  return (Array.isArray(localeParams) ? localeParams[0] : localeParams) as Language;
};

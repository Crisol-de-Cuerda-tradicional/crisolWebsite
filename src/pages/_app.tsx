import type { AppProps } from 'next/app';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { Layout, MenuContextProvider } from '@components';
import { useLocale } from '@hooks';

import '../components/Navbar/Burger.scss';
import '@styles/globals.css';

config.autoAddCss = false;

dayjs.extend(advancedFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

function MyApp({ Component, pageProps }: AppProps) {
  const locale = useLocale();
  dayjs.locale(locale);

  return (
    <MenuContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MenuContextProvider>
  );
}

export default MyApp;

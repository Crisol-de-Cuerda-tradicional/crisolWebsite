import type { AppProps } from 'next/app';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Layout, MenuContextProvider } from '@components';
import { useLocale } from '@hooks';
import { fontVariables } from '@styles/fonts';

import '@styles/globals.css';
import '../components/Navbar/Burger.scss';

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
      <main className={fontVariables}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </MenuContextProvider>
  );
}

export default MyApp;

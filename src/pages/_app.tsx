import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import { MenuContextProvider } from '@components';

import '@components/Navbar/Burger.scss';
import '@styles/globals.css';

config.autoAddCss = false;

dayjs.extend(advancedFormat);
dayjs.extend(LocalizedFormat);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  dayjs.locale(router.locale);

  return (
    <MenuContextProvider>
      <Component {...pageProps} />
    </MenuContextProvider>
  );
}

export default MyApp;

import '../styles/globals.css';
import '../components/Navbar/Burger.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

dayjs.extend(advancedFormat);
dayjs.extend(LocalizedFormat);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  dayjs.locale(router.locale);

  return <Component {...pageProps} />;
}

export default MyApp;

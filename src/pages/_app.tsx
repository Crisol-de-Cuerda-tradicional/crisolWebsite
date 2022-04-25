import '../styles/globals.css';
import '../components/Navbar/Burger.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

dayjs.extend(advancedFormat);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  dayjs.locale(router.locale);

  return <Component {...pageProps} />;
}

export default MyApp;

import type { AppProps } from "next/app";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/es";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Montserrat } from "next/font/google";

import { Layout, MenuContextProvider } from "@components";
import { useLocale } from "@hooks";

import "@styles/globals.css";
import "../components/Navbar/Burger.scss";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-headings",
  weight: ["300", "700"],
  display: "swap",
  preload: true,
  style: ["normal"],
  fallback: ["sans-serif"],
});
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
      {/* This is to check the staging environment */}
      <div>
        <h1>Staging Environment</h1>
        <p>This is a staging environment</p>
      </div>
      <main className={montserrat.variable}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </MenuContextProvider>
  );
}

export default MyApp;

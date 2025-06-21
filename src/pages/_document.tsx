import { baseUrl } from '@utils/baseUrl';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import { shouldRenderVideo } from '@hooks';
import i18nextConfig from '../../next-i18next.config';

class MyDocument extends Document {
  shouldLoadVideo: boolean = false;

  componentDidMount(): void {
    this.shouldLoadVideo = shouldRenderVideo();
  }

  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.query.locale?.toString() || i18nextConfig.i18n.defaultLocale;
    return (
      <Html lang={currentLocale}>
        <Head>
          {/* Basic Metadata */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Crisol de Cuerda is a traditional violin, cello, guitar and flute music camp celebrated in Spain"
          />

          {/* Favicon and App Icons */}
          <link rel="icon" href={baseUrl('/favicon.png')} />
          <link rel="apple-touch-icon" sizes="180x180" href={baseUrl('/favicon.png')} />

          {/* Preload Critical Resources */}
          {this.shouldLoadVideo ? (
            <link
              rel="preload"
              as="image"
              fetchPriority="high"
              href={baseUrl('/images/video_poster.webp')}
            />
          ) : null}

          {/* Structural Metadata */}
          <meta name="theme-color" content="#6b2810" />
          <meta name="robots" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

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
          <meta
            name="description"
            content="Crisol de Cuerda is a traditional violin, cello, guitar and fulte music camp celebrated in Spain"
          />
          <link rel="icon" href={baseUrl('/favicon.png')} />
          {this.shouldLoadVideo ? (
            <link
              rel="preload"
              as="image"
              fetchPriority="high"
              href={baseUrl('/images/video_poster.webp')}
            />
          ) : null}
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

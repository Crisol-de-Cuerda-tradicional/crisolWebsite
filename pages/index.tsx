import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Crisol de Cuerda Tradicional</title>
        <meta
          name="description"
          content="Crisol de Cuerda is a traditional violin, cello, guitar and fulte music camp celebrated in Spain"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>Hello World</div>
    </div>
  );
};

export default Home;

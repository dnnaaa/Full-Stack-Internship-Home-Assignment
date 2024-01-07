import Head from 'next/head'
import "@/styles/globals.css";
import "@/styles/test.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DNA Engineering Full-Stack Assignment</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

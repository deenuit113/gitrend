import type { AppProps } from "next/app";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <html lang="ko"></html>
            <Head>
                <title>Gitrend</title>
                <link rel="icon" href="/wcag.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

import { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument () {
    return(
        <Html lang="ko">
            <Head>
                <link rel="icon" href="/wcag.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

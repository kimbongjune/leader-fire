import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;

  return (
    <Html lang="en">
      <Head>
        {/* 카카오 지도 */}
        {/* <Script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing`}></Script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

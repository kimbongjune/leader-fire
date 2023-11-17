import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterPages from 'next-query-params/pages';
import { theme } from '../theme';
import { Provider } from 'react-redux';
import { store, persistor } from '../app/store';
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate를 불러옵니다
import GlobalFunctionHandler from '../features/global/GlobalFunctionHandler';
import useDeviceType from '@/hooks/useDeviceType';

export default function App({ Component, pageProps }: any) {
  const deviceType = useDeviceType();
  if (!deviceType) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme} resetCSS>
          <QueryParamProvider adapter={NextAdapterPages}>
          <GlobalFunctionHandler />
            <Component {...pageProps} deviceType={deviceType} />
          </QueryParamProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

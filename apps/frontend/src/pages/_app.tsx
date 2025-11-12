import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.css";
import {
  AppCacheProvider,
  DocumentHeadTagsProps,
} from "@mui/material-nextjs/v16-pagesRouter";
import { DocumentProps } from "next/dist/pages/_document";

export default function MyApp(
  { Component, pageProps }: AppProps,
  props: DocumentProps & DocumentHeadTagsProps
) {
  return (
    <AppCacheProvider {...props}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AppCacheProvider>
  );
}

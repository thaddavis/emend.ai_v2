import "@/styles/normalize.css";
import "@/styles/globals.css";
import "@/styles/custom.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
// import AuthRoute from "../components/AuthRoute";
function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

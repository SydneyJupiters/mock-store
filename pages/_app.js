import '../styles/globals.scss';
import Layout from '../components/layout';
import { CartProvider } from '../contexts/cartContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

import { CategoryMenu } from './components/CategoryMenu';
import ClientOnly from './components/ClientOnly';
import { ComeBack } from './components/ComeTop';
import { FetchData } from './components/FetchData';
import { Header } from './components/Header';
import { Hero3 } from './components/Hero';
import Loader from './components/Loader';
import { ProductMenu } from './components/ProductMenu';
import ModalsProvider from './providers/ModalsProvider';
import {
  getCategories,
  getGeneralData,
  getProducts,
  getStates,
  getTypePagaments,
} from './services';

export default async function Home() {
  const [product, category, typePagament, states, generalData] =
    await Promise.all([
      getProducts(),
      getCategories(),
      getTypePagaments(),
      getStates(),
      getGeneralData(),
    ]);

  return (
    <ClientOnly>
      <main id='hero'>
        <Header />
        <Hero3 />
        <CategoryMenu />
        <ProductMenu />
        <ComeBack />
        <ModalsProvider />
        <FetchData
          category={category}
          generalData={generalData}
          products={product}
          states={states}
          typePagament={typePagament}
        />
      </main>
    </ClientOnly>
  );
}

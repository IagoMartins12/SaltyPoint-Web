import { CategoryMenu } from './components/CategoryMenu';
import ClientOnly from './components/ClientOnly';
import { ComeBack } from './components/ComeTop';
import { FetchData } from './components/FetchData';
import { Header } from './components/Header';
import { Hero3 } from './components/Hero';
import Loader from './components/Loader';
import { ProductMenu } from './components/ProductMenu';
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

  if (!product || !category || !typePagament || !states || !generalData) {
    return <Loader />;
  }
  return (
    <ClientOnly>
      <main id='hero'>
        <FetchData
          category={category}
          generalData={generalData}
          products={product}
          states={states}
          typePagament={typePagament}
        />

        <Header />
        <Hero3 />
        <CategoryMenu />
        <ProductMenu />
        <ComeBack />
      </main>
    </ClientOnly>
  );
}

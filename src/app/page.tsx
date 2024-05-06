import { CategoryMenu } from './components/CategoryMenu';
import { ComeBack } from './components/ComeTop';
import FetchData from './components/FetchData';
import { Header } from './components/Header';
import { Hero3 } from './components/Hero';
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
    <>
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
        <ModalsProvider />
      </main>
    </>
  );
}

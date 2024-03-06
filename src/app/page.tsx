import { CategoryMenu } from './components/CategoryMenu';
import ClientOnly from './components/ClientOnly';
import { ComeBack } from './components/ComeTop';
import { FetchData } from './components/FetchData';
import { Header } from './components/Header';
import { Hero3 } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';
import {
  getCategories,
  getGeneralData,
  getProducts,
  getStates,
  getTypePagaments,
} from './services';

export default async function Home() {
  const product = await getProducts();
  const category = await getCategories();
  const typePagament = await getTypePagaments();
  const states = await getStates();
  const generalData = await getGeneralData();

  return (
    <ClientOnly>
      <main id='hero'>
        <Header />
        <Hero3 />
        <CategoryMenu />
        <ProductMenu />
        <ComeBack />
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

import { CategoryMenu } from './components/CategoryMenu';
import { ComeBack } from './components/ComeTop';
import FetchData from './components/FetchData';
import { Header } from './components/Header';
import { Hero3 } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';
import ModalsProvider from './providers/ModalsProvider';

export default async function Home() {
  return (
    <>
      <main id='hero'>
        <FetchData />
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

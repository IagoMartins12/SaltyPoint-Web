import { CategoryMenu } from './components/CategoryMenu';
import ClientOnly from './components/ClientOnly';
import { ComeBack } from './components/ComeTop';
import { FetchData } from './components/FetchData';
import { Header } from './components/Header';
import { Hero3 } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';

export default function Home() {
  return (
    <ClientOnly>
      <main id='hero'>
        <Header />
        {/* <RewardOnHome /> */}
        <Hero3 />
        <CategoryMenu />
        <ProductMenu />
        <ComeBack />
        <FetchData />
      </main>
    </ClientOnly>
  );
}

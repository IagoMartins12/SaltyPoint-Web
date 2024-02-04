import { CategoryMenu } from './components/CategoryMenu';
import ClientOnly from './components/ClientOnly';
import { ComeBack } from './components/ComeTop';
import { FetchData } from './components/FetchData';
import { Header } from './components/Header';
import { Hero3 } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';
import dynamic from 'next/dynamic';

// const DynamicHeader = dynamic(() => import('./components/pro'), {
//   loading: () => <p>Loading...</p>,
// });

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

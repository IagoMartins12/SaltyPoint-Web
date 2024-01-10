import { CategoryMenu } from './components/CategoryMenu';
import ClientOnly from './components/ClientOnly';
import { ComeBack } from './components/ComeTop';
import { FetchData } from './components/FetchData';
import { Header } from './components/Header';
import { Hero2 } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';
import { RewardOnHome } from './components/RewardOnHome';

export default function Home() {
  return (
    <ClientOnly>
      <main>
        <Header />
        <RewardOnHome />
        {/* <Hero2 /> */}
        <CategoryMenu />
        <ProductMenu />
        <ComeBack />
        <FetchData />
      </main>
    </ClientOnly>
  );
}

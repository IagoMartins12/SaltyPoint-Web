import { CategoryMenu } from './components/CategoryMenu';
import { ComeBack } from './components/ComeTop';
import { FetchData } from './components/FetchData';
import { Header } from './components/Header';
import { Hero, Hero2 } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero2 />
      <CategoryMenu />
      <ProductMenu />
      <ComeBack />
      <FetchData />
    </main>
  );
}

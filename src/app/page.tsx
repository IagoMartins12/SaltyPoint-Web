import { CategoryMenu } from './components/CategoryMenu';
import { ComeBack } from './components/ComeTop';
import { Header } from './components/Header';
import { Hero, Hero2 } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';

export default function Home() {
  return (
    <div className='bodyBackground'>
      <Header />
      <Hero2 />
      <CategoryMenu />
      <ProductMenu />
      <ComeBack />
    </div>
  );
}

import { CategoryMenu } from './components/CategoryMenu';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductMenu } from './components/ProductMenu';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <CategoryMenu />
      <ProductMenu />
    </div>
  );
}

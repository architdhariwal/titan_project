import React from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import ProductBanner from '../components/ProductBanner';
import CategoryCarousel from '../components/CategorySection';
import MultiCardCarousel from '../components/MultiCardCarousel';
import Footer from '../components/Footer';
import RunningText from '../components/RunningText';
import { categoryItems } from '../utils/HomeData';


const Home: React.FC = () => {

  return (
    <>
      <RunningText />
      <Header />
      <HeroCarousel />

      <div className="p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductBanner
            imageUrl="https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw203d37b3/images/TrendingFinal_Men_D.jpg"
            title="Classic Trends"
            linkUrl="/products?category=men"
          />
          <ProductBanner
            imageUrl="https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw53d4c6ee/images/TrendingFinal_Women_D.jpg"
            title="Chic Trends"
            linkUrl="/products?category=women"
          />
        </div>
      </div>

      <CategoryCarousel categories={categoryItems} />

      <div className="p-12">
        <MultiCardCarousel />
      </div>

      <Footer />
    </>
  );
};

export default Home;


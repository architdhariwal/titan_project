import React from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import ProductBanner from '../components/ProductBanner';
import CategoryCarousel from '../components/CategoryCarousel';
import MultiCardCarousel from '../components/MultiCardCarousel';
import Footer from '../components/Footer';
import RunningText from '../components/RunningText';


const Home: React.FC = () => {
  const categoryItems = [
    { image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwc8887c27/images/sale_.jpg', title: 'Sale' },
    { image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw0c68edb6/images/men_.jpg', title: 'Men' },
    { image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwb8df3006/images/women.jpg', title: 'Women' },
    { image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw73a3bc3e/images/clock.jpg', title: 'Clocks' },
    { image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw43a80cbb/images/kids.jpg', title: 'Kids' },
    { image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw07037e98/images/couple.jpg', title: 'Couple' },
    { image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw5188cbbe/images/luxe.jpg', title: 'Luxe' },
  ];

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
            linkUrl="/product/men"
          />
          <ProductBanner
            imageUrl="https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw53d4c6ee/images/TrendingFinal_Women_D.jpg"
            title="Chic Trends"
            linkUrl="/product/women"
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


interface Slide {
    id: number;
    image: string;
    title: string;
    description: string;
  }
  
export const slides: Slide[] = [
    {
      id: 1,
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwfeedbf65/images/homepage/All_Banners/BestSellers_Sept_D.jpg",
      title: "Best Sellers",
      description: "UPTO 50% OFF*"
    },
    {
      id: 2,
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwbfab0d70/images/homepage/All_Banners/Oct_NewArrivals_D.jpg",
      title: "New Arrivals",
      description: "Discover the Latest Styles"
    },
    {
      id: 3,
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw0ded7e33/images/homepage/All_Banners/Workwear_Nov_D.jpg",
      title: "Workwear",
      description: "Luxury at its Finest"
    },
    {
      id: 4,
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw64f5066e/images/homepage/All_Banners/OctBAU_IB_D.jpg",
      title: "International",
      description: "Technology Meets Style"
    },
    {
      id: 5,
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw5e3a212e/images/homepage/All_Banners/RagaMemoirs_D.jpg",
      title: "Raga",
      description: "Luxury at its Finest"
    },
    {
      id: 6,
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwc97254d6/images/homepage/All_Banners/Stellar2.0_D.jpg",
      title: "Stellar 2.0",
      description: "Technology Meets Style"
    }
  ];

export const categoryItems = [
    { 
        image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwc8887c27/images/sale_.jpg', 
        title: 'Sale',
        href: '#'
    },
    { 
        image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw0c68edb6/images/men_.jpg', 
        title: 'Men',
        href: "/products?category=men"
    },
    { 
        image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwb8df3006/images/women.jpg', 
        title: 'Women',
        href: "/products?category=women"
    },
    { 
        image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw73a3bc3e/images/clock.jpg', 
        title: 'Clocks',
        href: '#'
    },
    { 
        image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw43a80cbb/images/kids.jpg', 
        title: 'Kids',
        href: "/products?category=kids"
    },
    { 
        image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw07037e98/images/couple.jpg', 
        title: 'Couple',
        href: '#'
    },
    { 
        image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw5188cbbe/images/luxe.jpg', 
        title: 'Luxe',
        href: '#'
    }
];




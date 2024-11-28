// import React, { useState } from 'react';

// interface CategoryItem {
//   image: string;
//   title: string;
// }

// interface CategoryCarouselProps {
//   items: CategoryItem[];
// }

// const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ items }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handlePrev = () => {
//     setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
//   };

//   const handleNext = () => {
//     setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
//   };

//   return (
//     <div className="relative">
//         <div className="text-center text-lg font-medium mt-4">
//         THE BEST WAY TO BUY THE PRODUCTS YOU LOVE
//       </div>
//       <div className="flex items-center justify-between px-4 py-2">
//         <button
//           className="text-3xl text-gray-500 hover:text-gray-700"
//           onClick={handlePrev}
//         >
//           ←
//         </button>
//         <div className="flex space-x-4">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className={`rounded-full flex items-center justify-evenly cursor-pointer`}
//               onClick={() => setActiveIndex(index)}
//             >
//               <img src={item.image} alt={item.title} className="w-10 h-10" />
//             </div>
//           ))}
//         </div>
//         <button
//           className="text-3xl text-gray-500 hover:text-gray-700"
//           onClick={handleNext}
//         >
//           →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;

import React from 'react';

interface Category {
  image: string;
  title: string;
}

interface CategoryGridProps {
  categories: Category[];
}

const CategoryCarousel: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        THE BEST WAY TO BUY THE PRODUCTS YOU LOVE
      </h2>
      <div className="flex overflow-x-auto gap-8 px-4 md:px-8 justify-center">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.image}
            className="flex flex-col items-center min-w-[120px]"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{category.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
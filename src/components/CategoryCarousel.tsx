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
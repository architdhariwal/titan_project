import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  image: string;
  title: string;
  href: string;
}

interface CategoryGridProps {
  categories: Category[];
}

const CategorySection: React.FC<CategoryGridProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        THE BEST WAY TO BUY THE PRODUCTS YOU LOVE
      </h2>
      <div className="flex overflow-x-auto gap-8 px-4 md:px-8 justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(category.href)}
            className="flex flex-col items-center min-w-[120px] cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{category.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

import React, { useEffect, useState } from 'react';

const RunningText: React.FC = () => {
  const [position, setPosition] = useState(100);

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => (prev <= -100 ? 100 : prev - 0.15));
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="bg-black container mx-auto px-10">
    <div className="bg-black text-white py-2 overflow-hidden">
      <div 
        className="whitespace-nowrap"
        style={{ transform: `translateX(${position}%)` }}
      >
        Use Code NEW10 and get 10% OFF* on non-discounted Watches over Rs. 2499. Maximum Discount Rs. 1200. T&C Apply*.
      </div>
    </div>
    </div>
  );
};

export default RunningText;
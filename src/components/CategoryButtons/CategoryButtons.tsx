import React, { useState, useEffect, useRef } from 'react';
import styles from './CategoryButtons.module.css';

interface CategoryButtonsProps {
  categories: string[];
  onSelect: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  onSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onSelect(selectedCategory);
  }, [selectedCategory, onSelect]);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  useEffect(() => {
    const container = containerRef.current;
    let startX = 0;
    let scrollLeft = 0;

    if (container) {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      };

      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (startX - x) * 1.5; // Скорость прокрутки
        container.scrollLeft = scrollLeft + walk;
      };

      container.addEventListener('wheel', handleWheel);
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);

      return () => {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.categoryButtonsWrapper}>
      <div className={styles.categoryButtons}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.selected : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;

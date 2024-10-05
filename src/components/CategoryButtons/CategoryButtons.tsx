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

    if (container) {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      };

      container.addEventListener('wheel', handleWheel);

      return () => {
        container.removeEventListener('wheel', handleWheel);
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

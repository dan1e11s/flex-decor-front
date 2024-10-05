import React from 'react';
import styles from './ProductList.module.css';

interface Product {
  category: string;
  imageUrl: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map((product, index) => (
        <div key={index} className={styles.productCard}>
          <img src={product.imageUrl} alt={product.category} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;

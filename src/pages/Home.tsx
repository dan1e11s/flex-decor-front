import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProductList from '../components/ProductList/ProductList';
import CategoryButtons from '../components/CategoryButtons/CategoryButtons';
import axios from 'axios';

interface IProduct {
  category: string;
  imageUrl: string;
}

interface ICategory {
  name: string;
}

const API = import.meta.env.VITE_BASE_API;

const Home: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  console.log(selectedCategory);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data.map((cat: ICategory) => cat.name));
      setSelectedCategory(response.data[0].name);
    };

    fetchCategories();
  }, []);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${API}/products`);
      setProducts(
        response.data.filter(
          (product: IProduct) => product.category === selectedCategory
        )
      );
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div>
      <Navbar />
      <CategoryButtons categories={categories} onSelect={setSelectedCategory} />
      <ProductList products={products} />
    </div>
  );
};

export default Home;

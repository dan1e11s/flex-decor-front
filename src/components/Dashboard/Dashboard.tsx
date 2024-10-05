import React, { useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';

const API = import.meta.env.VITE_BASE_API;

const Dashboard: React.FC = () => {
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API}/categories/create`,
        { name: category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategory('');
      alert('Category added successfully');
    } catch (error) {
      console.error('Failed to add category', error);
    }
  };

  const handleAddProduct = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('category', productName);
      formData.append('image', image);

      await axios.post(`${API}/products/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProductName('');
      setImage(null);
      alert('Product added successfully');
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>Управление админской частью</h2>

      <div className={styles.addCategory}>
        <h3>Новая категория</h3>
        <input
          type="text"
          placeholder="Название категории"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button onClick={handleAddCategory}>Добавить категорию</button>
      </div>

      <div className={styles.addProduct}>
        <h3>Новый товар</h3>
        <input
          type="text"
          placeholder="К какой категории относится продукт"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          required
        />
        <button onClick={handleAddProduct}>Добавить товар</button>
      </div>
    </div>
  );
};

export default Dashboard;

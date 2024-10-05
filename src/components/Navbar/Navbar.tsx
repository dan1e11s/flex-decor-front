import React from 'react';

import logo from '../../../public/logo.jpg';

import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" width="70px" height="70px" />
      </div>
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contactButton}
      >
        Контакты
      </a>
    </nav>
  );
};

export default Navbar;

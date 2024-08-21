import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles/Navbar.module.css';
import { FaChartLine, FaHome, FaCalculator, FaHistory } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}>
          <Link to="/" className={styles.navLink}>
            <FaHome /> Home
          </Link>
        </li>
        <li className={`${styles.navItem} ${location.pathname === '/simulator' ? styles.active : ''}`}>
          <Link to="/simulator" className={styles.navLink}>
            <FaCalculator /> Simulador
          </Link>
        </li>
        <li className={`${styles.navItem} ${location.pathname === '/reports' ? styles.active : ''}`}>
          <Link to="/reports" className={styles.navLink}>
            <FaChartLine /> Ações
          </Link>
        </li>
        <li className={`${styles.navItem} ${location.pathname === '/history' ? styles.active : ''}`}>
          <Link to="/history" className={styles.navLink}>
            <FaHistory /> Histórico
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

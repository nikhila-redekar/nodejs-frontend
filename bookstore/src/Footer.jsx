// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // Import the CSS file for styling

function Footer() {
  return (
    <footer className={styles.fixedbottom}>
      <div className={styles.containerfooter}>
        <p>&copy; 2024 Bookspot Website. All rights reserved.</p>
        <div className={styles.socialicons}>
      <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
      <a href="#" className="social-icon facebook"><i className="fab fa-facebook"></i></a>
      <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
      <a href="#" className="social-icon youtube"><i className="fab fa-youtube"></i></a>
    </div>
      </div>
    </footer>
  );
}

export default Footer;
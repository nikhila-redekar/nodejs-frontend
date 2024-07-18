// src/components/BannerSection.jsx
import React from 'react';
import styles from './BannerSection.module.css'; // Import CSS file for styling

function BannerSection() {
  return (
    <div className={styles.bannercontainer}>
      <div className={styles.bannerimage}>
        <img src="bookstore-hero.png" alt="Banner Image" />
      </div>
      <div className={styles.bannertext}>
        <h1>Welcome to Our Bookstore</h1>
        <p>Discover a world of knowledge and imagination. From bestsellers to hidden gems, explore our curated collection of books for all ages and interests.</p>
      </div>
    </div>
  );
}

export default BannerSection;

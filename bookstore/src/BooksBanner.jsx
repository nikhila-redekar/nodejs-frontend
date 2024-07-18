// src/components/BannerSection.jsx
import React from 'react';
import  styles from './BooksBanner.module.css'

function BooksBannerSection() {
  return (
    <div className="bannercontainer">
      <div className={styles.banner}>
        <img className={styles.bannerImage} src="bookstore-book-list.jpg" alt="Banner Image" />
      </div>
      <div className={styles.books}>
        <h1>Explore a wide variety of books available.</h1>
      </div>
    </div>
  );
}

export default BooksBannerSection;

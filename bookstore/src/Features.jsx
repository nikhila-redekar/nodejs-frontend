// src/components/Features.jsx
import React from 'react';
import styles from './Features.module.css'; // Import the CSS file for styling

function Features() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
      <h2 className={styles.h2}>Explore Our Bookstore Application</h2>
<br/>
<p>Welcome to our bookstore application, your gateway to a curated collection of literary treasures. Designed for book lovers and managed seamlessly by our dedicated team, our application offers a comprehensive platform to discover, manage, and explore our diverse range of books.</p>

<h2 className={styles.h2}>Key Features:</h2>
<div className={styles.featureboxes}>
    <div className={styles.featurebox}>
      <h3>Discover Books</h3>
      <p>Browse a wide range of books spanning various genres and categories. Discover new releases and timeless classics.</p>
    </div>
    <div className={styles.featurebox}>
      <h3>Author Insights</h3>
      <p>Learn about the authors of your favorite books. Explore their works and contributions to literature.</p>
    </div>
    <div className={styles.featurebox}>
      <h3>Genre Exploration</h3>
      <p>Organize books by genre for easy navigation. Explore diverse categories from fiction to non-fiction.</p>
    </div>
    <div className={styles.featurebox}>
      <h3>Easy Management</h3>
      <p>Manage book listings, prices, and availability effortlessly. Update book details and track inventory efficiently.</p>
    </div>
  </div>
  <br/>
<h3 className={styles.h3}>Why Choose Us?</h3>
<br/>
<p>With a passion for literature and a commitment to excellence, we aim to provide a seamless experience for book enthusiasts of all ages. Whether you’re looking to add to your personal collection or manage bookstore inventory efficiently, our application is tailored to meet your needs.</p>

<p>Get Started Today!</p>
<p>Explore our bookstore application and embark on a journey through the world of books. Start discovering, managing, and enjoying literature like never before.</p>


      </div>
    </div>
  );
}

export default Features;

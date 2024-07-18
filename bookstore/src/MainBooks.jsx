import React from 'react';
import BooksPage from './Books';
import BooksBannerSection from './BooksBanner';

function MainBooks() {
    return (
      <div>
        <div> <BooksBannerSection /></div>
  
        <div>
              <BooksPage /></div>
  </div>
    );
  }

export default MainBooks;
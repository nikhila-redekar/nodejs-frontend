// src/components/Search.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css'; // Import CSS module for styling

const Search = ({ placeholder, onSearch }) => {
  const [searchVal, setSearchVal] = useState('');

  const handleInputChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchVal.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchVal.trim());
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchVal}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default Search;

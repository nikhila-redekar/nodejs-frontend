/*import React, { useState, useEffect } from 'react';
import styles from './Books.module.css'; // Import CSS module for styling

const placeholderImageUrl = 'https://via.placeholder.com/150';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    publication_date: '',
    author_id: '',
    genre_id: ''
  });
  const [editingBook, setEditingBook] = useState(null); // State to track editing book
  const [selectedBook, setSelectedBook] = useState(null); // State to track selected book details
  const [filterAuthor, setFilterAuthor] = useState('');
  const [bookImages, setBookImages] = useState({}); // State to hold book images

  // Fetch books, authors, and genres on component mount
  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
  }, []);

  // Function to fetch all books based on selected filters
  const fetchBooks = async () => {
    try {
      let url = 'http://localhost:3013/book';
      if (filterAuthor) {
        url += `?author_id=${filterAuthor}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
      preloadImages(data); // Preload images after fetching books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Function to preload images for all books
  const preloadImages = (books) => {
    const images = {};
    books.forEach(book => {
      images[book.id] = book.image_url || placeholderImageUrl;
    });
    setBookImages(images);
  };

  // Function to fetch all authors
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3013/author');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Function to fetch all genres
  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost:3013/genre');
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Function to fetch details of a specific book
  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      setSelectedBook(data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission for adding or updating a book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingBook) {
        // Update existing book
        response = await fetch(`http://localhost:3013/book/${editingBook.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add new book
        response = await fetch('http://localhost:3013/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save book');
      }
      // Refresh book list after successful operation
      fetchBooks();
      setFormData({
        title: '',
        price: '',
        publication_date: '',
        author_id: '',
        genre_id: ''
      });
      setEditingBook(null); // Clear editing state
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      price: book.price,
      publication_date: book.publication_date,
      author_id: book.author_id,
      genre_id: book.genre_id
    });
  };

  // Function to handle delete button click
  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Refresh book list after successful deletion
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Function to handle view details button click
  const handleViewDetails = (bookId) => {
    // Fetch details of the selected book
    fetchBookDetails(bookId);
  };

  // Function to handle author filter change
  const handleAuthorFilterChange = (e) => {
    const authorId = e.target.value;
    setFilterAuthor(authorId);
  };

  return (
    <div className={styles.container}>
      {/* Left side: Form for adding/editing books *
      <div className={styles.formContainer}>
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Publication Date:
            <input type="date" name="publication_date" value={formData.publication_date} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Author:
            <select name="author_id" value={formData.author_id} onChange={handleInputChange}>
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Genre:
            <select name="genre_id" value={formData.genre_id} onChange={handleInputChange}>
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
          {editingBook && <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>}
        </form>
      </div>

      {/* Right side: List of books and detailed view *
      <div className={styles.listContainer}>
        {/* Filter section *
        <div className={styles.filterContainer}>
          <h3>Filters</h3>
          {/* Author filter *
          <label>
            Filter by Author:
            <select onChange={handleAuthorFilterChange}>
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
        </div>

        <h2>Books List</h2>
        <table className={styles.booksTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>
                 <div className={styles.bookItem}>
                 <img className={styles.bookImage} src='books-image.avif' alt={book.title} />
                    <span onClick={() => handleViewDetails(book.id)} className={styles.bookTitle}>{book.title}</span>
            </div>
                </td>
                <td>
                  <button className={styles.edit} onClick={() => handleEdit(book)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Detailed view of selected book *
        {selectedBook && (
          <div className={styles.bookDetails}>
            <h3>Book Details</h3>
            <p><strong>Title:</strong> {selectedBook.title}</p>
            <p><strong>Price:</strong> {selectedBook.price}</p>
            <p><strong>Publication Date:</strong> {selectedBook.publication_date}</p>
            <p><strong>Author:</strong> {selectedBook.Author.name}</p>
            <p><strong>Genre:</strong> {selectedBook.Genre.genre_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;*/

/*import React, { useState, useEffect } from 'react';
import styles from './Books.module.css'; // Import CSS module for styling

const placeholderImageUrl = 'https://via.placeholder.com/150';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    publication_date: '',
    author_id: '',
    genre_id: ''
  });
  const [editingBook, setEditingBook] = useState(null); // State to track editing book
  const [selectedBook, setSelectedBook] = useState(null); // State to track selected book details
  const [filterAuthor, setFilterAuthor] = useState('');
  const [bookImages, setBookImages] = useState({}); // State to hold book images
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch books, authors, and genres on component mount
  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
  }, []);

  // Function to fetch all books based on selected filters
  const fetchBooks = async () => {
    try {
      let url = 'http://localhost:3013/book';
      if (filterAuthor) {
        url += `?author_id=${filterAuthor}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
      preloadImages(data); // Preload images after fetching books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Function to preload images for all books
  const preloadImages = (books) => {
    const images = {};
    books.forEach(book => {
      images[book.id] = book.image_url || placeholderImageUrl;
    });
    setBookImages(images);
  };

  // Function to fetch all authors
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3013/author');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Function to fetch all genres
  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost:3013/genre');
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Function to fetch details of a specific book
  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      setSelectedBook(data);
      openModal(); // Open modal once details are fetched
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission for adding or updating a book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingBook) {
        // Update existing book
        response = await fetch(`http://localhost:3013/book/${editingBook.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add new book
        response = await fetch('http://localhost:3013/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save book');
      }
      // Refresh book list after successful operation
      fetchBooks();
      setFormData({
        title: '',
        price: '',
        publication_date: '',
        author_id: '',
        genre_id: ''
      });
      setEditingBook(null); // Clear editing state
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      price: book.price,
      publication_date: book.publication_date,
      author_id: book.author_id,
      genre_id: book.genre_id
    });
  };

  // Function to handle delete button click
  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Refresh book list after successful deletion
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Function to handle view details button click
  const handleViewDetails = (bookId) => {
    // Fetch details of the selected book
    fetchBookDetails(bookId);
  };

  // Function to handle author filter change
  const handleAuthorFilterChange = (e) => {
    const authorId = e.target.value;
    setFilterAuthor(authorId);
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Left side: Form for adding/editing books *
      <div className={styles.formContainer}>
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Publication Date:
            <input type="date" name="publication_date" value={formData.publication_date} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Author:
            <select name="author_id" value={formData.author_id} onChange={handleInputChange}>
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Genre:
            <select name="genre_id" value={formData.genre_id} onChange={handleInputChange}>
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
          {editingBook && <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>}
        </form>
      </div>

      {/* Right side: List of books and detailed view *
      <div className={styles.listContainer}>
        {/* Filter section *
        <div className={styles.filterContainer}>
          <h3>Filters</h3>
          {/* Author filter *
          <label>
            Filter by Author:
            <select onChange={handleAuthorFilterChange}>
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
        </div>

        <h2>Books List</h2>
        <table className={styles.booksTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>
                  <div className={styles.bookItem}>
                    <img className={styles.bookImage} src={bookImages[book.id] || placeholderImageUrl} alt={book.title} />
                    <span className={styles.bookTitle} onClick={() => handleViewDetails(book.id)}>{book.title}</span>
                  </div>
                </td>
                <td>
                  <button className={styles.edit} onClick={() => handleEdit(book)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying book details *
      {isModalOpen && selectedBook && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>{selectedBook.title}</h2>
            <p>Price: ${selectedBook.price}</p>
            <p>Publication Date: {selectedBook.publication_date}</p>
            <p>Author: {selectedBook.Author.name}</p>
            <p>Genre: {selectedBook.Genre.genre_name}</p>
            <img className={styles.modalImage} src={selectedBook.image_url || placeholderImageUrl} alt={selectedBook.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;*/

/*import React, { useState, useEffect } from 'react';
import styles from './Books.module.css'; // Import CSS module for styling

const placeholderImageUrl = 'https://via.placeholder.com/150';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    publication_date: '',
    author_id: '',
    genre_id: ''
  });
  const [editingBook, setEditingBook] = useState(null); // State to track editing book
  const [selectedBook, setSelectedBook] = useState(null); // State to track selected book details
  const [filterAuthor, setFilterAuthor] = useState('');
  const [bookImages, setBookImages] = useState({}); // State to hold book images
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch books, authors, and genres on component mount
  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
  }, []);

  // Function to fetch all books based on selected filters
  const fetchBooks = async () => {
    try {
      let url = 'http://localhost:3013/book';
      if (filterAuthor) {
        url += `?author_id=${filterAuthor}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.reverse()); // Reverse order to display newly added books at the top
      preloadImages(data); // Preload images after fetching books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Function to preload images for all books
  const preloadImages = (books) => {
    const images = {};
    books.forEach(book => {
      images[book.id] = book.image_url || placeholderImageUrl;
    });
    setBookImages(images);
  };

  // Function to fetch all authors
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3013/author');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Function to fetch all genres
  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost:3013/genre');
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Function to fetch details of a specific book
  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      setSelectedBook(data);
      openModal(); // Open modal once details are fetched
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission for adding or updating a book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingBook) {
        // Update existing book
        response = await fetch(`http://localhost:3013/book/${editingBook.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add new book
        response = await fetch('http://localhost:3013/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save book');
      }
      const data = await response.json(); // Get the newly added book data
      setBooks([data, ...books]); // Prepend new book to the books array
      setFormData({
        title: '',
        price: '',
        publication_date: '',
        author_id: '',
        genre_id: ''
      });
      setEditingBook(null); // Clear editing state
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      price: book.price,
      publication_date: book.publication_date,
      author_id: book.author_id,
      genre_id: book.genre_id
    });
  };

  // Function to handle delete button click
  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Refresh book list after successful deletion
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Function to handle view details button click
  const handleViewDetails = (bookId) => {
    // Fetch details of the selected book
    fetchBookDetails(bookId);
  };

  // Function to handle author filter change
  const handleAuthorFilterChange = (e) => {
    const authorId = e.target.value;
    setFilterAuthor(authorId);
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Left side: Form for adding/editing books *
      <div className={styles.formContainer}>
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Publication Date:
            <input type="date" name="publication_date" value={formData.publication_date} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Author:
            <select name="author_id" value={formData.author_id} onChange={handleInputChange}>
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Genre:
            <select name="genre_id" value={formData.genre_id} onChange={handleInputChange}>
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
          {editingBook && <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>}
        </form>
      </div>

      {/* Right side: List of books and detailed view *
      <div className={styles.listContainer}>
        {/* Filter section *
        <div className={styles.filterContainer}>
          <h3>Filters</h3>
          {/* Author filter *
          <label>
            Filter by Author:
            <select onChange={handleAuthorFilterChange}>
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
        </div>

        <h2>Books List</h2>
        <table className={styles.booksTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>
                  <div className={styles.bookItem}>
                    <img className={styles.bookImage} src={bookImages[book.id] || placeholderImageUrl} alt={book.title} />
                    <span className={styles.bookTitle} onClick={() => handleViewDetails(book.id)}>{book.title}</span>
                  </div>
                </td>
                <td>
                  <button className={styles.edit} onClick={() => handleEdit(book)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying book details *
      {isModalOpen && selectedBook && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>{selectedBook.title}</h2>
            <p>Price: ${selectedBook.price}</p>
            <p>Publication Date: {selectedBook.publication_date}</p>
            <p>Author: {selectedBook.Author.name}</p>
            <p>Genre: {selectedBook.Genre.genre_name}</p>
            <img className={styles.modalImage} src={selectedBook.image_url || placeholderImageUrl} alt={selectedBook.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;*/

import React, { useState, useEffect } from 'react';
import styles from './Books.module.css'; // Import CSS module for styling

const placeholderImageUrl = 'https://via.placeholder.com/20';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    publication_date: '',
    author_id: '',
    genre_id: ''
  });
  const [editingBook, setEditingBook] = useState(null); // State to track editing book
  const [selectedBook, setSelectedBook] = useState(null); // State to track selected book details
  const [filterAuthor, setFilterAuthor] = useState('');
  const [bookImages, setBookImages] = useState({}); // State to hold book images
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch books, authors, and genres on component mount
  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
  }, []);

  // Function to fetch all books based on selected filters
  const fetchBooks = async () => {
    try {
      let url = 'http://localhost:3013/book';
      if (filterAuthor) {
        url += `?author_id=${filterAuthor}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.reverse()); // Reverse order to display newly added books at the top
      preloadImages(data); // Preload images after fetching books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Function to preload images for all books
  const preloadImages = (books) => {
    const images = {};
    books.forEach(book => {
      images[book.id] = book.image_url || placeholderImageUrl;
    });
    setBookImages(images);
  };

  // Function to fetch all authors
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3013/author');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Function to fetch all genres
  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost:3013/genre');
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Function to fetch details of a specific book
  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      setSelectedBook(data);
      openModal(); // Open modal once details are fetched
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission for adding or updating a book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingBook) {
        // Update existing book
        response = await fetch(`http://localhost:3013/book/${editingBook.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add new book
        response = await fetch('http://localhost:3013/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save book');
      }
      const data = await response.json(); // Get the newly added book data
      setBooks([data, ...books]); // Prepend new book to the books array
      setFormData({
        title: '',
        price: '',
        publication_date: '',
        author_id: '',
        genre_id: ''
      });
      setEditingBook(null); // Clear editing state
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      price: book.price,
      publication_date: book.publication_date,
      author_id: book.author_id,
      genre_id: book.genre_id
    });
  };

  // Function to handle delete button click
  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3013/book/${bookId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Refresh book list after successful deletion
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Function to handle view details button click
  const handleViewDetails = (bookId) => {
    // Fetch details of the selected book
    fetchBookDetails(bookId);
  };

  // Function to handle author filter change
  const handleAuthorFilterChange = (e) => {
    const authorId = e.target.value;
    setFilterAuthor(authorId);
    // If you want to immediately apply the filter, you can call fetchBooks() here
    fetchBooks();
    // Otherwise, the filter will be applied when you submit the form or interact with the list
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Left side: Form for adding/editing books */}
      <div className={styles.formContainer}>
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Publication Date:
            <input type="date" name="publication_date" value={formData.publication_date} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Author:
            <select name="author_id" value={formData.author_id} onChange={handleInputChange}>
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Genre:
            <select name="genre_id" value={formData.genre_id} onChange={handleInputChange}>
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
          {editingBook && <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>}
        </form>
      </div>

      {/* Right side: List of books and detailed view */}
      <div className={styles.listContainer}>
        {/* Filter section */}
        { /*<div className={styles.filterContainer}>
          <h3>Filters</h3>
          {/* Author filter *
          <label>
            Filter by Author:
            <select value={filterAuthor} onChange={handleAuthorFilterChange}>
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
        </div>*/}

        <h2>Books List</h2>
        <table className={styles.booksTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>
                  <div className={styles.bookItem}>
                    <img className={styles.bookImage} src='books-image.avif' alt={book.title} />
                    <span className={styles.bookTitle} onClick={() => handleViewDetails(book.id)}>{book.title}</span>

                  </div>

                </td>
                <td>
                  <button className={styles.edit} onClick={() => handleEdit(book)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying book details */}
      {isModalOpen && selectedBook && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>{selectedBook.title}</h2>
            <p>Price: ${selectedBook.price}</p>
            <p>Publication Date: {selectedBook.publication_date}</p>
            <p>Author: {selectedBook.Author.name}</p>
            <p>Genre: {selectedBook.Genre.genre_name}</p>
            <img className={styles.modalImage} src='books-image.avif' alt={selectedBook.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;



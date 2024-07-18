/*import React, { useState, useEffect } from 'react';
import styles from './Author.module.css'; // Import CSS module for styling

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    biography: ''
  });
  const [editingAuthor, setEditingAuthor] = useState(null); // State to track editing author
  const [selectedAuthor, setSelectedAuthor] = useState(null); // State to track selected author details

  // Fetch authors on component mount
  useEffect(() => {
    fetchAuthors();
  }, []);

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

  // Function to fetch details of a specific author
  const fetchAuthorDetails = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:3013/author/${authorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch author details');
      }
      const data = await response.json();
      setSelectedAuthor(data);
    } catch (error) {
      console.error('Error fetching author details:', error);
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

  // Function to handle form submission for adding or updating an author
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingAuthor) {
        // Update existing author
        response = await fetch(`http://localhost:3013/author/${editingAuthor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add new author
        response = await fetch('http://localhost:3013/author', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save author');
      }
      // Refresh author list after successful operation
      fetchAuthors();
      setFormData({
        name: '',
        biography: ''
      });
      setEditingAuthor(null); // Clear editing state
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      biography: author.biography
    });
  };

  // Function to handle delete button click
  const handleDelete = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:3013/author/${authorId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete author');
      }
      // Refresh author list after successful deletion
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  // Function to handle view details button click
  const handleViewDetails = (authorId) => {
    // Fetch details of the selected author
    fetchAuthorDetails(authorId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{editingAuthor ? 'Edit Author' : 'Add New Author'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Biography:
            <textarea name="biography" value={formData.biography} onChange={handleInputChange} />
          </label>
          <br />
          <button className={styles.authbutton} type="submit">{editingAuthor ? 'Update Author' : 'Add Author'}</button>
          {editingAuthor && <button type="button" onClick={() => setEditingAuthor(null)}>Cancel</button>}
        </form>
      </div>

      <div className={styles.listContainer}>
        {/*<h2>Authors List</h2>*
        {/*<ul>
          {authors.map(author => (
            <li key={author.id}>
              <span onClick={() => handleViewDetails(author.id)} className={styles.authorName}>{author.name}</span>
              <button className={styles.authbutton} onClick={() => handleEdit(author)}>Edit</button>
              <button className={styles.authbutton} onClick={() => handleDelete(author.id)}>Delete</button>
            </li>
          ))}
        </ul>*

<table className={styles.authorsTable}>
  <thead>
    <tr>
      <th>Name</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {authors.map(author => (
      <tr key={author.id}>
        <td>
          <span onClick={() => handleViewDetails(author.id)} className={styles.authorName}>{author.name}</span>
        </td>
        <td>
          <button className={styles.authbuttonedit} onClick={() => handleEdit(author)}>Edit</button>
          <button className={styles.authbuttondelete} onClick={() => handleDelete(author.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        {/* Detailed view of selected author *
        {selectedAuthor && (
          <div className={styles.authorDetails}>
            <h3>Author Details</h3>
            <p><strong>Name:</strong> {selectedAuthor.name}</p>
            <p><strong>Biography:</strong> {selectedAuthor.biography}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorsPage;*/

import React, { useState, useEffect } from 'react';
import styles from './Author.module.css'; // Import CSS module for styling

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    biography: ''
  });
  const [editingAuthor, setEditingAuthor] = useState(null); // State to track editing author
  const [selectedAuthor, setSelectedAuthor] = useState(null); // State to track selected author details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch authors on component mount
  useEffect(() => {
    fetchAuthors();
  }, []);

  // Function to fetch all authors
  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3013/author');
      if (!response.ok) {
        throw new Error('Failed to fetch authors');
      }
      const data = await response.json();
      // Sort authors with the latest added author appearing first
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setAuthors(data.reverse());
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Function to fetch details of a specific author
  const fetchAuthorDetails = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:3013/author/${authorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch author details');
      }
      const data = await response.json();
      setSelectedAuthor(data);
      openModal(); // Open modal once details are fetched
    } catch (error) {
      console.error('Error fetching author details:', error);
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

  // Function to handle form submission for adding or updating an author
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingAuthor) {
        // Update existing author
        response = await fetch(`http://localhost:3013/author/${editingAuthor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add new author
        response = await fetch('http://localhost:3013/author', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save author');
      }
      // Refresh author list after successful operation
      fetchAuthors(); // This will automatically update the list with the latest data
      setFormData({
        name: '',
        biography: ''
      });
      setEditingAuthor(null); // Clear editing state
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      biography: author.biography
    });
  };

  // Function to handle delete button click
  const handleDelete = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:3013/author/${authorId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete author');
      }
      // Refresh author list after successful deletion
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  // Function to handle view details button click
  const handleViewDetails = (authorId) => {
    // Fetch details of the selected author
    fetchAuthorDetails(authorId);
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null); // Clear selected author details when closing modal
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{editingAuthor ? 'Edit Author' : 'Add New Author'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Biography:
            <textarea name="biography" value={formData.biography} onChange={handleInputChange} />
          </label>
          <br />
          <button className={styles.authbutton} type="submit">{editingAuthor ? 'Update Author' : 'Add Author'}</button>
          {editingAuthor && <button type="button" onClick={() => setEditingAuthor(null)}>Cancel</button>}
        </form>
      </div>

      <div className={styles.listContainer}>
        <h2>Authors List</h2>
        <table className={styles.authorsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id}>
                <td>
                  <span onClick={() => handleViewDetails(author.id)} className={styles.authorName}>{author.name}</span>
                </td>
                <td>
                  <button className={styles.authbuttonedit} onClick={() => handleEdit(author)}>Edit</button>
                  <button className={styles.authbuttondelete} onClick={() => handleDelete(author.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying author details */}
      {isModalOpen && selectedAuthor && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>{selectedAuthor.name}</h2>
            <p>{selectedAuthor.biography}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorsPage;

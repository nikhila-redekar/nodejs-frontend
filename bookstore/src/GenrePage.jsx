import React, { useState, useEffect } from 'react';
import styles from './Genre.module.css'; // Import CSS module for styling

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    genre_name: ''
  });
  const [editingGenre, setEditingGenre] = useState(null); // State to track editing genre

  // Fetch genres on component mount
  useEffect(() => {
    fetchGenres();
  }, []);

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

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission for adding or updating a genre
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingGenre) {
        // Update existing genre
        response = await fetch(`http://localhost:3013/genre/${editingGenre.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Add new genre
        response = await fetch('http://localhost:3013/genre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (!response.ok) {
        throw new Error('Failed to save genre');
      }
      // Refresh genre list after successful operation
      fetchGenres();
      setFormData({
        genre_name: ''
      });
      setEditingGenre(null); // Clear editing state
    } catch (error) {
      console.error('Error saving genre:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (genre) => {
    setEditingGenre(genre);
    setFormData({
      genre_name: genre.genre_name
    });
  };

  // Function to handle delete button click
  const handleDelete = async (genreId) => {
    try {
      const response = await fetch(`http://localhost:3013/genre/${genreId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete genre');
      }
      // Refresh genre list after successful deletion
      fetchGenres();
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>{editingGenre ? 'Edit Genre' : 'Add New Genre'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Genre Name:
            <input type="text" name="genre_name" value={formData.genre_name} onChange={handleInputChange} />
          </label>
          <br />
          <button className={styles.authbuttonnew} type="submit">{editingGenre ? 'Update Genre' : 'Add Genre'}</button>
          {editingGenre && <button type="button" onClick={() => setEditingGenre(null)}>Cancel</button>}
        </form>
      </div>

      <div className={styles.listContainer}>
        <h2>Genres List</h2>
        <table className={styles.genresTable}>
          <thead>
            <tr>
              <th>Genre Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {genres.map(genre => (
              <tr key={genre.id}>
                <td>{genre.genre_name}</td>
                <td>
                  <button className={styles.authbuttonedit} onClick={() => handleEdit(genre)}>Edit</button>
                  <button className={styles.authbuttondelete} onClick={() => handleDelete(genre.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenresPage;

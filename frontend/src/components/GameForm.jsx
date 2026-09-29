import React, { useState } from 'react'

const GameForm = ({ game, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: game?.title || '',
    platform: game?.platform || '',
    genre: game?.genre || '',
    status: game?.status || 'Backlog',
    rating: game?.rating || 0,
    release_year: game?.release_year || new Date().getFullYear(),
    cover_url: game?.cover_url || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? (name === 'rating' || name === 'release_year' ? 0 : value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation
    if (!formData.title || !formData.platform || !formData.genre || !formData.status ||
        formData.rating === 0 || formData.release_year === 0 || !formData.cover_url) {
      alert('Please fill in all fields')
      return
    }
    onSubmit(formData)
  }

  return (
    <div style={{
      border: '1px solid #dee2e6',
      borderRadius: '0.25rem',
      padding: '1.5rem',
      marginBottom: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <h2>{game ? 'Edit Game' : 'Add Game'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Platform:</label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="Playing">Playing</option>
            <option value="Completed">Completed</option>
            <option value="Backlog">Backlog</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Rating (0-10):</label>
          <input
            type="number"
            name="rating"
            min="0"
            max="10"
            value={formData.rating}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Release Year:</label>
          <input
            type="number"
            name="release_year"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.release_year}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Cover Image URL:</label>
          <input
            type="text"
            name="cover_url"
            value={formData.cover_url}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}>
            {game ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={onCancel} style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default GameForm
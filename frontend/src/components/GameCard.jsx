import React from 'react'

const GameCard = ({ game, onEdit, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #dee2e6',
      borderRadius: '0.25rem',
      padding: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      gap: '1rem'
    }}>
      <img
        src={game.cover_url}
        alt={game.title}
        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
      />
      <div>
        <h2 style={{ margin: '0 0 0.5rem 0' }}>{game.title}</h2>
        <p><strong>Platform:</strong> {game.platform}</p>
        <p><strong>Genre:</strong> {game.genre}</p>
        <p><strong>Status:</strong> {game.status}</p>
        <p><strong>Rating:</strong> {game.rating}/10</p>
        <p><strong>Release Year:</strong> {game.release_year}</p>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => onEdit(game.id)} style={{
            marginRight: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#ffc107',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}>
            Edit
          </button>
          <button onClick={() => onDelete(game.id)} style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameCard
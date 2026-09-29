import React from 'react'

const Header = ({ onAddGame, onSearchChange }) => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div>
        <h1 style={{ margin: 0 }}>GameVault</h1>
        <p style={{ margin: 0, color: '#6c757d' }}>Game Collection Manager</p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search games..."
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',
            width: '200px'
          }}
        />
        <button onClick={onAddGame} style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer'
        }}>
          Add Game
        </button>
      </div>
    </header>
  )
}

export default Header
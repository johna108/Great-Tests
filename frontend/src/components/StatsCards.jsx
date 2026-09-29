import React from 'react'

const StatsCards = ({ stats }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '0.25rem',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h3>Total Games</h3>
        <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{stats.total}</p>
      </div>
      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '0.25rem',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h3>Currently Playing</h3>
        <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{stats.playing}</p>
      </div>
      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '0.25rem',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h3>Completed</h3>
        <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{stats.completed}</p>
      </div>
      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '0.25rem',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h3>Backlog</h3>
        <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{stats.backlog}</p>
      </div>
    </div>
  )
}

export default StatsCards
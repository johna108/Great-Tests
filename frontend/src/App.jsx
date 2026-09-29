import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import GameForm from './components/GameForm'
import GameList from './components/GameList'
import { fetchGames, createGame, updateGame, deleteGame, fetchStats } from './api'

function App() {
  const [games, setGames] = useState([])
  const [stats, setStats] = useState({ total: 0, playing: 0, completed: 0, backlog: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [editingGameId, setEditingGameId] = useState(null)
  const [formData, setFormData] = useState(null) // { gameData, isEditing }

  useEffect(() => {
    loadGames()
    loadStats()
  }, [])

  const loadGames = async () => {
    try {
      const response = await fetchGames()
      setGames(response.data)
    } catch (error) {
      console.error('Error fetching games:', error)
    }
  }

  const loadStats = async () => {
    try {
      const response = await fetchStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleAddGame = () => {
    setFormData({ gameData: {}, isEditing: false })
  }

  const handleEditGame = (id) => {
    const gameToEdit = games.find(g => g.id === id)
    setFormData({ gameData: gameToEdit, isEditing: true })
  }

  const handleDeleteGame = async (id) => {
    try {
      await deleteGame(id)
      loadGames()
      loadStats()
    } catch (error) {
      console.error('Error deleting game:', error)
    }
  }

  const handleSubmitGame = async (gameData) => {
    try {
      if (formData && formData.isEditing) {
        await updateGame(formData.gameData.id, gameData)
      } else {
        await createGame(gameData)
      }
      // Reset form
      setFormData(null)
      loadGames()
      loadStats()
    } catch (error) {
      console.error('Error saving game:', error)
    }
  }

  const handleCancel = () => {
    setFormData(null)
  }

  return (
    <div>
      <Header
        onAddGame={handleAddGame}
        onSearchChange={setSearchTerm}
      />
      <StatsCards stats={stats} />
      {formData && (
        <GameForm
          game={formData.gameData}
          onSubmit={handleSubmitGame}
          onCancel={handleCancel}
        />
      )}
      <GameList
        games={games}
        onDelete={handleDeleteGame}
        onEdit={handleEditGame}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
      {/* Status filter dropdown */}
      <div style={{ padding: '1rem', textAlign: 'right' }}>
        <label>
          Filter by status:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="All">All</option>
            <option value="Playing">Playing</option>
            <option value="Completed">Completed</option>
            <option value="Backlog">Backlog</option>
            <option value="Dropped">Dropped</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default App
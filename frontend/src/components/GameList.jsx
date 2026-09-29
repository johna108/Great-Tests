import React from 'react'
import GameCard from './GameCard'

const GameList = ({ games, onDelete, onEdit, searchTerm, statusFilter }) => {
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || game.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {filteredGames.length === 0 ? (
        <p>No games found.</p>
      ) : (
        filteredGames.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}

export default GameList
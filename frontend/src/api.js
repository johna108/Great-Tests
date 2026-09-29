import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const fetchGames = () => axios.get(`${API_BASE_URL}/games`)
export const fetchGame = (id) => axios.get(`${API_BASE_URL}/games/${id}`)
export const createGame = (game) => axios.post(`${API_BASE_URL}/games`, game)
export const updateGame = (id, game) => axios.put(`${API_BASE_URL}/games/${id}`, game)
export const deleteGame = (id) => axios.delete(`${API_BASE_URL}/games/${id}`)
export const fetchStats = () => axios.get(`${API_BASE_URL}/stats`)
import axios from 'axios'
const baseUrl = '/api/login'

const login = async (params) => {
  const response = await axios.post(baseUrl, params)
  return response.data
}

const logout = async () => {
  localStorage.setItem('user', null)
}

export default {
  login,
  logout
}

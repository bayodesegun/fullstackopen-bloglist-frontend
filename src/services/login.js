import axios from 'axios'
const baseUrl = '/api/login'

const login = async (params) => {
  const response = await axios.post(baseUrl, params)
  return response.data
}

export default { login }
